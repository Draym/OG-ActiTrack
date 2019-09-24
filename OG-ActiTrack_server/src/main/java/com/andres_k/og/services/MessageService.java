package com.andres_k.og.services;

import com.andres_k.og.models.auth.Token;
import com.andres_k.og.models.item.message.BugReportMessage;
import com.andres_k.og.models.item.message.ContactMessage;
import com.andres_k.og.utils.managers.EmailManager;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;

@Service
public class MessageService {

    public void contact(ContactMessage message, Token token) throws IOException, MessagingException {
        EmailManager.get().sendToAdmin(message.getEmail(), message.getSubject(), message.getMessage());
    }

    public void bugReport(BugReportMessage message, Token token) throws IOException, MessagingException {
        EmailManager.get().sendToAdmin(message.getEmail(), message.getSubject(), message.getDescription());
    }
}
