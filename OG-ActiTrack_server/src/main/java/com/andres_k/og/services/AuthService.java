package com.andres_k.og.services;

import com.andres_k.og.models.auth.*;
import com.andres_k.og.models.auth.link.PasswordSecurityLink;
import com.andres_k.og.dao.PasswordSecurityLinkRepository;
import com.andres_k.og.models.auth.link.UserActivationLink;
import com.andres_k.og.dao.UserActivationLinkRepository;
import com.andres_k.og.models.http.PasswordHandler;
import com.andres_k.og.models.http.TokenResponse;
import com.andres_k.og.utils.managers.EmailManager;
import com.andres_k.og.utils.managers.PasswordManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.Optional;

@Service
public class AuthService {
    private final UserService userService;
    private final PasswordSecurityLinkService passwordSecurityLinkService;
    private final TokenService tokenService;
    private final UserActivationLinkService userActivationLinkService;

    @Autowired
    public AuthService(UserService userService, UserActivationLinkService userActivationLinkService, PasswordSecurityLinkRepository passwordSecurityLinkRepository, PasswordSecurityLinkService passwordSecurityLinkService, TokenService tokenService) {
        this.userService = userService;
        this.passwordSecurityLinkService = passwordSecurityLinkService;
        this.userActivationLinkService = userActivationLinkService;
        this.tokenService = tokenService;
    }

    public User login(String email, String password) throws SecurityException, InternalError {
        User user = this.userService.getUserByEmail(email);

        PasswordManager.verifyPassword(password, user.getPassword());
        if (user.getEnabled() == 0)
            throw new SecurityException("Please verify your email address.");
        if (user.getEnabled() == -1)
            throw new SecurityException("Your account has been ban.");
        return user;
    }

    public TokenResponse loginByToken(String token) {
        TokenResponse result = new TokenResponse();

        Token tokenObj = this.tokenService.getTokenByValue(token);
        User userObj = this.userService.getUserByToken(token);
        result.setUser(userObj);
        result.setToken(tokenObj);
        return result;
    }

    public TokenResponse refreshToken(String tokenBackup) {
        Token token = this.tokenService.getTokenByBackup(tokenBackup);
        User user = this.userService.getUserById(token.getUserId());
        return this.tokenService.createToken(user, token.getOrigin(), token.getTokenBackup());
    }

    public void validateAccount(String identifier) throws Exception {
        UserActivationLink userActivationLink = this.userActivationLinkService.getByIdentifier(identifier);

        User user = new User(userActivationLink.getUserId());
        user.setEnabled(1);
        this.userService.updateUser(user);
    }


    public void resetPassword(PasswordHandler password) throws Exception {
        PasswordSecurityLink passwordSecurityLink = this.passwordSecurityLinkService.getByIdentifier(password.getResetToken());

        User user = new User(passwordSecurityLink.getUserId());
        user.setPassword(PasswordManager.hashPassword(password.getPassword()));
        this.userService.updateUser(user);

        passwordSecurityLink.setValid(false);
        this.passwordSecurityLinkService.update(passwordSecurityLink);
    }

    public void forgetPassword(String email) throws IOException, MessagingException {
        User user = this.userService.getUserByEmail(email);

        PasswordSecurityLink psl = this.passwordSecurityLinkService.create(user.getId());
        EmailManager.get().sendPasswordForget(user, psl.getIdentifier());
    }
}
