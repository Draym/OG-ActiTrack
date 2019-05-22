package com.andres_k.og.models.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> getAllByUserIdAndExpiredIsFalse(Long userId);
    List<Token> getAllByUserIdAndExpiredIsFalseAndOriginEquals(Long userId, String origin);
    Optional<Token> findByValue(String value);
}
