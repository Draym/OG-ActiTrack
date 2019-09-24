package com.andres_k.og.models.auth.user;

import com.andres_k.og.models.http.KofiHandler;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity(name = "UserPayment")
@Table(name = "user_payment")
public class UserPayment {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name = "user_id")
    private Long userId;
    @NotNull
    @Column(name = "payment_gross")
    private Long paymentGross;
    @NotNull
    @Column(name = "payment_fee")
    private Long paymentFee;
    @NotNull
    @Column(name = "payment_date")
    private LocalDateTime paymentDate;
    @NotNull
    @Column(name = "payment_status")
    private Long paymentStatus;
    @NotNull
    @Column(name = "currency")
    private String currency;
    @NotNull
    @Column(name = "message_id")
    private String messageId;
    @NotNull
    @Column(name = "message")
    private String message;
    @NotNull
    @Column(name = "from")
    private String from;
    @NotNull
    @Column(name = "type")
    private String type;
    @NotNull
    @Column(name = "url")
    private String url;

    public void init(KofiHandler handler) {
        this.message = handler.message;
        this.messageId = handler.message_id;
        this.type = handler.type;
        this.from = handler.from_name;
        this.url = handler.url;
        this.paymentGross = Long.parseLong(handler.amount);
        this.paymentDate = LocalDateTime.parse(handler.timestamp);
        this.paymentStatus = 1L;
    }

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

    public Long getPaymentGross() {
        return paymentGross;
    }

    public void setPaymentGross(Long paymentGross) {
        this.paymentGross = paymentGross;
    }

    public Long getPaymentFee() {
        return paymentFee;
    }

    public void setPaymentFee(Long paymentFee) {
        this.paymentFee = paymentFee;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Long getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(Long paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }
}
