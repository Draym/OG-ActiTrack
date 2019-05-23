package com.andres_k.og.models.http;

public class AuthHandler {
    private String email;
    private String password;
    private String origin;

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public String getOrigin() {
        return origin;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }
}
