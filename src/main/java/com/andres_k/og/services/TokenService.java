package com.andres_k.og.services;

import com.andres_k.og.models.auth.Token;
import com.andres_k.og.models.auth.TokenRepository;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.auth.custom.TokenResponse;
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
    @Autowired
    private TokenRepository tokenRepository;

    private void expirePreviousTokens(User user, String origin) {
        List<Token> oldTokens = this.tokenRepository.getAllByUserIdAndExpiredIsFalseAndOriginEquals(user.getId(), origin);
        oldTokens.forEach(item -> item.setExpired(true));
        this.tokenRepository.saveAll(oldTokens);
    }

    public TokenResponse createToken(User user, String origin) {

        this.expirePreviousTokens(user, origin);

        Token token = new Token();
        token.setExpired(false);
        token.setValue(TokenManager.generate());
        token.setUserId(user.getId());
        token.setDate(new Date());
        token.setOrigin(origin);
        this.tokenRepository.save(token);

        TokenResponse tokenResponse = new TokenResponse();
        tokenResponse.setUser(user);
        tokenResponse.setToken(token);

        return tokenResponse;
    }

    public boolean verifyValidity(String value) {
        Token token = this.getToken(value);

        Calendar cal = Calendar.getInstance();
        cal.setTime(token.getDate());
        cal.add(Calendar.MONTH, 1);

        if (new Date().compareTo(cal.getTime()) > 0) {
            token.setExpired(true);
            this.tokenRepository.save(token);
            throw new SecurityException("The token {" + value + "} has expired.");
        }
        return true;
    }

    public Token getToken(String value) {
        Optional<Token> optToken = this.tokenRepository.findByValue(value);

        if (!optToken.isPresent())
            throw new EntityNotFoundException("The token {" + value + "} doesn't exist.");
        if (optToken.get().isExpired())
            throw new NullPointerException("The token {" + value + "} has expired.");
        return optToken.get();
    }
}
