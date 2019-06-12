package com.andres_k.og.models.item.mapping;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoonRepository extends JpaRepository<Moon, Long> {
    Moon findByPositionAndPlayerId(String position, Long playerId);
    Moon findByPosition(String position);
}
