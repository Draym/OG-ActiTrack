package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.http.PlayerIdentityHandler;
import com.andres_k.og.models.item.game.GameServer;
import com.andres_k.og.models.item.game.Player;
import com.andres_k.og.services.GameServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/server")
public class GameServerController {
    private final GameServerService gameServerService;

    @Autowired
    public GameServerController(GameServerService gameServerService) {
        this.gameServerService = gameServerService;
    }

    @Restricted
    @RequestMapping(value = "/available", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getAvailableServer() {
        try {
            List<GameServer> gameServers = this.gameServerService.getAllServer();

            return new ResponseEntity<>(gameServers, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted
    @RequestMapping(value = "/galaxy/available", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getAvailableGalaxyInServer(@RequestParam String serverName) {
        try {
            List<Object> galaxies = this.gameServerService.getAvailableGalaxyInServer(serverName);

            return new ResponseEntity<>(galaxies, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted
    @RequestMapping(value = "/playerExist", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> playerExistInServer(@RequestParam String serverName, String playerName) {
        try {
            Player player = this.gameServerService.getByServerAndPlayerName(serverName, playerName);
            if (player != null) {
                return new ResponseEntity<>(new PlayerIdentityHandler(player.getId(), player.getPlayerName(), player.getPlayerRef()), HttpStatus.OK);
            } else {
                List<Object> possiblePlayerNames = this.gameServerService.checkPlayerInServer(serverName, playerName);
                if (possiblePlayerNames.size() > 0)
                    return new ResponseEntity<>(possiblePlayerNames, HttpStatus.NOT_FOUND);
                return new ResponseEntity<>("There is no data for this player.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
