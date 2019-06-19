package com.andres_k.og.models.item.activity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    ActivityLog findByPositionAndServerAndUserIdAndCreationDateBetween(String position, String server, Long userId, LocalDateTime from, LocalDateTime to);

    List<ActivityLog> findAllByUserId(Long userId);

    List<ActivityLog> findAllByUserIdAndServer(Long userId, String server);

    List<ActivityLog> findAllByUserIdAndServerAndCreationDateBetween(Long userId, String server, LocalDateTime from, LocalDateTime to);

    List<ActivityLog> findAllByUserIdAndCreationDateBetween(Long userId, LocalDateTime from, LocalDateTime to);

    List<ActivityLog> findAllByUserIdAndServerAndPlayerName(Long userId, String server, String playerName);
    List<ActivityLog> findAllByUserIdAndServerAndPlayerNameAndCreationDateBetween(Long userId, String server, String playerName, LocalDateTime from, LocalDateTime to);

    List<ActivityLog> findAllByUserIdAndServerAndPositionStartingWith(Long userId, String server, String galaxy);
    List<ActivityLog> findAllByUserIdAndServerAndPositionStartingWithAndCreationDateBetween(Long userId, String server, String galaxy, LocalDateTime from, LocalDateTime to);

    List<ActivityLog> findAllByServerAndPlayerName(String server, String playerName);
    List<ActivityLog> findAllByServerAndPlayerNameAndCreationDateBetween(String server, String playerName, LocalDateTime from, LocalDateTime to);

    List<ActivityLog> findAllByServerAndPositionStartingWith(String server, String galaxy);
    List<ActivityLog> findAllByServerAndPositionStartingWithAndCreationDateBetween(String server, String galaxy, LocalDateTime from, LocalDateTime to);

    List<ActivityLog> findAllByServer(String server);

    List<ActivityLog> findAllByServerAndCreationDateBetween(String server, LocalDateTime from, LocalDateTime to);

    List<ActivityLog> findAllByCreationDateBetween(LocalDateTime from, LocalDateTime to);
}
