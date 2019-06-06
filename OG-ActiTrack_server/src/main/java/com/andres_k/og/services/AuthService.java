package com.andres_k.og.services;

import com.andres_k.og.models.auth.*;
import com.andres_k.og.models.auth.link.PasswordSecurityLink;
import com.andres_k.og.models.auth.link.PasswordSecurityLinkRepository;
import com.andres_k.og.models.auth.link.UserActivationLink;
import com.andres_k.og.models.auth.link.UserActivationLinkRepository;
import com.andres_k.og.models.http.PasswordHandler;
import com.andres_k.og.models.http.TokenResponse;
import com.andres_k.og.utils.managers.EmailManager;
import com.andres_k.og.utils.managers.PasswordManager;
import com.andres_k.og.utils.managers.TokenManager;
import com.andres_k.og.utils.tools.THashString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserActivationLinkRepository userActivationLinkRepository;
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private PasswordSecurityLinkRepository passwordSecurityLinkRepository;
    @Autowired
    private SecurityLinkService securityLinkService;
    @Autowired
    private TokenService tokenService;

    public User login(String email, String password) throws SecurityException, InternalError {
        Optional<User> optUser = this.userRepository.findByEmail(email);

        if (!optUser.isPresent())
            throw new EntityNotFoundException("No user found for the given email.");
        User user = optUser.get();

        PasswordManager.verifyPassword(password, user.getPassword());
        if (user.getEnabled() == 0)
            throw new SecurityException("Please verify your email address.");
        if (user.getEnabled() == -1)
            throw new SecurityException("Your account has been ban.");
        return user;
    }

    public TokenResponse loginByToken(String token) {
        TokenResponse result = new TokenResponse();

        Optional<Token> optToken = this.tokenRepository.findByToken(token);

        if (!optToken.isPresent())
            throw new EntityNotFoundException("The token {" + token + "} has not been found.");
        Optional<User> optUser = this.userRepository.findById(optToken.get().getUserId());
        if (!optUser.isPresent())
            throw new EntityNotFoundException("The user {" + optToken.get().getUserId() + "} has not been found.");
        result.setUser(optUser.get());
        result.setToken(optToken.get());
        return result;
    }

    public TokenResponse refreshToken(String tokenBackup) {
        Optional<Token> optToken = this.tokenRepository.findByTokenBackup(tokenBackup);

        if (!optToken.isPresent())
            throw new EntityNotFoundException("The backup token {" + tokenBackup + "} has not been found.");
        Optional<User> optUser = this.userRepository.findById(optToken.get().getUserId());
        if (!optUser.isPresent())
            throw new EntityNotFoundException("The user {" + optToken.get().getUserId() + "} has not been found.");

        this.tokenService.expirePreviousTokens(optUser.get(), optToken.get().getOrigin());

        return this.tokenService.createToken(optUser.get(), optToken.get().getOrigin(), optToken.get().getTokenBackup());
    }

    public void validateAccount(String identifier) {
        Optional<UserActivationLink> optUserActivation = this.userActivationLinkRepository.findByIdentifier(identifier);

        if (!optUserActivation.isPresent())
            throw new EntityNotFoundException("The identifier link {" + identifier + "} is invalid.");

        Optional<User> optUser = this.userRepository.findById(optUserActivation.get().getUserId());

        if (!optUser.isPresent())
            throw new EntityNotFoundException("No user has been found for the identifier link {" + identifier + "}.");

        optUser.get().setEnabled(1);
        this.userRepository.save(optUser.get());
    }


    public void resetPassword(PasswordHandler password) {
        PasswordSecurityLink passwordSecurityLink = this.securityLinkService.getPasswordSecurityLink(password.getResetToken());
        Optional<User> optUser = this.userRepository.findById(passwordSecurityLink.getUserId());

        if (!optUser.isPresent())
            throw new EntityNotFoundException("No user found for the given id.");

        User user = optUser.get();
        user.setPassword(PasswordManager.hashPassword(password.getPassword()));
        this.userRepository.save(user);

        passwordSecurityLink.setValid(false);
        this.passwordSecurityLinkRepository.save(passwordSecurityLink);
    }

    public void forgetPassword(String email) throws IOException, MessagingException {
        Optional<User> optUser = this.userRepository.findByEmail(email);

        if (!optUser.isPresent())
            throw new EntityNotFoundException("No user found for the given email.");

        User user = optUser.get();

        PasswordSecurityLink passwordSecurityLink = new PasswordSecurityLink();
        passwordSecurityLink.setDate(new Date());
        passwordSecurityLink.setUserId(user.getId());
        passwordSecurityLink.setIdentifier(TokenManager.generate());
        passwordSecurityLink.setValid(true);
        this.passwordSecurityLinkRepository.save(passwordSecurityLink);

        EmailManager.get().sendPasswordForget(user, passwordSecurityLink.getIdentifier());
    }
}
