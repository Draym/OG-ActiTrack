package com.andres_k.og.controllers.webhooks;

import com.andres_k.og.models.http.KofiHandler;
import com.andres_k.og.services.payment.PaymentService;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/kofi")
public class KofiController {
    private final PaymentService paymentService;

    @Autowired
    public KofiController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @RequestMapping(value = "/alert", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody KofiHandler data) {
        try {
            this.paymentService.savePayment(data);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[Auth/login]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
