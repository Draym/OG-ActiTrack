package com.andres_k.og.controllers.webhooks;

import com.andres_k.og.models.http.KofiHandler;
import com.andres_k.og.utils.tools.Console;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/kofi")
public class KofiController {

    @RequestMapping(value = "/alert", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody KofiHandler data) {

        try {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[Auth/login]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
