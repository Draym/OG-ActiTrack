package com.andres_k.og.models.auth.user;

import com.andres_k.og.models.auth.Role;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "UserFavoritePlayer")
@Table(name = "user_favorite_player")
public class UserFavoritePlayer {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="user_id")
    private Long userId;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "player_id")
    private Role role;
}
