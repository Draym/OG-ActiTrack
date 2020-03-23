package com.andres_k.og.models.http;

import java.time.LocalDateTime;

public class MessageCtn {
    private String to;
    private String name;
    private String email;
    private String subject;
    private String message;
    private LocalDateTime creationDate;

    public MessageCtn() {
    }

    public MessageCtn(String name, String from, String to, String subject, String message) {
        this.name = name;
        this.to = to;
        this.email = from;
        this.subject = subject;
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }
}
