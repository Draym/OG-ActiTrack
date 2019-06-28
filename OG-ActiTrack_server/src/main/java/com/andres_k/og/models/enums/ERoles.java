package com.andres_k.og.models.enums;

import com.andres_k.og.models.auth.Role;

public enum ERoles {
    USER("USER_ROLE"),
    DEV("DEV_ROLE"),
    ADMIN("ADMIN_ROLE");

    private String value;

    ERoles(String value) {
        this.value = value;
    }

    public String getValue(){
        return this.value;
    }

    public boolean isEquals(Role role) {
        return this.value.equals(role.getValue());
    }
}
