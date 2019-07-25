package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.Token;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.http.ChangePasswordHandler;
import com.andres_k.og.models.item.message.ContactMessage;
import com.andres_k.og.services.TokenService;
import com.andres_k.og.services.UserService;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;

    @Autowired
    public UserController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @Restricted
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteUser(@RequestHeader String Authorization, @RequestBody Long userId) {
        try {
            Token tokenValue = this.tokenService.getTokenByValue(Authorization);
            this.userService.deleteUser(userId, tokenValue);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[User/delete]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> update(@RequestHeader String Authorization, @RequestBody User user) {
        try {
            Token tokenValue = this.tokenService.getTokenByValue(Authorization);
            User newUser = this.userService.updateUser(user, tokenValue);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        } catch (SecurityException ex) {
            Console.log("[User/update]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (Exception ex) {
            Console.log("[User/update]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted
    @RequestMapping(value = "/update/password", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> updatePassword(@RequestHeader String Authorization, @RequestBody ChangePasswordHandler passwordHandler) {
        try {
            Token tokenValue = this.tokenService.getTokenByValue(Authorization);
            this.userService.updateUserPassword(passwordHandler, tokenValue);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (SecurityException ex) {
            Console.log("[User/update/password]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (Exception ex) {
            Console.log("[User/update/password]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
