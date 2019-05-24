package com.andres_k.og.models.item.activity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    ActivityLog findByPlanetPosAndServerAndCreationDateAfter(String planetPos, String server, LocalDateTime currentDate);

    List<ActivityLog> findAllByUserIdAndPlayerName(Long userId, String playerName);

    List<ActivityLog> findAllByUserId(Long userId);

    List<ActivityLog> findAllByPlayerName(String playerName);

    List<ActivityLog> findAllByPlanetPosStartingWith(String galaxy);

    List<ActivityLog> findAllByUserIdAndPlanetPosStartingWith(Long userId, String galaxy);
}
