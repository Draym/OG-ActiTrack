package com.andres_k.og.controllers;

import com.andres_k.og.config.HttpResponse;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.auth.custom.AuthHandler;
import com.andres_k.og.models.auth.custom.TokenResponse;
import com.andres_k.og.services.AuthService;
import com.andres_k.og.services.TokenService;
import com.andres_k.og.services.UserService;
import com.andres_k.og.utils.tools.TJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;
    @Autowired
    private TokenService tokenService;

    @RequestMapping(value = "/auth/login", method = RequestMethod.POST)
    @ResponseBody
    public String login(@RequestBody AuthHandler auth) {
        HttpResponse response = new HttpResponse();

        try {
            User user = this.authService.login(auth.getEmail(), auth.getPassword());
            response.addResult(this.tokenService.createToken(user, auth.getOrigin()));
        } catch (Exception ex) {
            response.addError("Error creating the user:" + ex.toString());
        }
        return TJson.toString(response);
    }

    @RequestMapping(value = "/auth/register", method = RequestMethod.POST)
    @ResponseBody
    public String register(@RequestBody User user) {
        HttpResponse response = new HttpResponse();

        try {
            this.userService.createUser(user);
            response.addResult(true);
        } catch (Exception ex) {
            response.addError("Error creating the user:" + ex.toString());
            ex.printStackTrace();
        }
        return TJson.toString(response);
    }

    @RequestMapping(value = "/auth/validate", method = RequestMethod.GET)
    @ResponseBody
    public String validate(@RequestParam String identifier) {
        HttpResponse response = new HttpResponse();

        try {
            this.authService.validateAccount(identifier);
            response.addResult(true);
        } catch (Exception ex) {
            response.addError("Error validating the account:" + ex.toString());
        }
        return TJson.toString(response);
    }

    @RequestMapping(value = "/auth/token/login", method = RequestMethod.GET)
    @ResponseBody
    public String loginByToken(@RequestParam String token) {
        HttpResponse response = new HttpResponse();

        try {
            TokenResponse result = this.authService.loginByToken(token);
            response.addResult(result);
        } catch (Exception ex) {
            response.addError("Error validating the account:" + ex.toString());
        }
        return TJson.toString(response);
    }
}
