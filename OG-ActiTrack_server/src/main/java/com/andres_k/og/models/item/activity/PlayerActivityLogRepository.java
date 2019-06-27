package com.andres_k.og.models.item.activity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PlayerActivityLogRepository extends JpaRepository<PlayerActivityLog, Long> {

    PlayerActivityLog findByPositionAndServerAndUserIdAndCreationDateBetween(String position, String server, Long userId, LocalDateTime from, LocalDateTime to);

    List<PlayerActivityLog> findAllByUserId(Long userId);

    List<PlayerActivityLog> findAllByUserIdAndServer(Long userId, String server);

    List<PlayerActivityLog> findAllByUserIdAndServerAndCreationDateBetween(Long userId, String server, LocalDateTime from, LocalDateTime to);

    List<PlayerActivityLog> findAllByUserIdAndCreationDateBetween(Long userId, LocalDateTime from, LocalDateTime to);

    List<PlayerActivityLog> findAllByUserIdAndServerAndPlayerName(Long userId, String server, String playerName);
    List<PlayerActivityLog> findAllByUserIdAndServerAndPlayerNameAndCreationDateBetween(Long userId, String server, String playerName, LocalDateTime from, LocalDateTime to);

    List<PlayerActivityLog> findAllByUserIdAndServerAndPositionStartingWith(Long userId, String server, String galaxy);
    List<PlayerActivityLog> findAllByUserIdAndServerAndPositionStartingWithAndCreationDateBetween(Long userId, String server, String galaxy, LocalDateTime from, LocalDateTime to);

    List<PlayerActivityLog> findAllByServerAndPlayerName(String server, String playerName);
    List<PlayerActivityLog> findAllByServerAndPlayerNameAndCreationDateBetween(String server, String playerName, LocalDateTime from, LocalDateTime to);

    List<PlayerActivityLog> findAllByServerAndPositionStartingWith(String server, String galaxy);
    List<PlayerActivityLog> findAllByServerAndPositionStartingWithAndCreationDateBetween(String server, String galaxy, LocalDateTime from, LocalDateTime to);

    List<PlayerActivityLog> findAllByServer(String server);

    List<PlayerActivityLog> findAllByServerAndCreationDateBetween(String server, LocalDateTime from, LocalDateTime to);

    List<PlayerActivityLog> findAllByCreationDateBetween(LocalDateTime from, LocalDateTime to);
}
