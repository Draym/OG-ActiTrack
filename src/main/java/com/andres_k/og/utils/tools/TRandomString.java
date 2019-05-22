package com.andres_k.og.utils.tools;

import java.security.SecureRandom;
import java.util.Locale;
import java.util.Random;

public class TRandomString {

    private final String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    private final String lower = upper.toLowerCase(Locale.ROOT);

    private final String digits = "0123456789";

    private final String alphanum = upper + lower + digits;

    private String generate(int length, Random random, String symbols) {
        if (length < 1)
            throw new IllegalArgumentException();
        if (symbols.length() < 2)
            throw new IllegalArgumentException();
        if (random == null)
            throw new NullPointerException();

        char[] symbolsArray = symbols.toCharArray();
        char[] buf = new char[length];

        for (int idx = 0; idx < buf.length; ++idx)
            buf[idx] = symbolsArray[random.nextInt(symbolsArray.length)];
        return new String(buf);
    }

    /**
     * Create an alphanumeric string generator.
     */
    public String generate(int length, Random random) {
        return this.generate(length, random, alphanum);
    }

    /**
     * Create an alphanumeric strings from a secure generator.
     */
    public String generate(int length) {
        return this.generate(length, new SecureRandom());
    }

    /**
     * Create session identifiers.
     */
    public String generate() {
        return this.generate(21);
    }

    /**
     * SINGLETON
     **/
    private static TRandomString instance;

    private TRandomString() {
    }

    public static TRandomString get() {
        if (instance == null) {
            instance = new TRandomString();
        }
        return instance;
    }

}