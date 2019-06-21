package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.Token;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.services.TokenService;
import com.andres_k.og.services.UserService;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private TokenService tokenService;

    @Restricted
    @RequestMapping(value = "/user/delete", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteUser(@RequestHeader String Authorization, @RequestBody Long userId) {
        try {
            Token tokenValue = this.tokenService.getToken(Authorization);
            this.userService.deleteUser(userId, tokenValue);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[User/delete]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted
    @RequestMapping(value = "/user/update", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> update(@RequestHeader String Authorization, @RequestBody User user) {
        try {
            Token tokenValue = this.tokenService.getToken(Authorization);
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
}
