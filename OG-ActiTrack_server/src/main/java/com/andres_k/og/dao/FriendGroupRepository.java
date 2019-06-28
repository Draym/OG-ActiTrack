package com.andres_k.og.dao;

import com.andres_k.og.models.item.FriendGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendGroupRepository extends JpaRepository<FriendGroup, Long> {
    List<FriendGroup> findAllByUserId(Long userId);
    List<FriendGroup> findAllByFriendId(Long friendId);
}
