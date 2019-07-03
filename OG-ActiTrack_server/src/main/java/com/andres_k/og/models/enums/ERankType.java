package com.andres_k.og.models.enums;

public enum ERankType {
    GENERAL("general", 0),
    ECONOMY("economy", 1),
    RESEARCH("research", 2),
    MILITARY("military", 3);

    private String value;
    private int id;

    ERankType(String value, int id) {
        this.value = value;
        this.id = id;
    }

    public boolean is(String value) {
        return this.value.equals(value);
    }

    public boolean is(int id) {
        return this.id == id;
    }
}
