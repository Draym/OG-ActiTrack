package com.andres_k.og.models.http;

public class PlayerRankHandler {
    private String playerRef;
    private String playerName;
    private String server;
    private Long honor;
    private String rankType;
    private Long rankPoint;
    private Long rank;

    public String getPlayerRef() {
        return playerRef;
    }

    public void setPlayerRef(String playerRef) {
        this.playerRef = playerRef;
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

    public String getRankType() {
        return rankType;
    }

    public void setRankType(String rankType) {
        this.rankType = rankType;
    }

    public Long getHonor() {
        return honor;
    }

    public void setHonor(Long honor) {
        this.honor = honor;
    }

    public Long getRankPoint() {
        return rankPoint;
    }

    public void setRankPoint(Long rankPoint) {
        this.rankPoint = rankPoint;
    }

    public Long getRank() {
        return rank;
    }

    public void setRank(Long rank) {
        this.rank = rank;
    }
}
