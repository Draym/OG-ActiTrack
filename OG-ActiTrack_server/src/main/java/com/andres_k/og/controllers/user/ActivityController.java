package com.andres_k.og.controllers.user;

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
        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            for (PlayerActivityHandler playerActivity : playerActivities) {
                this.playerActivityService.saveActivity(user.getId(), playerActivity);
            }
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * SELF ACTIVITY
     */
    @RequestMapping(value = "/activity/self", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfActivity(@RequestHeader String Authorization) {
        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getSelfActivity(user.getId());
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/activity/self/player", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String playerName) {
        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getSelfPlayerActivity(user.getId(), server, playerName);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/activity/self/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfGalaxyActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String galaxy) {
        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getSelfGalaxyActivity(user.getId(), server, galaxy);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * GLOBAL ACTIVITY
     */
    @RequestMapping(value = "/activity/global", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalActivity(@RequestHeader String Authorization) {
        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getGlobalActivity();
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/activity/global/player", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String playerName) {
        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getGlobalPlayerActivity(server, playerName);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/activity/global/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalGalaxyActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String galaxy) {
        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getGlobalGalaxyActivity(server, galaxy);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
