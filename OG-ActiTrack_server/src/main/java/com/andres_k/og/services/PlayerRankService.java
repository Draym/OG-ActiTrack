package com.andres_k.og.services;

import com.andres_k.og.models.http.PlayerRankHandler;
import com.andres_k.og.models.enums.ERankType;
import com.andres_k.og.models.item.game.Player;
import com.andres_k.og.dao.PlayerRankRepository;
import com.andres_k.og.dao.PlayerRepository;
import com.andres_k.og.models.item.game.PlayerRank;
import com.andres_k.og.models.item.game.RankAttribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerRankService {
    private final PlayerRankRepository playerRankRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerRankService(PlayerRankRepository playerRankRepository, PlayerRepository playerRepository) {
        this.playerRankRepository = playerRankRepository;
        this.playerRepository = playerRepository;
    }

    public void saveRanking(List<PlayerRankHandler> ranking) {
        for (PlayerRankHandler rank : ranking) {
            Optional<Player> optPlayer = this.playerRepository.findByPlayerRef(rank.getPlayerRef());
            this.updatePlayerFromRank((optPlayer.orElse(new Player())), rank);

            Optional<PlayerRank> optPlayerRank = this.playerRankRepository.findByPlayerRef(rank.getPlayerRef());
            this.updatePlayerRank((optPlayerRank.orElse(new PlayerRank())), rank);
        }
    }

    private void updatePlayerFromRank(Player player, PlayerRankHandler rank) {
        if (!rank.getPlayerName().contains("..."))
            player.setPlayerName(rank.getPlayerName());
        player.setPlayerRef(rank.getPlayerRef());
        player.setServer(rank.getServer());
        player.setHonor(rank.getHonor());
        this.playerRepository.save(player);

    }

    private void updatePlayerRank(PlayerRank playerRank, PlayerRankHandler rank) {
        playerRank.setPlayerRef(rank.getPlayerRef());

        RankAttribute rankAttribute = new RankAttribute(rank.getRank(), rank.getRankPoint());

        if (ERankType.GENERAL.is(rank.getRankType())) {
            if (playerRank.getGeneralRank() != null) {
                playerRank.getGeneralRank().update(rankAttribute);
            } else {
                playerRank.setGeneralRank(rankAttribute);
            }
        }
        else if (ERankType.MILITARY.is(rank.getRankType())) {
            if (playerRank.getMilitaryRank() != null) {
                playerRank.getMilitaryRank().update(rankAttribute);
            } else {
                playerRank.setMilitaryRank(rankAttribute);
            }
        }
        else if (ERankType.ECONOMY.is(rank.getRankType())) {
            if (playerRank.getEconomyRank() != null) {
                playerRank.getEconomyRank().update(rankAttribute);
            } else {
                playerRank.setEconomyRank(rankAttribute);
            }
        }
        else if (ERankType.RESEARCH.is(rank.getRankType())) {
            if (playerRank.getResearchRank() != null) {
                playerRank.getResearchRank().update(rankAttribute);
            } else {
                playerRank.setResearchRank(rankAttribute);
            }
        }
        this.playerRankRepository.save(playerRank);
    }
}
