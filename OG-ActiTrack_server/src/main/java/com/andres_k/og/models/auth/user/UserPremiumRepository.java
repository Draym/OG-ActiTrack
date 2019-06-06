package com.andres_k.og.models.auth.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPremiumRepository extends JpaRepository<UserPremium, Long> {
}
