package com.andres_k.og.dao.game;

import com.andres_k.og.models.item.game.Planet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanetRepository extends JpaRepository<Planet, Long> {
    Planet findByPositionAndPlayerId(String position, Long playerId);
    Planet findByPosition(String position);
}
