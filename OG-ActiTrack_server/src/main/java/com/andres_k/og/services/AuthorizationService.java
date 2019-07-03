package com.andres_k.og.services;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.enums.ERoles;
import com.andres_k.og.models.auth.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {
    private final TokenService tokenService;
    private final UserService userService;
    private final UserRoleService userRoleService;

    @Autowired
    public AuthorizationService(TokenService tokenService, UserService userService, UserRoleService userRoleService) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.userRoleService = userRoleService;
    }

    public boolean isAuthorized(Restricted restriction, String token) {
        if (!this.tokenService.verifyValidity(token))
            return false;

        User user = this.userService.getUserByToken(token);

        return this.userRoleService.isUserAllowed(user, restriction.required());
    }

    public boolean isAuthorized(ERoles role, String token) {
        if (!this.tokenService.verifyValidity(token))
            return false;

        User user = this.userService.getUserByToken(token);

        return this.userRoleService.isUserAllowed(user, role);
    }

    public boolean isAuthorized(String token) {
        return this.tokenService.verifyValidity(token);
    }
}
