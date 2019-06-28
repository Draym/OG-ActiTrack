package com.andres_k.og.dao;

import com.andres_k.og.models.item.game.PlayerRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRankRepository extends JpaRepository<PlayerRank, Long> {

    Optional<PlayerRank> findByPlayerRef(String playerRef);
}
