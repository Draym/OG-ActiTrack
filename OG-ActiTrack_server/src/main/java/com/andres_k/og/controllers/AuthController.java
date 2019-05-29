package com.andres_k.og.controllers;

import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.http.AuthHandler;
import com.andres_k.og.models.http.TokenResponse;
import com.andres_k.og.services.AuthService;
import com.andres_k.og.services.TokenService;
import com.andres_k.og.services.UserService;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

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
    public ResponseEntity<?> login(@RequestBody AuthHandler auth) {

        try {
            User user = this.authService.login(auth.getEmail(), auth.getPassword());
            TokenResponse result = this.tokenService.createToken(user, auth.getOrigin());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (SecurityException ex) {
            Console.log("[Auth/login]: " + ex.toString());
            return new ResponseEntity<>("The password is invalid.", HttpStatus.UNAUTHORIZED);
        } catch (EntityNotFoundException ex) {
            Console.log("[Auth/login]: " + ex.toString());
            return new ResponseEntity<>("The email is invalid.", HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/auth/register", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            this.userService.createUser(user);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            Console.log("[Auth/register]: " + ex.toString());
            return new ResponseEntity<>("An error happened with the user role.", HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            Console.log("[Auth/register]: " + ex.toString());
            return new ResponseEntity<>("The email/pseudo is already used.", HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = "/auth/validate", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> validate(@RequestParam String identifier) {
        try {
            this.authService.validateAccount(identifier);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            Console.log("[Auth/validate]: " + ex.toString());
            return new ResponseEntity<>("The link is invalid.", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/auth/token/login", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> loginByToken(@RequestHeader String Authorization) {
        try {
            TokenResponse result = this.authService.loginByToken(Authorization);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            Console.log("[Auth/token/login]: " + ex.toString());
            return new ResponseEntity<>("The token is invalid.", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/auth/refresh", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> refresh(@RequestHeader String Authorization) {
        try {
            TokenResponse result = this.authService.refreshToken(Authorization);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            Console.log("[Auth/refresh]: " + ex.toString());
            return new ResponseEntity<>("The token is invalid.", HttpStatus.NOT_FOUND);
        }
    }
}
