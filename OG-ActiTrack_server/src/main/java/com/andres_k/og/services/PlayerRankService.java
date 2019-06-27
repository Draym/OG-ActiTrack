package com.andres_k.og.services;

import com.andres_k.og.models.item.mapping.PlayerRank;
import com.andres_k.og.models.item.mapping.PlayerRankRepository;
import com.andres_k.og.models.item.mapping.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerRankService {
    private final PlayerRankRepository playerRankRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerRankService(PlayerRankRepository playerRankRepository, PlayerRepository playerRepository) {
        this.playerRankRepository = playerRankRepository;
        this.playerRepository = playerRepository;
    }

    public void saveRanking(List<PlayerRank> ranking) {
        for (PlayerRank rank : ranking) {

        }
    }
}
