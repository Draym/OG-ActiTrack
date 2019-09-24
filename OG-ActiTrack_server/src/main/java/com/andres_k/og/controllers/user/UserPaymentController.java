package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.user.UserPayment;
import com.andres_k.og.services.payment.PaymentService;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/user/payment")
public class UserPaymentController {
    private final PaymentService paymentService;

    @Autowired
    public UserPaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @Restricted
    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getAll() {
        try {
            List<UserPayment> payments = this.paymentService.getAll();
            return new ResponseEntity<>(payments, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[UserPayment/getAll]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
