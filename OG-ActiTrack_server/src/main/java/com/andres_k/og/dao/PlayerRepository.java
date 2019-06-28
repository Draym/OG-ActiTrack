package com.andres_k.og.dao;

import com.andres_k.og.models.item.game.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    Optional<Player> findByPlayerRef(String playerRef);
    Optional<Player> findByServerAndPlayerRef(String server, String playerRef);
    Optional<Player> findByServerAndPlayerName(String server, String playerName);
}
