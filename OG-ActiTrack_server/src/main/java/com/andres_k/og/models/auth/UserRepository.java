package com.andres_k.og.models.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Method findByEmail
     *
     * @param email the user email.
     * @return the user having the passed email or null if no user is found.
     */
    User findByEmail(String email);
    /**
     * Method findByPseudo
     *
     * @param pseudo the user pseudo.
     * @return the user having the passed pseudo or null if no user is found.
     */
    User findByPseudo(String pseudo);
    boolean existsUserByEmail(String email);
    boolean existsUserByPseudo(String pseudo);
}
