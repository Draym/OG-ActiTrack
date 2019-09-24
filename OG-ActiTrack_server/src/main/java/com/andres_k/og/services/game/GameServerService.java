package com.andres_k.og.services.game;

import com.andres_k.og.dao.game.GameServerRepository;
import com.andres_k.og.dao.game.PlayerActivityLogRepository;
import com.andres_k.og.dao.game.PlayerRepository;
import com.andres_k.og.models.item.game.GameServer;
import com.andres_k.og.models.item.game.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameServerService {
    private final GameServerRepository serverRepository;
    private final PlayerRepository playerRepository;
    private final PlayerActivityLogRepository playerActivityLogRepository;

    @Autowired
    public GameServerService(GameServerRepository serverRepository, PlayerRepository playerRepository, PlayerActivityLogRepository playerActivityLogRepository) {
        this.serverRepository = serverRepository;
        this.playerRepository = playerRepository;
        this.playerActivityLogRepository = playerActivityLogRepository;
    }

    public List<GameServer> getAllServer() {
        return this.serverRepository.findAll();
    }

    public List<Object> getAvailableGalaxyInServer(String serverName) {
        return this.playerActivityLogRepository.findDistinctGalaxyByServer(serverName);
    }

    public List<Object> checkPlayerInServer(String serverName, String playerName) {
        return this.playerRepository.findAllByPossiblePlayerNameAndServer(playerName, serverName);
    }

    public Player getByServerAndPlayerName(String serverName, String playerName) {
        Optional<Player> optPlayer = this.playerRepository.findByServerAndPlayerName(serverName, playerName);
        return optPlayer.orElse(null);
    }

}
