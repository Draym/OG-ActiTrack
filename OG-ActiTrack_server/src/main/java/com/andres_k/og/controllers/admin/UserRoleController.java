package com.andres_k.og.controllers.admin;

import com.andres_k.og.config.HttpResponse;
import com.andres_k.og.models.auth.ERoles;
import com.andres_k.og.services.AuthorizationService;
import com.andres_k.og.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller("AdminUserRoleController")
@RequestMapping(value = "/admin")
public class UserRoleController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthorizationService authorizationService;

    @RequestMapping(value = "/user/role/delete", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteUserRole(@RequestHeader String Authorization, @RequestParam Long userId, @RequestParam Long roleId) {
        HttpResponse response = new HttpResponse();

        try {
            if (!this.authorizationService.isAuthorized(ERoles.ADMIN, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            this.userService.deleteRole(userId, roleId);
            response.addResult(true);
        } catch (Exception ex) {
            response.addError("Error deleting the user:" + ex.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
