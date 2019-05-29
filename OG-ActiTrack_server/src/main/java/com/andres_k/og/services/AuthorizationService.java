package com.andres_k.og.services;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.ERoles;
import com.andres_k.og.models.auth.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class AuthorizationService {
    @Autowired
    TokenService tokenService;
    @Autowired
    UserService userService;
    @Autowired
    UserRoleService userRoleService;

    public boolean isAuthorized(Restricted restriction, String token) {
        if (!this.tokenService.verifyValidity(token))
            return false;

        User user = this.userService.getUserByToken(token);

        return this.userRoleService.isUserAllowed(user, Arrays.asList(restriction.roles()));
    }

    public boolean isAuthorized(ERoles role, String token) {
        if (!this.tokenService.verifyValidity(token))
            return false;

        User user = this.userService.getUserByToken(token);

        return this.userRoleService.isUserAllowed(user, role);
    }
}
