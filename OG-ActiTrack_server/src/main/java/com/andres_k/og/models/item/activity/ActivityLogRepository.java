package com.andres_k.og.models.item.activity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    ActivityLog findByPositionAndServerAndUserIdAndCreationDateBetween(String position, String server, Long userId, LocalDateTime minDate, LocalDateTime maxDate);

    List<ActivityLog> findAllByUserId(Long userId);

    List<ActivityLog> findAllByUserIdAndServerAndPlayerName(Long userId, String server, String playerName);

    List<ActivityLog> findAllByUserIdAndServerAndPositionStartingWith(Long userId, String server, String galaxy);

    List<ActivityLog> findAllByServerAndPlayerName(String server, String playerName);

    List<ActivityLog> findAllByServerAndPositionStartingWith(String server, String galaxy);

}
