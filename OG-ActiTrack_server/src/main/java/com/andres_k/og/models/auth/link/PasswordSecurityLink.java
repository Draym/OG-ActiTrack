package com.andres_k.og.models.auth.link;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity(name = "PasswordSecurityLink")
@Table(name = "password_security_link")
public class PasswordSecurityLink {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name = "user_id")
    private Long userId;
    @NotNull
    @Column(name = "key_identifier")
    private String identifier;
    @Column(name = "valid")
    private boolean valid;
    @Column(name = "activation_date")
    private Date date;


    public Long getId() {
        return this.id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public String getIdentifier() {
        return this.identifier;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
