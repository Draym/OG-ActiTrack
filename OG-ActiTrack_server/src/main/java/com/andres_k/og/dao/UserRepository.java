package com.andres_k.og.dao;

import com.andres_k.og.models.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPseudo(String pseudo);
    boolean existsUserByEmail(String email);
    boolean existsUserByPseudo(String pseudo);
    Optional<User> findByPseudoAndSecret(String pseudo, String secret);
}
