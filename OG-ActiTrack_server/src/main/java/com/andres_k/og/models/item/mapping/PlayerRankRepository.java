package com.andres_k.og.models.item.mapping;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRankRepository extends JpaRepository<PlayerRank, Long> {

}
