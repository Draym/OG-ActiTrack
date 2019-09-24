package com.andres_k.og.services.auth;

import com.andres_k.og.dao.auth.UserRepository;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.auth.*;
import com.andres_k.og.models.enums.ERoles;
import com.andres_k.og.models.http.ChangePasswordHandler;
import com.andres_k.og.models.http.RegisterHandler;
import com.andres_k.og.models.http.ResetPasswordHandler;
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
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final TokenService tokenService;
    private final UserActivationLinkService userActivationLinkService;

    @Autowired
    public UserService(UserRepository userRepository, RoleService roleService, TokenService tokenService, UserActivationLinkService userActivationLinkService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.tokenService = tokenService;
        this.userActivationLinkService = userActivationLinkService;
    }

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
            user.setSecret(TRandomString.get().generate(6));
            user.setEnabled(0);
            user.setDate(new Date());
            user.setPremium(false);

            Role role = this.roleService.getRoleByValue(ERoles.USER.getValue());
            user.setRole(role);

            User newUser = this.userRepository.save(user);
            this.userActivationLinkService.sendVerificationUserEmail(newUser);
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

        User user = this.getUserById(targetId);
        if (newUser.getEmail() != null && !user.getEmail().equals(newUser.getEmail()) && this.userRepository.existsUserByEmail(newUser.getEmail()))
            throw new Exception("The email '" + newUser.getEmail() + "' is already used.");
        else if (newUser.getPseudo() != null && !user.getPseudo().equals(newUser.getPseudo()) && this.userRepository.existsUserByPseudo(newUser.getPseudo()))
            throw new Exception("The pseudo '" + newUser.getPseudo() + "' is already used.");
        else {
            if (newUser.getEmail() != null && !user.getEmail().equals(newUser.getEmail())) {
                user.setEnabled(0);
                this.userActivationLinkService.sendVerificationUserEmail(newUser);
            }
            user.copy(newUser);
            return this.userRepository.save(user);
        }
    }

    public void updateUserPassword(ChangePasswordHandler passwordHandler, Token token) throws SecurityException, InternalError {
        if (token == null)
            throw new SecurityException("You are not allowed to modify this user");
        User user = this.getUserById(token.getUserId());

        PasswordManager.verifyPassword(passwordHandler.getOldPassword(), user.getPassword());
        if (!passwordHandler.getPassword().equals(passwordHandler.getRepeatPassword()))
            throw new SecurityException("The repeat password doesn't match with the new password.");
        user.changePassword(passwordHandler.getPassword());
        this.userRepository.save(user);
    }

    public void resetUserPassword(Long userId, ResetPasswordHandler password) {
        User user = this.getUserById(userId);
        user.changePassword(password.getPassword());
        this.userRepository.save(user);
    }

    public void deleteUser(Long id) {
        deleteUser(id, null);
    }

    public void deleteUser(Long id, Token token) {
        if (token != null && !token.getUserId().equals(id))
            throw new SecurityException("You are not allowed to delete this user");

        User user = this.getUserById(id);
        this.userRepository.delete(user);
        this.userActivationLinkService.deleteAllByUserId(id);
    }

    public void updateRole(Long userId, Long roleId) {
        User user = this.getUserById(userId);

        Role role = this.roleService.getRoleById(roleId);
        user.setRole(role);
        this.userRepository.save(user);
    }

    /**
     * GETTERS
     **/

    public User getUserByToken(String value) {
        Token token = this.tokenService.getTokenByValue(value);

        return this.userRepository.findById(token.getUserId()).orElse(null);
    }

    public User getUserById(Long id) {
        Optional<User> optUser = this.userRepository.findById(id);
        if (!optUser.isPresent())
            throw new EntityNotFoundException("No user found for the given id.");
        return optUser.get();
    }

    public User getUserByEmail(String email) {
        Optional<User> optUser = this.userRepository.findByEmail(email);
        if (!optUser.isPresent())
            throw new EntityNotFoundException("No user found for the given email [" + email + "].");
        return optUser.get();
    }

}
