package com.andres_k.og.controllers.user;

import com.andres_k.og.config.HttpResponse;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.auth.custom.PlayerActivityHandler;
import com.andres_k.og.services.PlayerActivityService;
import com.andres_k.og.services.UserService;
import com.andres_k.og.utils.tools.TJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ActivityController {
    @Autowired
    private UserService userService;
    @Autowired
    PlayerActivityService playerActivityService;

    @RequestMapping(value = "/activity", method = RequestMethod.POST)
    @ResponseBody
    public String saveActivity(@RequestParam String token, @RequestBody List<PlayerActivityHandler> playerActivities) {
        HttpResponse response = new HttpResponse();

        try {
            User user = this.userService.getUserByToken(token);
            for (PlayerActivityHandler playerActivity : playerActivities) {
                this.playerActivityService.saveActivity(user.getId(), playerActivity);
            }
            response.addResult("ok");
        } catch (Exception ex) {
            response.addError("Error updating the user:" + ex.toString());
        }
        return TJson.toString(response);
    }
}
