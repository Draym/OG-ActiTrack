package com.andres_k.og.models.item.activity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    ActivityLog findByPositionAndServerAndUserIdAndCreationDateBetween(String position, String server, Long userId, LocalDateTime minDate, LocalDateTime maxDate);

    List<ActivityLog> findAllByUserIdAndPlayerName(Long userId, String playerName);

    List<ActivityLog> findAllByUserId(Long userId);

    List<ActivityLog> findAllByPlayerName(String playerName);

    List<ActivityLog> findAllByPositionStartingWith(String galaxy);

    List<ActivityLog> findAllByUserIdAndPositionStartingWith(Long userId, String galaxy);
}
