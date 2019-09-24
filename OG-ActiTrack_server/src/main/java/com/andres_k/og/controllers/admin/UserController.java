package com.andres_k.og.controllers.admin;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.enums.ERoles;
import com.andres_k.og.services.auth.UserService;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller("AdminUserController")
@RequestMapping(value = "/admin/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Restricted(required = ERoles.ADMIN)
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteUser(@RequestBody Long userId) {
        try {
            this.userService.deleteUser(userId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[User/admin/delete]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted(required = ERoles.ADMIN)
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> update(@RequestBody User user) {
        try {
            User newUser = this.userService.updateUser(user);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[User/admin/update]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
