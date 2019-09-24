package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.http.PlayerRankHandler;
import com.andres_k.og.models.item.game.Player;
import com.andres_k.og.services.game.PlayerRankService;
import com.andres_k.og.services.game.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/player")
public class PlayerController {
    private final PlayerRankService playerRankService;
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerRankService playerRankService, PlayerService playerService) {
        this.playerRankService = playerRankService;
        this.playerService = playerService;
    }

    @Restricted
    @RequestMapping(value = "/ranking/save", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> saveRanking(@RequestBody List<PlayerRankHandler> ranking) {
        try {
            this.playerRankService.saveRanking(ranking);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> updatePlayer(@RequestBody Player player) {
        try {
            this.playerService.update(player);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
