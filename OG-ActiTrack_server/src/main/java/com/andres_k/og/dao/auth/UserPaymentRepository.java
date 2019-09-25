package com.andres_k.og.dao.auth;

import com.andres_k.og.models.auth.user.UserPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPaymentRepository extends JpaRepository<UserPayment, Long> {
    List<UserPayment> findAllByUserId(Long userId);
}
