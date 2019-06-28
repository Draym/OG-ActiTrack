package com.andres_k.og.dao;

import com.andres_k.og.models.auth.user.UserPremium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserPremiumRepository extends JpaRepository<UserPremium, Long> {
    Optional<UserPremium> findByUserId(Long userId);
    List<UserPremium> findAllByScoreLessThan(Long score);
}
