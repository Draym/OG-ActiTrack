package com.andres_k.og.dao.auth;

import com.andres_k.og.models.auth.user.UserPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPaymentRepository extends JpaRepository<UserPayment, Long> {
}
