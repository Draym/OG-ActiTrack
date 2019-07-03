package com.andres_k.og.models.item;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "FriendGroup")
@Table(name = "friends")
public class FriendGroup {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name = "user_id")
    private Long userId;
    @NotNull
    @Column(name = "friend_id")
    private Long friendId;
    @NotNull
    @Column(name = "friend_secret")
    private String friendSecret;

    public FriendGroup() {

    }

    public FriendGroup(Long userId, Long friendId, String friendSecret) {
        this.userId = userId;
        this.friendId = friendId;
        this.friendSecret = friendSecret;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getFriendId() {
        return friendId;
    }

    public void setFriendId(Long friendId) {
        this.friendId = friendId;
    }

    public String getFriendSecret() {
        return friendSecret;
    }

    public void setFriendSecret(String friendSecret) {
        this.friendSecret = friendSecret;
    }
}
