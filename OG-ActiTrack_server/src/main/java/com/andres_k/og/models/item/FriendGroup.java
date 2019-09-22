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
    @Column(name = "friend_profile_identifier")
    private String friendProfileIdentifier;

    public FriendGroup() {

    }

    public FriendGroup(Long userId, Long friendId, String friendProfileIdentifier) {
        this.userId = userId;
        this.friendId = friendId;
        this.friendProfileIdentifier = friendProfileIdentifier;
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

    public String getFriendProfileIdentifier() {
        return friendProfileIdentifier;
    }

    public void setFriendProfileIdentifier(String friendProfileIdentifier) {
        this.friendProfileIdentifier = friendProfileIdentifier;
    }
}
