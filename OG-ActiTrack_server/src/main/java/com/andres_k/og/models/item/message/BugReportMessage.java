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
}
