package com.andres_k.og.models.item;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanetRepository extends JpaRepository<Planet, Long> {
    /**
     * Method findByPlanetPosAndServer
     *
     * @param planetPos the planet position.
     * @param playerId the playerId
     * @return the planet found
     */
    Planet findByPlanetPosAndPlayerId(String planetPos, Long playerId);
}
