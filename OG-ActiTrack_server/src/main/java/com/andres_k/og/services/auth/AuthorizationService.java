package com.andres_k.og.services.auth;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.enums.ERoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {
    private final TokenService tokenService;
    private final UserService userService;

    @Autowired
    public AuthorizationService(TokenService tokenService, UserService userService) {
        this.tokenService = tokenService;
        this.userService = userService;
    }

    public boolean isAuthorized(Restricted restriction, String token) {
       return this.isAuthorized(restriction.required(), token);
    }

    public boolean isAuthorized(ERoles role, String token) {
        if (!this.tokenService.verifyValidity(token))
            return false;
        User user = this.userService.getUserByToken(token);
        return role.hasLevel(user.getRole());
    }

    public boolean isAuthorized(String token) {
        return this.tokenService.verifyValidity(token);
    }
}
