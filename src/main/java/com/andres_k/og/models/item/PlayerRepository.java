package com.andres_k.og.models.item;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    /**
     * Method findByPlayerName
     *
     * @param playerName the player name.
     * @return the player having the passed name or null if no player is found.
     */
    Player findByPlayerName(String playerName);
}
