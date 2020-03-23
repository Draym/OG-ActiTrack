package com.andres_k.og.services.message;

import com.andres_k.og.dao.message.BugReportMessageRepository;
import com.andres_k.og.dao.message.ContactMessageRepository;
import com.andres_k.og.models.auth.Token;
import com.andres_k.og.models.item.message.BugReportMessage;
import com.andres_k.og.models.item.message.ContactMessage;
import com.andres_k.og.services.EmailClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;

@Service
public class MessageService {
    private final ContactMessageRepository contactMessageRepository;
    private final BugReportMessageRepository bugReportMessageRepository;
    private final EmailClient emailClient;

    @Autowired
    public MessageService(ContactMessageRepository contactMessageRepository, BugReportMessageRepository bugReportMessageRepository, EmailClient emailClient) {
        this.contactMessageRepository = contactMessageRepository;
        this.bugReportMessageRepository = bugReportMessageRepository;
        this.emailClient = emailClient;
    }

    public void contact(ContactMessage message, Token token) throws IOException, MessagingException {
        message.init(token.getUserId());
        this.contactMessageRepository.save(message);
        this.emailClient.sendToAdmin(message.getEmail(), message.getEmail(), message.getSubject(), message.getMessage());
    }

    public void bugReport(BugReportMessage message, Token token) throws IOException, MessagingException {
        message.init(token.getUserId());
        this.bugReportMessageRepository.save(message);
        this.emailClient.sendToAdmin(message.getEmail(), message.getEmail(), message.getSubject(), message.getDescription());
    }
}
