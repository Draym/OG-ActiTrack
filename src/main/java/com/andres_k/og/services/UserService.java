package com.andres_k.og.services;

import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.auth.*;
import com.andres_k.og.utils.managers.EmailManager;
import com.andres_k.og.utils.managers.PasswordManager;
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
    private UserActivationRepository userActivationRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private TokenService tokenService;

    public User createUser(User user) throws Exception {
        if (this.userRepository.existsUserByEmail(user.getEmail()))
            throw new Exception("The email '" + user.getEmail() + "' is already used.");
        else if (this.userRepository.existsUserByPseudo(user.getPseudo()))
            throw new Exception("The pseudo '" + user.getPseudo() + "' is already used.");
        else {
            // update user
            user.setPassword(PasswordManager.hashPassword(user.getPassword()));
            user.setEnabled(0);
            user.setDate(new Date());

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
        this.userActivationRepository.deleteAllByUserId(id);
    }

    public void deleteRole(Long userId, Long roleId) {
        this.userRoleRepository.deleteByUserIdAndRoleId(userId, roleId);
    }

    public User getUserByToken(String value) {
        Token token = this.tokenService.getToken(value);

        return this.userRepository.findById(token.getUserId()).orElse(null);
    }

    private void sendVerificationUserEmail(User user) throws IOException, MessagingException {
        // createToken UserActivation
        UserActivation userActivation = new UserActivation();
        userActivation.setDate(new Date());
        userActivation.setUserId(user.getId());
        userActivation.setIdentifier(TRandomString.get().generate());
        this.userActivationRepository.save(userActivation);

        // send verification email
        EmailManager.get().sendVerification(user, userActivation.getIdentifier());
    }
}
