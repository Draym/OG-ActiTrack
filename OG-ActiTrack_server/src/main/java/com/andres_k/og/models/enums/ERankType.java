package com.andres_k.og.models.enums;

public enum ERankType {
    GENERAL("general"),
    MILITARY("military"),
    ECONOMY("economy"),
    RESEARCH("research");

    private String value;

    ERankType(String value) {
        this.value = value;
    }

    public boolean is(String value) {
        return this.value.equals(value);
    }
}
