package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.auth.Token;
import com.andres_k.og.models.item.message.BugReportMessage;
import com.andres_k.og.models.item.message.ContactMessage;
import com.andres_k.og.services.MessageService;
import com.andres_k.og.services.TokenService;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value="/message")
public class MessageController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private TokenService tokenService;

    @Restricted
    @RequestMapping(value = "/user/contact", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> userContact(@RequestHeader String Authorization, @RequestBody ContactMessage message) {
        try {
            Token tokenValue = this.tokenService.getTokenByValue(Authorization);
            this.messageService.contact(message, tokenValue);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (SecurityException ex) {
            Console.log("[Message/contact]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception ex) {
            Console.log("[Message/contact]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted
    @RequestMapping(value = "/user/bugReport", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> userBugReport(@RequestHeader String Authorization, @RequestBody BugReportMessage message) {
        try {
            Token tokenValue = this.tokenService.getTokenByValue(Authorization);
            this.messageService.bugReport(message, tokenValue);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (SecurityException ex) {
            Console.log("[Message/contact]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception ex) {
            Console.log("[Message/contact]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
