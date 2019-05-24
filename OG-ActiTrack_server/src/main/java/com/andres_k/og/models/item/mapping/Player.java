package com.andres_k.og.models.item.mapping;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Player")
@Table(name = "player")
public class Player {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="player_name")
    private String playerName;
    @NotNull
    @Column(name="player_ally")
    private String playerAlly;
    @NotNull
    @Column(name="server")
    private String server;

    public Player(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayerAlly() {
        return playerAlly;
    }

    public void setPlayerAlly(String playerAlly) {
        this.playerAlly = playerAlly;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }
}
