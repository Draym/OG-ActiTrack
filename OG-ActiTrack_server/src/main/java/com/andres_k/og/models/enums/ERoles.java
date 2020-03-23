package com.andres_k.og.models.enums;

import com.andres_k.og.models.auth.Role;

public enum ERoles {
    NONE("NONE", 0),
    ADMIN("ADMIN", 1),
    PREMIUM("PREMIUM", 2),
    USER("USER", 3);

    ;
    private String value;
    private Integer level;

    ERoles(String value, Integer level) {
        this.value = value;
        this.level = level;
    }

    public Integer getLevel(){
        return this.level;
    }

    public boolean hasLevel(Role role) {
        return this.level <= role.getLevel();
    }

    public String getValue() {
        return this.value;
    }
}