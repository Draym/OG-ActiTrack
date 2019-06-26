package com.andres_k.og.models.item.mapping;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    /**
     * Method findByPlayerName
     *
     * @param playerRef the player name.
     * @return the player having the passed name or null if no player is found.
     */
    Player findByPlayerRef(String playerRef);

    Optional<Player> findByServerAndPlayerRef(String server, String playerRef);
    Optional<Player> findByServerAndPlayerName(String server, String playerName);
}
