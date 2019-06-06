package com.andres_k.og.models.http;

public class RegisterHandler {
    private String email;
    private String password;
    private String pseudo;

    public RegisterHandler() {
    }

    public RegisterHandler(String email, String password, String pseudo) {
        this.email = email;
        this.password = password;
        this.pseudo = pseudo;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }
}
