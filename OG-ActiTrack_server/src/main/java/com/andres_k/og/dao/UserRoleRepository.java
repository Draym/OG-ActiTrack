package com.andres_k.og.dao;

import com.andres_k.og.models.auth.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    List<UserRole> getAllByUserId(Long userId);
    void deleteAllByUserId(Long userId);
    void deleteByUserIdAndRoleId(Long userId, Long roleId);
}
