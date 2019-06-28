package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.item.game.GameServer;
import com.andres_k.og.dao.GameServerRepository;
import com.andres_k.og.models.item.game.Player;
import com.andres_k.og.dao.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/server")
public class GameServerController {
    @Autowired
    GameServerRepository serverRepository;
    @Autowired
    PlayerRepository playerRepository;

    @Restricted
    @RequestMapping(value = "/available", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getAvailableServer() {
        try {
            List<GameServer> GameServers = this.serverRepository.findAll();

            return new ResponseEntity<>(GameServers, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted
    @RequestMapping(value = "/playerExist", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> playerExistInServer(@RequestParam String server, @RequestParam String player) {
        try {
            Optional<Player> optPlayer = this.playerRepository.findByServerAndPlayerName(server, player);
            return new ResponseEntity<>(optPlayer.isPresent(), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
