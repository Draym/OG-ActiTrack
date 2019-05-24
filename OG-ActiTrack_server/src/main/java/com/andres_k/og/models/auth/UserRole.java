package com.andres_k.og.models.auth;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "UserRole")
@Table(name = "user_roles")
public class UserRole {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="user_id")
    private Long userId;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public Long getId() {
        return this.id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Role getRole() {
        return this.role;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}