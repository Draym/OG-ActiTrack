package com.andres_k.og.dao;

import com.andres_k.og.models.item.game.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Query("SELECT playerName, playerRef, id AS playerId FROM Player WHERE playerName LIKE %?1% AND server = ?2")
    List<Object> findAllByPossiblePlayerNameAndServer(String playerName, String server);
    Optional<Player> findByServerAndPlayerRef(String server, String playerRef);
    Optional<Player> findByServerAndPlayerName(String server, String playerName);
}
