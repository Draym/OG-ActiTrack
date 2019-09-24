package com.andres_k.og.models.item.message;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity(name = "BugReportMessage")
@Table(name = "message_bug_report")
public class BugReportMessage {
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
    @Column(name="description")
    private String description;
    @NotNull
    @Column(name="type")
    private String type;
    @NotNull
    @Column(name="status")
    private String status;
    @NotNull
    @Column(name="priority")
    private Integer priority;
    @NotNull
    @Column(name="resolved")
    private Boolean resolved;
    @NotNull
    @Column(name="creation_date")
    private LocalDateTime creationDate;
    @NotNull
    @Column(name="event_date")
    private LocalDateTime eventDate;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Boolean getResolved() {
        return resolved;
    }

    public void setResolved(Boolean resolved) {
        this.resolved = resolved;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public void init(Long userId) {
        this.userId = userId;
        this.creationDate = LocalDateTime.now();
        this.resolved = false;
    }
}
