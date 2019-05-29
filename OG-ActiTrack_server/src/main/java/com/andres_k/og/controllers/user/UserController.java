package com.andres_k.og.controllers.user;

import com.andres_k.og.config.HttpResponse;
import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.Token;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.services.TokenService;
import com.andres_k.og.services.UserService;
import com.andres_k.og.utils.tools.TJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Restricted
@Controller
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private TokenService tokenService;

    @RequestMapping(value = "/user/delete", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteUser(@RequestHeader String Authorization, @RequestBody Long userId) {
        HttpResponse response = new HttpResponse();

        try {
            Token tokenValue = this.tokenService.getToken(Authorization);
            this.userService.deleteUser(userId, tokenValue);
            response.addResult(true);
        } catch (Exception ex) {
            response.addError("Error deleting the user:" + ex.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/user/update", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> update(@RequestHeader String Authorization, @RequestBody User user) {
        HttpResponse response = new HttpResponse();

        try {
            Token tokenValue = this.tokenService.getToken(Authorization);
            User newUser = this.userService.updateUser(user, tokenValue);
            response.addResult(newUser);
        } catch (Exception ex) {
            response.addError("Error updating the user:" + ex.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
