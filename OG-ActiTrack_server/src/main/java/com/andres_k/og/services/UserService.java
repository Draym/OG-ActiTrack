package com.andres_k.og.services;

import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.auth.*;
import com.andres_k.og.models.auth.link.UserActivationLink;
import com.andres_k.og.models.auth.link.UserActivationLinkRepository;
import com.andres_k.og.models.auth.user.UserRole;
import com.andres_k.og.models.auth.user.UserRoleRepository;
import com.andres_k.og.models.http.RegisterHandler;
import com.andres_k.og.utils.managers.EmailManager;
import com.andres_k.og.utils.managers.PasswordManager;
import com.andres_k.og.utils.tools.THashString;
import com.andres_k.og.utils.tools.TRandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserActivationLinkRepository userActivationLinkRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private TokenService tokenService;

    public User createUser(RegisterHandler auth) throws InternalError, SecurityException, IOException, MessagingException {
        if (this.userRepository.existsUserByEmail(auth.getEmail()))
            throw new SecurityException("The email '" + auth.getEmail() + "' is already used.");
        else if (this.userRepository.existsUserByPseudo(auth.getPseudo()))
            throw new SecurityException("The pseudo '" + auth.getPseudo() + "' is already used.");
        else {
            // update user
            User user = new User();
            user.setEmail(auth.getEmail());
            user.setPseudo(auth.getPseudo());
            user.setPassword(PasswordManager.hashPassword(auth.getPassword()));
            user.setEnabled(0);
            user.setDate(new Date());
            user.setPremium(false);

            // createToken user role USER
            UserRole userRole = new UserRole();
            Optional<Role> optRole = this.roleRepository.findByValue(ERoles.USER.get());
            if (!optRole.isPresent())
                throw new EntityNotFoundException("Cannot find the default user role.");
            User newUser = this.userRepository.save(user);
            userRole.setUserId(newUser.getId());
            userRole.setRole(optRole.get());
            this.userRoleRepository.save(userRole);

            this.sendVerificationUserEmail(newUser);

            return newUser;
        }
    }

    public User updateUser(User newUser) throws Exception {
        return updateUser(newUser, null);
    }

    public User updateUser(User newUser, Token token) throws Exception {
        if (newUser.getId() == null && token == null)
            throw new SecurityException("You are not allowed to modify this user");

        Long targetId = (newUser.getId() == null ? token.getUserId() : newUser.getId());
        Optional<User> optUser = this.userRepository.findById(targetId);

        if (!optUser.isPresent())
            throw new EntityNotFoundException("No user found for the given id");

        User user = optUser.get();
        if (!user.getEmail().equals(newUser.getEmail()) && this.userRepository.existsUserByEmail(newUser.getEmail()))
            throw new Exception("The email '" + newUser.getEmail() + "' is already used.");
        else if (!user.getPseudo().equals(newUser.getPseudo()) && this.userRepository.existsUserByPseudo(newUser.getPseudo()))
            throw new Exception("The pseudo '" + newUser.getPseudo() + "' is already used.");
        else {
            if (!user.getEmail().equals(newUser.getEmail())) {
                user.setEnabled(0);
                this.sendVerificationUserEmail(newUser);
            }
            user.copy(newUser);
            return this.userRepository.save(user);
        }
    }

    public void deleteUser(Long id) throws Exception {
        deleteUser(id, null);
    }

    public void deleteUser(Long id, Token token) throws Exception {
        if (token != null && !token.getId().equals(id))
            throw new SecurityException("You are not allowed to delete this user");
        Optional<User> optUser = this.userRepository.findById(id);
        if (!optUser.isPresent())
            throw new EntityNotFoundException("Cannot find user [id=" + id + "]");
        this.userRepository.delete(optUser.get());
        this.userRoleRepository.deleteAllByUserId(id);
        this.userActivationLinkRepository.deleteAllByUserId(id);
    }

    public void deleteRole(Long userId, Long roleId) {
        this.userRoleRepository.deleteByUserIdAndRoleId(userId, roleId);
    }

    public User getUserByToken(String value) {
        Token token = this.tokenService.getToken(value);

        return this.userRepository.findById(token.getUserId()).orElse(null);
    }

    private void sendVerificationUserEmail(User user) throws IOException, MessagingException {
        // createToken UserActivationLink
        UserActivationLink userActivationLink = new UserActivationLink();
        userActivationLink.setDate(new Date());
        userActivationLink.setUserId(user.getId());
        userActivationLink.setIdentifier(TRandomString.get().generate());
        this.userActivationLinkRepository.save(userActivationLink);

        // send verification email
        EmailManager.get().sendVerification(user, userActivationLink.getIdentifier());
    }
}
