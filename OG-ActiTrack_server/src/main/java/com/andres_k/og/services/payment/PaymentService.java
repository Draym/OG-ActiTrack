package com.andres_k.og.services.payment;

import com.andres_k.og.dao.auth.UserPaymentRepository;
import com.andres_k.og.dao.auth.UserRepository;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.auth.user.UserPayment;
import com.andres_k.og.models.http.KofiHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    private final UserPaymentRepository userPaymentRepository;
    private final UserRepository userRepository;


    @Autowired
    public PaymentService(UserPaymentRepository userPaymentRepository, UserRepository userRepository) {
        this.userPaymentRepository = userPaymentRepository;
        this.userRepository = userRepository;
    }

    public void savePayment(KofiHandler kofiHandler) {
        UserPayment payment = new UserPayment();
        payment.init(kofiHandler);
        Optional<User> optUser = this.userRepository.findByEmail(kofiHandler.from_name);
        if (!optUser.isPresent()) {
            optUser = this.userRepository.findByPseudo(kofiHandler.from_name);
        }
        optUser.ifPresent(user -> payment.setUserId(user.getId()));

        this.userPaymentRepository.save(payment);
    }

    public List<UserPayment> getAll() {
        return this.userPaymentRepository.findAll();
    }
}
