package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.http.PlayerActivityHandler;
import com.andres_k.og.models.item.activity.PlayerActivityLog;
import com.andres_k.og.services.PlayerActivityService;
import com.andres_k.og.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/player/activity")
public class PlayerActivityLogController {
    @Autowired
    private UserService userService;
    @Autowired
    PlayerActivityService playerActivityService;

    @Restricted
    @RequestMapping(value = "/save", method = RequestMethod.POST)
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
    @RequestMapping(value = "/self/all", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfActivity(@RequestHeader String Authorization, @RequestParam(required = false) String server, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getSelfActivity(user.getId(), server, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Restricted
    @RequestMapping(value = "/self", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String playerName, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getSelfPlayerActivity(user.getId(), server, playerName, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Restricted
    @RequestMapping(value = "/self/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfGalaxyActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String galaxy, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getSelfGalaxyActivity(user.getId(), server, galaxy, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * GLOBAL ACTIVITY
     */
    @Restricted
    @RequestMapping(value = "/friendgroup/all", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getFriendGroupActivity(@RequestHeader String Authorization, @RequestParam(required = false) String server, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getGlobalActivity(server, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Restricted
    @RequestMapping(value = "/friendgroup", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getFriendGroupPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String playerName, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getGlobalPlayerActivity(server, playerName, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Restricted
    @RequestMapping(value = "/friendgroup/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getFriendGroupGalaxyActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String galaxy, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getGlobalGalaxyActivity(server, galaxy, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * GLOBAL ACTIVITY
     */
    @Restricted
    @RequestMapping(value = "/global/all", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalActivity(@RequestHeader String Authorization, @RequestParam(required = false) String server, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getGlobalActivity(server, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Restricted
    @RequestMapping(value = "/global", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String playerName, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getGlobalPlayerActivity(server, playerName, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Restricted
    @RequestMapping(value = "/global/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalGalaxyActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String galaxy, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getGlobalGalaxyActivity(server, galaxy, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
