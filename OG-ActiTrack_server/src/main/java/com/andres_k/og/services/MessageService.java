package com.andres_k.og.services;

import com.andres_k.og.models.auth.Token;
import com.andres_k.og.models.item.message.BugReportMessage;
import com.andres_k.og.models.item.message.ContactMessage;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    public void contact(ContactMessage message, Token token) {

    }

    public void bugReport(BugReportMessage message, Token token) {

    }
}
