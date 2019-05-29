package com.andres_k.og.controllers.user;

import com.andres_k.og.config.HttpResponse;
import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.ERoles;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.http.PlayerActivityHandler;
import com.andres_k.og.models.item.activity.ActivityLog;
import com.andres_k.og.services.AuthorizationService;
import com.andres_k.og.services.PlayerActivityService;
import com.andres_k.og.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ActivityController {
    @Autowired
    private UserService userService;
    @Autowired
    PlayerActivityService playerActivityService;
    @Autowired
    private AuthorizationService authorizationService;

    @RequestMapping(value = "/activity", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> saveActivity(@RequestHeader String Authorization, @RequestBody List<PlayerActivityHandler> playerActivities) {
        HttpResponse response = new HttpResponse();

        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            for (PlayerActivityHandler playerActivity : playerActivities) {
                this.playerActivityService.saveActivity(user.getId(), playerActivity);
            }
            response.addResult("ok");
        } catch (Exception ex) {
            response.addError("Error updating the user:" + ex.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * SELF ACTIVITY
     */
    @RequestMapping(value = "/activity/self", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfActivity(@RequestHeader String Authorization) {
        HttpResponse response = new HttpResponse();

        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getSelfActivity(user.getId());
            response.addResult(activities);
        } catch (Exception ex) {
            response.addError("Error updating the user:" + ex.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @RequestMapping(value = "/activity/self/player", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfPlayerActivity(@RequestHeader String Authorization, @RequestParam String playerName) {
        HttpResponse response = new HttpResponse();

        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getSelfPlayerActivity(user.getId(), playerName);
            response.addResult(activities);
        } catch (Exception ex) {
            response.addError("Error updating the user:" + ex.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @RequestMapping(value = "/activity/self/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfGalaxyActivity(@RequestHeader String Authorization, @RequestParam String galaxy) {
        HttpResponse response = new HttpResponse();

        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getSelfGalaxyActivity(user.getId(), galaxy);
            response.addResult(activities);
        } catch (Exception ex) {
            response.addError("Error updating the user:" + ex.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * GLOBAL ACTIVITY
     */
    @RequestMapping(value = "/activity/global", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalActivity(@RequestHeader String Authorization) {
        HttpResponse response = new HttpResponse();

        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getGlobalActivity();
            response.addResult(activities);
        } catch (Exception ex) {
            response.addError("Error updating the user:" + ex.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @RequestMapping(value = "/activity/global/player", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalPlayerActivity(@RequestHeader String Authorization, @RequestParam String playerName) {
        HttpResponse response = new HttpResponse();

        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getGlobalPlayerActivity(playerName);
            response.addResult(activities);
        } catch (Exception ex) {
            response.addError("Error updating the user:" + ex.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @RequestMapping(value = "/activity/global/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalGalaxyActivity(@RequestHeader String Authorization, @RequestParam String galaxy) {
        HttpResponse response = new HttpResponse();

        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getGlobalGalaxyActivity(galaxy);
            response.addResult(activities);
        } catch (Exception ex) {
            response.addError("Error updating the user:" + ex.toString());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
