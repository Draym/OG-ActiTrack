package com.andres_k.og.models.item;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Planet")
@Table(name = "planet")
public class Planet {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="player_id")
    private Long playerId;
    @NotNull
    @Column(name="server")
    private String server;
    @NotNull
    @Column(name="planet_pos")
    private String planetPos;
    @NotNull
    @Column(name="moon")
    private boolean moon;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "planet_id")
    private List<ActivityLog> activityLogs = new ArrayList<>();

    public String getPlanetPos() {
        return planetPos;
    }

    public void setPlanetPos(String planetPos) {
        this.planetPos = planetPos;
    }

    public boolean isMoon() {
        return moon;
    }

    public void setMoon(boolean moon) {
        this.moon = moon;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public List<ActivityLog> getActivityLogs() {
        return activityLogs;
    }

    public void setActivityLogs(List<ActivityLog> activityLogs) {
        this.activityLogs = activityLogs;
    }
}
