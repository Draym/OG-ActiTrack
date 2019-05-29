package com.andres_k.og.models.auth;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity(name = "Token")
@Table(name = "auth_tokens")
public class Token {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name = "user_id")
    private Long userId;
    @NotNull
    @Column(name = "valid")
    private boolean valid;
    @NotNull
    @Column(name = "token")
    private String token;
    @NotNull
    @Column(name = "tokenBackup")
    private String tokenBackup;
    @NotNull
    @Column(name = "creation_date")
    private Date creationDate;
    @NotNull
    @Column(name = "expiration_date")
    private Date expirationDate;
    @NotNull
    @Column(name = "origin")
    private String origin;

    public Long getId() {
        return this.id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public boolean isValid() {
        return this.valid;
    }

    public String getToken() {
        return token;
    }

    public Date getCreationDate() {
        return this.creationDate;
    }

    public String getOrigin() {
        return this.origin;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public void setToken(String token) {
        this.token = token;
    }


    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getTokenBackup() {
        return tokenBackup;
    }

    public void setTokenBackup(String tokenBackup) {
        this.tokenBackup = tokenBackup;
    }
}
