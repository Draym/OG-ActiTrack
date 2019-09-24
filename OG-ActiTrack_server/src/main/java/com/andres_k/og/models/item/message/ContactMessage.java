package com.andres_k.og.models.item.message;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity(name = "ContactMessage")
@Table(name = "message_contact")
public class ContactMessage {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="user_id")
    private Long userId;
    @NotNull
    @Column(name="email")
    private String email;
    @NotNull
    @Column(name="subject")
    private String subject;
    @NotNull
    @Column(name="message")
    private String message;
    @NotNull
    @Column(name="creation_date")
    private LocalDateTime creationDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public void init(Long userId) {
        this.userId = userId;
        this.creationDate = LocalDateTime.now();
    }
}
