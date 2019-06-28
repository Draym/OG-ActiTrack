package com.andres_k.og.dao;

import com.andres_k.og.models.auth.link.UserActivationLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserActivationLinkRepository extends JpaRepository<UserActivationLink, Long> {
    Optional<UserActivationLink> findByIdentifier(String identifier);
    void deleteAllByUserId(Long userId);
}
