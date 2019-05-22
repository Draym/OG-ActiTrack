package com.andres_k.og.models.auth.custom;

import com.andres_k.og.models.auth.Token;
import com.andres_k.og.models.auth.User;

public class TokenResponse {
    private Token token;
    private User user;

    public Token getToken() {
        return this.token;
    }

    public User getUser() {
        return this.user;
    }

    public void setToken(Token token) {
        this.token = token;
    }


    public void setUser(User user) {
        this.user = user;
    }
}
