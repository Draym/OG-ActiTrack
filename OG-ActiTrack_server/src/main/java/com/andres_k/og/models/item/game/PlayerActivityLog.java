package com.andres_k.og.models.item.game;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity(name = "PlayerActivityLog")
@Table(name = "player_activity_log")
public class PlayerActivityLog {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="position")
    private String position;
    @NotNull
    @Column(name="isMoon")
    private boolean isMoon;
    @NotNull
    @Column(name="server")
    private String server;
    @NotNull
    @Column(name="user_id")
    private Long userId;
    @NotNull
    @Column(name="player_id")
    private Long playerId;
    @NotNull
    @Column(name="activity")
    private String activity;
    @NotNull
    @Column(name="creation_date")
    private LocalDateTime creationDate;

    public PlayerActivityLog(){
    }

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

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public boolean isMoon() {
        return isMoon;
    }

    public void setMoon(boolean moon) {
        isMoon = moon;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }
}
