package com.andres_k.og.dao;

import com.andres_k.og.models.item.game.GameServer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameServerRepository extends JpaRepository<GameServer, Long> {
    GameServer findByServer(String server);
}
