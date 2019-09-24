package com.andres_k.og.services.game;

import com.andres_k.og.dao.game.PlayerRepository;
import com.andres_k.og.models.item.game.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public void update(Player data) {
        Optional<Player> optPlayer = this.playerRepository.findByServerAndPlayerRef(data.getServer(), data.getPlayerRef());

        if (optPlayer.isPresent()) {
            Player player = optPlayer.get();

            if (data.getHonor() != null)
                player.setHonor(data.getHonor());
            if (data.getPlayerAlly() != null)
                player.setPlayerAlly(data.getPlayerAlly());
            if (data.getPlayerName() != null)
                player.setPlayerName(data.getPlayerName());
            this.playerRepository.save(player);
        }
    }
}
