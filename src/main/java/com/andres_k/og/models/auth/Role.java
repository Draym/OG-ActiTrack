package com.andres_k.og.models.auth;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Role")
@Table(name = "auth_roles")
public class Role {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="value")
    private String value;

    public Long getId() {
        return this.id;
    }

    public String getValue() {
        return this.value;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
