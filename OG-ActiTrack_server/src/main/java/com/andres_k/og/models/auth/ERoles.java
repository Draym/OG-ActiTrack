package com.andres_k.og.models.auth;

public enum ERoles {
    USER("USER_ROLE"),
    DEV("DEV_ROLE"),
    ADMIN("ADMIN_ROLE");

    private String value;

    ERoles(String value) {
        this.value = value;
    }

    public String get(){
        return this.value;
    }

    public boolean isEquals(Role role) {
        return this.value.equals(role.getValue());
    }
}
