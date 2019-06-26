package com.andres_k.og.models.http;

public class PlayerActivityHandler {
    private String position;
    private boolean isMoon;
    private boolean isEmpty;
    private String playerRef;
    private String playerName;
    private String playerRank;
    private String allyTag;
    private String allyRank;
    private String activity;
    private String server;

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public boolean getIsMoon() {
        return isMoon;
    }

    public void setIsMoon(boolean isMoon) {
        this.isMoon = isMoon;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getPlayerRank() {
        return playerRank;
    }

    public void setPlayerRank(String playerRank) {
        this.playerRank = playerRank;
    }

    public String getAllyTag() {
        return allyTag;
    }

    public void setAllyTag(String allyTag) {
        this.allyTag = allyTag;
    }

    public String getAllyRank() {
        return allyRank;
    }

    public void setAllyRank(String allyRank) {
        this.allyRank = allyRank;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

    public boolean getIsEmpty() {
        return isEmpty;
    }

    public void setIsEmpty(boolean isEmpty) {
        this.isEmpty = isEmpty;
    }

    public String getPlayerRef() {
        return playerRef;
    }

    public void setPlayerRef(String playerRef) {
        this.playerRef = playerRef;
    }
}
