package com.andres_k.og.services;

import com.andres_k.og.models.auth.Token;
import com.andres_k.og.dao.TokenRepository;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.http.TokenResponse;
import com.andres_k.og.utils.managers.TokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TokenService {
    private final TokenRepository tokenRepository;

    @Autowired
    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public void expirePreviousTokens(User user, String origin) {
        List<Token> oldTokens = this.tokenRepository.getAllByUserIdAndValidIsTrueAndOriginEquals(user.getId(), origin);
        oldTokens.forEach(item -> item.setValid(false));
        this.tokenRepository.saveAll(oldTokens);
    }

    public TokenResponse createToken(User user, String origin) {
        return this.createToken(user, origin, TokenManager.generate());
    }

    public TokenResponse createToken(User user, String origin, String tokenBackup) {

        this.expirePreviousTokens(user, origin);

        Token token = new Token();
        token.setValid(true);
        token.setToken(TokenManager.generate());
        token.setTokenBackup(tokenBackup);
        token.setUserId(user.getId());
        token.setCreationDate(new Date());

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, 1);
        token.setExpirationDate(cal.getTime());

        token.setOrigin(origin);
        this.tokenRepository.save(token);

        TokenResponse tokenResponse = new TokenResponse();
        tokenResponse.setUser(user);
        tokenResponse.setToken(token);

        return tokenResponse;
    }

    public boolean verifyValidity(String value) {
        Token token = this.getTokenByValue(value);
        if (new Date().compareTo(token.getExpirationDate()) > 0) {
            token.setValid(false);
            this.tokenRepository.save(token);
            throw new SecurityException("The token {" + value + "} has now expired.");
        }
        return true;
    }

    /** GETTERS **/

    public Token getTokenByValue(String value) {
        Optional<Token> optToken = this.tokenRepository.findByToken(value);

        if (!optToken.isPresent())
            throw new EntityNotFoundException("The token {" + value + "} doesn't exist.");
        if (!optToken.get().isValid())
            throw new SecurityException("The token {" + value + "} is expired.");
        return optToken.get();
    }

    public Token getTokenByBackup(String tokenBackup) {
        Optional<Token> optToken = this.tokenRepository.findByTokenBackup(tokenBackup);

        if (!optToken.isPresent())
            throw new EntityNotFoundException("The backup token {" + tokenBackup + "} has not been found.");
        return optToken.get();
    }

}
