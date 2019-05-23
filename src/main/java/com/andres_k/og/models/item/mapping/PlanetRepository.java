package com.andres_k.og.models.item.mapping;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanetRepository extends JpaRepository<Planet, Long> {
    Planet findByPlanetPosAndPlayerId(String planetPos, Long playerId);
    Planet findByPlanetPos(String planetPos);
}
