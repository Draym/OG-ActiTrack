package com.andres_k.og.models.auth.user;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "UserPremium")
@Table(name = "user_premium")
public class UserPremium {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name = "user_id")
    private Long userId;
    @NotNull
    @Column(name = "payment_total")
    private Long paymentTotal;
    @NotNull
    @Column(name = "score")
    private Long score;

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

    public Long getPaymentTotal() {
        return paymentTotal;
    }

    public void setPaymentTotal(Long paymentTotal) {
        this.paymentTotal = paymentTotal;
    }

    public Long getScore() {
        return score;
    }

    public void setScore(Long score) {
        this.score = score;
    }
}
