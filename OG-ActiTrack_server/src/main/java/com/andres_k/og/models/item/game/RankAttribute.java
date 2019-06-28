package com.andres_k.og.models.item.game;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "RankAttribute")
@Table(name = "rank_attribute")
public class RankAttribute {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="point")
    private Long point;
    @NotNull
    @Column(name="rank")
    private Long rank;

    public RankAttribute(){
    }
    public RankAttribute(Long rank, Long point){
        this.rank = rank;
        this.point = point;
    }
    public void update(RankAttribute rankAttribute){
        this.rank = rankAttribute.rank;
        this.point = rankAttribute.point;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPoint() {
        return point;
    }

    public void setPoint(Long point) {
        this.point = point;
    }

    public Long getRank() {
        return rank;
    }

    public void setRank(Long rank) {
        this.rank = rank;
    }
}
