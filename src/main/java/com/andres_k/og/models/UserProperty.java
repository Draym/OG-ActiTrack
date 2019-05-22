package com.andres_k.og.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "UserProperty")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class UserProperty<T extends UserProperty> {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;
    @NotNull
    @Column(name = "user_id")
    protected Long userId;
    @NotNull
    @Column(name = "owner_id")
    protected Long ownerId;
    @NotNull
    @Column(name = "name")
    protected String name;

    public void copy(T object) {
        if (object.name != null)
            this.setName(object.name);
        if (object.userId != null)
            this.setUserId(object.userId);
    }

    public Long getId() {
        return this.id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Long getOwnerId() {
        return this.ownerId;
    }

    public String getName() {
        return this.name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public void setName(String name) {
        this.name = name;
    }
}
