package com.andres_k.og.models.item.game;

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
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "general_id", referencedColumnName = "id")
    private RankAttribute generalRank;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "research_id", referencedColumnName = "id")
    private RankAttribute researchRank;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "economy_id", referencedColumnName = "id")
    private RankAttribute economyRank;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "military_id", referencedColumnName = "id")
    private RankAttribute militaryRank;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayerRef() {
        return playerRef;
    }

    public void setPlayerRef(String playerRef) {
        this.playerRef = playerRef;
    }

    public RankAttribute getGeneralRank() {
        return generalRank;
    }

    public void setGeneralRank(RankAttribute generalRank) {
        this.generalRank = generalRank;
    }

    public RankAttribute getResearchRank() {
        return researchRank;
    }

    public void setResearchRank(RankAttribute researchRank) {
        this.researchRank = researchRank;
    }

    public RankAttribute getEconomyRank() {
        return economyRank;
    }

    public void setEconomyRank(RankAttribute economyRank) {
        this.economyRank = economyRank;
    }

    public RankAttribute getMilitaryRank() {
        return militaryRank;
    }

    public void setMilitaryRank(RankAttribute militaryRank) {
        this.militaryRank = militaryRank;
    }
}
