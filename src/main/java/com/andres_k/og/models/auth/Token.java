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
    @Column(name = "expired")
    private boolean expired;
    @NotNull
    @Column(name = "value")
    private String value;
    @NotNull
    @Column(name = "creation_date")
    private Date date;
    @NotNull
    @Column(name = "origin")
    private String origin;

    public Long getId() {
        return this.id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public boolean isExpired() {
        return this.expired;
    }

    public String getValue() {
        return value;
    }

    public Date getDate() {
        return this.date;
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

    public void setExpired(boolean expired) {
        this.expired = expired;
    }

    public void setValue(String value) {
        this.value = value;
    }


    public void setDate(Date date) {
        this.date = date;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }
}
