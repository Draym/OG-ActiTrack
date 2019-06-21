package com.andres_k.og.controllers.user;

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

import java.time.LocalDateTime;
import java.util.List;

@Controller
public class ActivityController {
    @Autowired
    private UserService userService;
    @Autowired
    PlayerActivityService playerActivityService;

    @Restricted
    @RequestMapping(value = "/activity", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> saveActivity(@RequestHeader String Authorization, @RequestBody List<PlayerActivityHandler> playerActivities) {
        try {
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
    @Restricted
    @RequestMapping(value = "/activity/self", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfActivity(@RequestHeader String Authorization, @RequestParam(required = false) String server, @RequestParam(required = false) LocalDateTime start, @RequestParam(required = false) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getSelfActivity(user.getId(), server, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Restricted
    @RequestMapping(value = "/activity/self/player", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String playerName, @RequestParam(required = false) LocalDateTime start, @RequestParam(required = false) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getSelfPlayerActivity(user.getId(), server, playerName, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Restricted
    @RequestMapping(value = "/activity/self/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfGalaxyActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String galaxy, @RequestParam(required = false) LocalDateTime start, @RequestParam(required = false) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getSelfGalaxyActivity(user.getId(), server, galaxy, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * GLOBAL ACTIVITY
     */
    @Restricted
    @RequestMapping(value = "/activity/global", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalActivity(@RequestHeader String Authorization, @RequestParam(required = false) String server, @RequestParam(required = false) LocalDateTime start, @RequestParam(required = false) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getGlobalActivity(server, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Restricted
    @RequestMapping(value = "/activity/global/player", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String playerName, @RequestParam(required = false) LocalDateTime start, @RequestParam(required = false) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getGlobalPlayerActivity(server, playerName, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Restricted
    @RequestMapping(value = "/activity/global/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalGalaxyActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String galaxy, @RequestParam(required = false) LocalDateTime start, @RequestParam(required = false) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<ActivityLog> activities = this.playerActivityService.getGlobalGalaxyActivity(server, galaxy, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
