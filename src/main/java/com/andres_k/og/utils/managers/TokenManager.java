package com.andres_k.og.utils.managers;

import com.andres_k.og.utils.tools.TRandomString;

public class TokenManager {
    public static String generate() {
        return TRandomString.get().generate();
    }
}
