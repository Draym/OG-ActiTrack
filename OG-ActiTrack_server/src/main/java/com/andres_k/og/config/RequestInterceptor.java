package com.andres_k.og.config;

import com.andres_k.og.models.auth.User;
import com.andres_k.og.services.AuthService;
import com.andres_k.og.services.TokenService;
import com.andres_k.og.services.UserRoleService;
import com.andres_k.og.services.UserService;
import com.andres_k.og.utils.managers.EndpointManager;
import com.andres_k.og.utils.tools.Console;
import com.andres_k.og.utils.tools.TJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Map;

public class RequestInterceptor implements HandlerInterceptor {
    @Autowired
    AuthService authService;
    @Autowired
    TokenService tokenService;
    @Autowired
    UserService userService;
    @Autowired
    UserRoleService userRoleService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String token = request.getHeader("Authorization");
        String method = request.getMethod();
        String endpoint = request.getRequestURI();

        Console.log("api requested: " + endpoint);
        Console.log("method: " + method);
        Console.log("auth: " + token);

        Restricted restriction = EndpointManager.getRestriction(endpoint);

        if (restriction == null || !restriction.tokenRequired())
            return true;
        if (token == null || token.length() == 0)
            return false;

        if (!this.tokenService.verifyValidity(token))
            return false;

        User user = this.userService.getUserByToken(token);

        return this.userRoleService.isUserAllowed(user, Arrays.asList(restriction.roles()));
    }
}