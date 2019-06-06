package com.andres_k.og.models.auth.user;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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
    private Long paymentDate;
    @NotNull
    @Column(name = "payment_status")
    private Long paymentStatus;
    @NotNull
    @Column(name = "currency")
    private String currency;

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

    public Long getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Long paymentDate) {
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
}
