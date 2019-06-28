package com.andres_k.og.dao;

import com.andres_k.og.models.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Method findByEmail
     *
     * @param email the user email.
     * @return the user having the passed email or null if no user is found.
     */
    Optional<User> findByEmail(String email);
    /**
     * Method findByPseudo
     *
     * @param pseudo the user pseudo.
     * @return the user having the passed pseudo or null if no user is found.
     */
    Optional<User> findByPseudo(String pseudo);
    boolean existsUserByEmail(String email);
    boolean existsUserByPseudo(String pseudo);
}
