package com.andres_k.og.dao.auth;


import com.andres_k.og.models.auth.link.PasswordSecurityLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordSecurityLinkRepository extends JpaRepository<PasswordSecurityLink, Long> {
    Optional<PasswordSecurityLink> findByIdentifier(String identifier);
    void deleteAllByUserId(Long userId);
}
