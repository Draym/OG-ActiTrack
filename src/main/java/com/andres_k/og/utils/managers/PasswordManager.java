package com.andres_k.og.utils.managers;

import com.andres_k.og.utils.tools.THashString;

public class PasswordManager {
    public static String hashPassword(String password) throws THashString.CannotPerformOperationException {
        return THashString.createHash(password);
    }

    public static void verifyPassword(String password, String correct) throws Exception {
        if (!THashString.compare(password, correct))
            throw new SecurityException("The password is incorrect");
    }
}
