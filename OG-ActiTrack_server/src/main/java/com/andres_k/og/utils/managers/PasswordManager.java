package com.andres_k.og.utils.managers;

import com.andres_k.og.utils.tools.THashString;

public class PasswordManager {
    public static String hashPassword(String password) throws InternalError {
        try {
            return THashString.createHash(password);
        } catch (THashString.CannotPerformOperationException e) {
            throw new InternalError(e);
        }
    }

    public static void verifyPassword(String password, String correct) throws SecurityException, InternalError {
        try {
            if (!THashString.compare(password, correct))
                throw new SecurityException("The password is incorrect");
        } catch (THashString.InvalidHashException | THashString.CannotPerformOperationException e){
            throw new InternalError("The password can't be processed.");
        }
    }
}
