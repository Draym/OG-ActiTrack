package com.andres_k.og.models.http;

public class PlayerRankHandler {
    private String playerRef;
    private String playerName;
    private Long playerHonor;
    private String server;
    private Integer rankTypeId;
    private String rankTypeName;
    private Long rankScore;
    private Long rankPosition;

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

    public Long getPlayerHonor() {
        return playerHonor;
    }

    public void setPlayerHonor(Long playerHonor) {
        this.playerHonor = playerHonor;
    }

    public String getRankTypeName() {
        return rankTypeName;
    }

    public void setRankTypeName(String rankTypeName) {
        this.rankTypeName = rankTypeName;
    }

    public Long getRankScore() {
        return rankScore;
    }

    public void setRankScore(Long rankScore) {
        this.rankScore = rankScore;
    }

    public Long getRankPosition() {
        return rankPosition;
    }

    public void setRankPosition(Long rankPosition) {
        this.rankPosition = rankPosition;
    }

    public Integer getRankTypeId() {
        return rankTypeId;
    }

    public void setRankTypeId(Integer rankTypeId) {
        this.rankTypeId = rankTypeId;
    }
}
