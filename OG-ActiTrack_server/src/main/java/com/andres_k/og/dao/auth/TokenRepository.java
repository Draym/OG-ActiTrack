package com.andres_k.og.dao.auth;

import com.andres_k.og.models.auth.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> getAllByUserIdAndValidIsTrue(Long userId);
    List<Token> getAllByUserIdAndValidIsTrueAndOriginEquals(Long userId, String origin);
    Optional<Token> findByToken(String token);
    Optional<Token> findByTokenBackup(String tokenBackup);
}
