package com.andres_k.og.controllers;

import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.http.AuthHandler;
import com.andres_k.og.models.http.PasswordHandler;
import com.andres_k.og.models.http.RegisterHandler;
import com.andres_k.og.models.http.TokenResponse;
import com.andres_k.og.services.AuthService;
import com.andres_k.og.services.SecurityLinkService;
import com.andres_k.og.services.TokenService;
import com.andres_k.og.services.UserService;
import com.andres_k.og.utils.tools.Console;
import com.andres_k.og.utils.tools.THashString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.persistence.EntityNotFoundException;
import java.io.IOException;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private SecurityLinkService securityLinkService;

    @RequestMapping(value = "/auth/login", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody AuthHandler auth) {

        try {
            User user = this.authService.login(auth.getEmail(), auth.getPassword());
            TokenResponse result = this.tokenService.createToken(user, auth.getOrigin());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (SecurityException | EntityNotFoundException ex) {
            Console.log("[Auth/login]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/auth/register", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> register(@RequestBody RegisterHandler auth) {
        try {
            this.userService.createUser(auth);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (SecurityException ex) {
            Console.log("[Auth/register]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception ex) {
            Console.log("[Auth/register]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
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
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @RequestMapping(value = "/auth/token/login", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> loginByToken(@RequestParam String token) {
        try {
            TokenResponse result = this.authService.loginByToken(token);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            Console.log("[Auth/token/login]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @RequestMapping(value = "/auth/token/checkResetPasswordToken", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> checkResetPasswordToken(@RequestParam String token) {
        try {
            this.securityLinkService.getPasswordSecurityLink(token);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[Auth/token/checkResetPasswordToken]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
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
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }


    @RequestMapping(value = "/auth/reset-password", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> resetPassword(@RequestBody PasswordHandler password) {
        try {
            this.authService.resetPassword(password);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (SecurityException ex) {
            Console.log("[Auth/reset-password]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (InternalError ex) {
            Console.log("[Auth/reset-password]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            Console.log("[Auth/reset-password]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @RequestMapping(value = "/auth/forgot-password", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> forgetPassword(@RequestParam String email) {
        try {
            this.authService.forgetPassword(email);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            Console.log("[Auth/forgot-password]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        } catch (IOException | MessagingException ex) {
            Console.log("[Auth/forgot-password]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
