package com.andres_k.og.dao.game;

import com.andres_k.og.models.item.FriendGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendGroupRepository extends JpaRepository<FriendGroup, Long> {
    List<FriendGroup> findAllByUserId(Long userId);
    List<FriendGroup> findAllByFriendId(Long friendId);
    Optional<FriendGroup> findByUserIdAndFriendId(Long userId, Long friendId);
    boolean existsByUserIdAndFriendId(Long userId, Long friendId);
}
