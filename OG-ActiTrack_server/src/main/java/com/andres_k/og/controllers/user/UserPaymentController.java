package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.Token;
import com.andres_k.og.models.auth.user.UserPayment;
import com.andres_k.og.services.auth.TokenService;
import com.andres_k.og.services.payment.PaymentService;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping("/user/payment")
public class UserPaymentController {
    private final PaymentService paymentService;
    private final TokenService tokenService;

    @Autowired
    public UserPaymentController(PaymentService paymentService, TokenService tokenService) {
        this.paymentService = paymentService;
        this.tokenService = tokenService;
    }

    @Restricted
    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getAll(@RequestHeader String Authorization) {
        try {
            Token tokenValue = this.tokenService.getTokenByValue(Authorization);
            List<UserPayment> payments = this.paymentService.getAllByUserId(tokenValue.getUserId());
            return new ResponseEntity<>(payments, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[UserPayment/getAll]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
