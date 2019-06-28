package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.enums.EActivityType;
import com.andres_k.og.models.http.PlayerActivityHandler;
import com.andres_k.og.models.item.game.PlayerActivityLog;
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
@RequestMapping("/activity")
public class PlayerActivityLogController {
    private final UserService userService;
    private final PlayerActivityService playerActivityService;

    @Autowired
    public PlayerActivityLogController(UserService userService, PlayerActivityService playerActivityService) {
        this.userService = userService;
        this.playerActivityService = playerActivityService;
    }

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
    @RequestMapping(value = "/self/player", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam Long playerId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = activities = this.playerActivityService.getPlayerActivity(EActivityType.SELF, user.getId(), server, playerId, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Restricted
    @RequestMapping(value = "/self/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSelfPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String galaxy, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getGalaxyActivity(EActivityType.SELF, user.getId(), server, galaxy, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * GLOBAL ACTIVITY
     */
    @Restricted
    @RequestMapping(value = "/friendgroup/player", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getFriendGroupPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam Long playerId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getPlayerActivity(EActivityType.FRIEND, user.getId(), server, playerId, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Restricted
    @RequestMapping(value = "/friendgroup/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getFriendGroupPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String galaxy, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getGalaxyActivity(EActivityType.FRIEND, user.getId(), server, galaxy, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * GLOBAL ACTIVITY
     */
    @Restricted
    @RequestMapping(value = "/global/player", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam Long playerId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getPlayerActivity(EActivityType.GLOBAL, user.getId(), server, playerId, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Restricted
    @RequestMapping(value = "/global/galaxy", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getGlobalPlayerActivity(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String galaxy, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        try {
            User user = this.userService.getUserByToken(Authorization);
            List<PlayerActivityLog> activities = this.playerActivityService.getGalaxyActivity(EActivityType.GLOBAL, user.getId(), server, galaxy, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
