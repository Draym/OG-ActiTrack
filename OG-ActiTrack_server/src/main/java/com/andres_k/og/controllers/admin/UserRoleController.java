package com.andres_k.og.controllers.admin;

import com.andres_k.og.config.HttpResponse;
import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.ERoles;
import com.andres_k.og.services.UserService;
import com.andres_k.og.utils.tools.TJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Restricted(tokenRequired = false, roles = ERoles.ADMIN)
@Controller("AdminUserRoleController")
@RequestMapping(value = "/admin")
public class UserRoleController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/user/role/delete", method = RequestMethod.DELETE)
    @ResponseBody
    public String deleteUserRole(@RequestParam Long userId, @RequestParam Long roleId) {
        HttpResponse response = new HttpResponse();

        try {
            this.userService.deleteRole(userId, roleId);
            response.addResult(true);
        } catch (Exception ex) {
            response.addError("Error deleting the user:" + ex.toString());
        }
        return TJson.toString(response);
    }
}
