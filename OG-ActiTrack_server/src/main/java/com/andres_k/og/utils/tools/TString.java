package com.andres_k.og.utils.tools;

public class TString {
    public static String getLast(String value) {
        return value.substring(value.length() - 1);
    }

    public static String getFirst(String value) {
        return String.valueOf(value.charAt(0));
    }

    public static String capitalizeFirst(String value) {
        return value.substring(0,1).toUpperCase() + value.substring(1).toLowerCase();
    }

    public static String removeFirst(String value) {
        return value.substring(1);
    }

    public static boolean isNull(String value) {
        return (value == null || value.isEmpty());
    }
}
