package com.andres_k.og.models.item.mapping;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "PlayerRank")
@Table(name = "player_rank")
public class PlayerRank {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="player_ref")
    private String playerRef;
    @NotNull
    @Column(name="general")
    private String general;
    @NotNull
    @Column(name="military")
    private String military;
    @NotNull
    @Column(name="research")
    private String research;
    @NotNull
    @Column(name="economy")
    private String economy;

    public PlayerRank(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGeneral() {
        return general;
    }

    public void setGeneral(String general) {
        this.general = general;
    }

    public String getMilitary() {
        return military;
    }

    public void setMilitary(String military) {
        this.military = military;
    }

    public String getResearch() {
        return research;
    }

    public void setResearch(String research) {
        this.research = research;
    }

    public String getEconomy() {
        return economy;
    }

    public void setEconomy(String economy) {
        this.economy = economy;
    }

    public String getPlayerRef() {
        return playerRef;
    }

    public void setPlayerRef(String playerRef) {
        this.playerRef = playerRef;
    }
}
