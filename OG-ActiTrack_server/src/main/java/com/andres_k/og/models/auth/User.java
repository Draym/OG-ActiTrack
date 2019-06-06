package com.andres_k.og.models.auth;

import com.andres_k.og.utils.managers.PasswordManager;
import com.andres_k.og.utils.tools.THashString;

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
    @Column(name = "created_date")
    private Date date;
    @NotNull
    @Column(name = "premium")
    private boolean premium;

    public void copy(User user) throws THashString.CannotPerformOperationException {
        if (user.password != null)
            this.setPassword(PasswordManager.hashPassword(user.password));
        if (user.email != null)
            this.setEmail(user.email);
        if (user.pseudo != null)
            this.setPseudo(user.pseudo);
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

    public boolean isPremium() {
        return premium;
    }

    public void setPremium(boolean premium) {
        this.premium = premium;
    }
}
