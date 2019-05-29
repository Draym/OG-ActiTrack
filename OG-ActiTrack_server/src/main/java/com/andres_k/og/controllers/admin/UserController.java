package com.andres_k.og.controllers.admin;

import com.andres_k.og.config.HttpResponse;
import com.andres_k.og.models.auth.ERoles;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.services.AuthorizationService;
import com.andres_k.og.services.UserService;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller("AdminUserController")
@RequestMapping(value = "/admin")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthorizationService authorizationService;

    @RequestMapping(value = "/user/delete", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteUser(@RequestHeader String Authorization, @RequestBody Long userId) {
        try {
            if (!this.authorizationService.isAuthorized(ERoles.ADMIN, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            this.userService.deleteUser(userId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[User/admin/delete]: " + ex.toString());
            return new ResponseEntity<>("Error deleting the user:" + ex.toString(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/user/update", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> update(@RequestHeader String Authorization, @RequestBody User user) {
        try {
            if (!this.authorizationService.isAuthorized(ERoles.ADMIN, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User newUser = this.userService.updateUser(user);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[User/admin/update]: " + ex.toString());
            return new ResponseEntity<>("Error updating the user:" + ex.toString(), HttpStatus.NOT_FOUND);
        }
    }
}
