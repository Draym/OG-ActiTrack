package com.andres_k.og.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
public class HelloWorld {
    @RequestMapping(value = "/hi", method = RequestMethod.GET)
    public ResponseEntity<?> hello() {
        try {
            return new ResponseEntity<>("Hello world!", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
