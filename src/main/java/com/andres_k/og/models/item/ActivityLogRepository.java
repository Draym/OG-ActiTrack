package com.andres_k.og.models.item;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    ActivityLog findByPlanetIdAndCreationDateIsGreaterThan(Long planetId, LocalDateTime currentDate);
}
