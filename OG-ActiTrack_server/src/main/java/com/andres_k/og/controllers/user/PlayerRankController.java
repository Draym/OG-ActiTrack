package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.item.mapping.PlayerRank;
import com.andres_k.og.services.PlayerRankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/player")
public class PlayerRankController {
    private final PlayerRankService playerRankService;

    @Autowired
    public PlayerRankController(PlayerRankService playerRankService) {
        this.playerRankService = playerRankService;
    }

    @Restricted
    @RequestMapping(value = "/ranking/save", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> saveRanking(@RequestBody List<PlayerRank> ranking) {
        try {
            this.playerRankService.saveRanking(ranking);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
