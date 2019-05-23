package com.andres_k.og.models.http;

public class PlayerActivityHandler {
    private String planetPos;
    private String moon;
    private String playerName;
    private String playerRank;
    private String allyTag;
    private String allyRank;
    private String activity;
    private String server;

    public String getPlanetPos() {
        return planetPos;
    }

    public void setPlanetPos(String planetPos) {
        this.planetPos = planetPos;
    }

    public String getMoon() {
        return moon;
    }

    public void setMoon(String moon) {
        this.moon = moon;
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
}
