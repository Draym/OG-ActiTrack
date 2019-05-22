package com.andres_k.og.models.item;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserActivitiesRepository extends JpaRepository<UserActivities, Long> {
    /**
     * Method findByUserId
     *
     * @param userId the user ID.
     * @return the user having the passed userID or null if no user is found.
     */
    UserActivities findByUserId(Long userId);
}
