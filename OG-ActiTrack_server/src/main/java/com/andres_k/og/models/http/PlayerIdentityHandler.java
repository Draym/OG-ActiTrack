package com.andres_k.og.models.http;

public class PlayerIdentityHandler {
    public String playerName;
    public String playerRef;
    public Long playerId;

    public PlayerIdentityHandler(){}

    public PlayerIdentityHandler(Long playerId, String playerName, String playerRef) {
        this.playerId = playerId;
        this.playerName = playerName;
        this.playerRef = playerRef;
    }
}
