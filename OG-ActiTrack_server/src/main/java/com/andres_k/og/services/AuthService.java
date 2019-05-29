package com.andres_k.og.services;

import com.andres_k.og.models.auth.*;
import com.andres_k.og.models.http.TokenResponse;
import com.andres_k.og.utils.managers.PasswordManager;
import com.andres_k.og.utils.tools.THashString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserActivationRepository userActivationRepository;
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private TokenService tokenService;

    public User login(String email, String password) throws SecurityException{
        User user = this.userRepository.findByEmail(email);

        if (user == null)
            throw new EntityNotFoundException("Cannot find user [email=" + email + "]");
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
        Optional<UserActivation> optUserActivation = this.userActivationRepository.findByIdentifier(identifier);

        if (!optUserActivation.isPresent())
            throw new EntityNotFoundException("The identifier link {" + identifier + "} is invalid.");

        Optional<User> optUser = this.userRepository.findById(optUserActivation.get().getUserId());

        if (!optUser.isPresent())
            throw new EntityNotFoundException("No user has been found for the identifier link {" + identifier + "}.");

        optUser.get().setEnabled(1);
        this.userRepository.save(optUser.get());
    }
}
