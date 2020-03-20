package com.andres_k.og.models.auth;

import com.andres_k.og.utils.managers.PasswordManager;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity(name = "User")
@Table(name = "users")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name = "enabled")
    private Integer enabled;
    @NotNull
    @Column(name = "email")
    private String email;
    @NotNull
    @Column(name = "pseudo")
    private String pseudo;
    @NotNull
    @Column(name = "password")
    private String password;
    @NotNull
    @Column(name = "secret")
    private String secret;
    @NotNull
    @Column(name = "created_date")
    private Date date;
    @NotNull
    @Column(name = "premium")
    private Boolean premium;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    public User(Long id) {
        this.id = id;
    }

    public User() {
    }

    public void copy(User user) {
        if (user.email != null)
            this.setEmail(user.email);
        if (user.pseudo != null)
            this.setPseudo(user.pseudo);
        if (user.enabled != null)
            this.setEnabled(user.enabled);
        if (user.premium != null)
            this.setPremium(user.premium);
    }

    public void changePassword(String password) {
        this.setPassword(PasswordManager.hashPassword(password));
    }

    public Long getId() {
        return this.id;
    }

    public Integer getEnabled() {
        return this.enabled;
    }

    public String getPseudo() {
        return this.pseudo;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public Date getDate() {
        return this.date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Boolean isPremium() {
        return premium;
    }

    public void setPremium(Boolean premium) {
        this.premium = premium;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
