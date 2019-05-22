package com.andres_k.og.models.item;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity(name = "ActivityLog")
@Table(name = "activity_log")
public class ActivityLog {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="planet_id")
    private Long planetId;
    @NotNull
    @Column(name="user_ac_id")
    private Long userAcId;
    @NotNull
    @Column(name="activity")
    private String activity;
    @NotNull
    @Column(name="creation_date")
    private LocalDateTime creationDate;

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public Long getPlanetId() {
        return planetId;
    }

    public void setPlanetId(Long planetId) {
        this.planetId = planetId;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Long getUserAcId() {
        return userAcId;
    }

    public void setUserAcId(Long userAcId) {
        this.userAcId = userAcId;
    }
}
