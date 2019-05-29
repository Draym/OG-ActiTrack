package com.andres_k.og.config;

import com.andres_k.og.services.*;
import com.andres_k.og.utils.managers.EndpointManager;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Deprecated
public class RequestInterceptor implements HandlerInterceptor {
    @Autowired
    AuthorizationService authorizationService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String token = request.getHeader("Authorization");
        String method = request.getMethod();
        String endpoint = request.getRequestURI();

        Console.log("api requested: " + endpoint);
        Console.log("method: " + method);
        Console.log("auth: " + token);

        if (endpoint.contains("/api/error"))
            return true;
        Restricted restriction = EndpointManager.getRestriction(endpoint);

        if (restriction == null || !restriction.tokenRequired())
            return true;
        if (token == null || token.length() == 0)
            return false;

        return this.authorizationService.isAuthorized(restriction, token);
    }
}