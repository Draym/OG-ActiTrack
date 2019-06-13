package com.andres_k.og.controllers.user;

import com.andres_k.og.models.auth.ERoles;
import com.andres_k.og.models.item.mapping.OGServer;
import com.andres_k.og.models.item.mapping.OGServerRepository;
import com.andres_k.og.models.item.mapping.Player;
import com.andres_k.og.models.item.mapping.PlayerRepository;
import com.andres_k.og.services.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class DataController {
    @Autowired
    OGServerRepository serverRepository;
    @Autowired
    PlayerRepository playerRepository;
    @Autowired
    private AuthorizationService authorizationService;

    @RequestMapping(value = "/data/availableServers", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getAvailableServer(@RequestHeader String Authorization) {
        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            List<OGServer> OGServers = this.serverRepository.findAll();

            return new ResponseEntity<>(OGServers, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @RequestMapping(value = "/data/playerExistInServer", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> playerExistInServer(@RequestHeader String Authorization, @RequestParam String server, @RequestParam String playerName) {
        try {
            if (!this.authorizationService.isAuthorized(ERoles.USER, Authorization))
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            Optional<Player> optPlayer = this.playerRepository.findByServerAndPlayerName(server, playerName);
            return new ResponseEntity<>(optPlayer.isPresent(), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
