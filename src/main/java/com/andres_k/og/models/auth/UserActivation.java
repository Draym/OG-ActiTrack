package com.andres_k.og.models.auth;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity(name = "UserActivation")
@Table(name = "user_activation")
public class UserActivation {
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

    public Date getDate() {
        return this.date;
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

    public void setDate(Date date) {
        this.date = date;
    }
}
