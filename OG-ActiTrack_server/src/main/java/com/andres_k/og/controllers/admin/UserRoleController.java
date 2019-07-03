package com.andres_k.og.controllers.admin;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.enums.ERoles;
import com.andres_k.og.services.UserService;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller("AdminUserRoleController")
@RequestMapping(value = "/admin/user/role")
public class UserRoleController {
    private final UserService userService;

    @Autowired
    public UserRoleController(UserService userService) {
        this.userService = userService;
    }

    @Restricted(required = ERoles.ADMIN)
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteUserRole(@RequestParam Long userId, @RequestParam Long roleId) {
        try {
            this.userService.deleteRole(userId, roleId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[UserRole/delete]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
