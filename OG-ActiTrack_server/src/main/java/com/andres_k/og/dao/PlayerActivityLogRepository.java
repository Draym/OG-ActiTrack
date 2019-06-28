package com.andres_k.og.dao;

import com.andres_k.og.models.item.game.PlayerActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Repository
public interface PlayerActivityLogRepository extends JpaRepository<PlayerActivityLog, Long> {

    PlayerActivityLog findByPositionAndServerAndUserIdAndCreationDateBetween(String position, String server, Long userId, LocalDateTime from, LocalDateTime to);

    /** COUNT **/
    Long countByCreationDateBetween(LocalDateTime from, LocalDateTime to);
    Long countByServerAndCreationDateBetween(String server, LocalDateTime from, LocalDateTime to);
    Long countByUserIdAndCreationDateBetween(Long userId, LocalDateTime from, LocalDateTime to);
    Long countByUserIdAndServerAndCreationDateBetween(Long userId, String server, LocalDateTime from, LocalDateTime to);

    /** PLAYER ACTIVITY **/
    List<PlayerActivityLog> findAllByServerAndPlayerIdAndCreationDateBetweenAndUserIdIn(String server, Long playerId, LocalDateTime from, LocalDateTime to, Set<Long> playerIds);

    /** GALAXY ACTIVITY **/
    List<PlayerActivityLog> findAllByServerAndPositionStartingWithAndCreationDateBetweenAndUserIdIn(String server, String galaxy, LocalDateTime from, LocalDateTime to, Set<Long> playerId);
}
