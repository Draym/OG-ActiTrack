package com.andres_k.og.services.game;

import com.andres_k.og.dao.game.FriendGroupRepository;
import com.andres_k.og.dao.auth.UserRepository;
import com.andres_k.og.models.auth.Token;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.http.FriendRequestHandler;
import com.andres_k.og.models.item.FriendGroup;
import com.andres_k.og.services.auth.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class FriendGroupService {
    private final FriendGroupRepository friendGroupRepository;
    private final UserRepository userRepository;
    private final TokenService tokenService;

    @Autowired
    public FriendGroupService(FriendGroupRepository friendGroupRepository, UserRepository userRepository, TokenService tokenService) {
        this.friendGroupRepository = friendGroupRepository;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    public List<FriendGroup> getAllFriend(String token) {
        Token self = this.tokenService.getTokenByValue(token);
        return this.friendGroupRepository.findAllByUserId(self.getUserId());
    }

    public List<FriendGroup> getAllReverseFriend(String token) {
        Token self = this.tokenService.getTokenByValue(token);
        return this.friendGroupRepository.findAllByFriendId(self.getUserId());
    }

    public void deleteFriend(String token, FriendRequestHandler friendRequest) throws EntityNotFoundException {
        Token self = this.tokenService.getTokenByValue(token);
        User friend = this.getRequestedFriendUser(friendRequest);
        Optional<FriendGroup> optFriendGroup = this.friendGroupRepository.findByUserIdAndFriendId(self.getUserId(), friend.getId());
        if (!optFriendGroup.isPresent())
            throw new EntityNotFoundException("No friendship relation exist between you and the requested user.");
        this.friendGroupRepository.delete(optFriendGroup.get());
    }

    public void addFriend(String token, FriendRequestHandler friendRequest) throws EntityNotFoundException {
        Token self = this.tokenService.getTokenByValue(token);
        User friend = this.getRequestedFriendUser(friendRequest);
        boolean exists = this.friendGroupRepository.existsByUserIdAndFriendId(self.getUserId(), friend.getId());
        if (exists)
            throw new EntityNotFoundException("You are already friend with the requested user.");
        this.friendGroupRepository.save(new FriendGroup(self.getUserId(), friend.getId(), friendRequest.pseudo + "#" + friend.getSecret()));
    }

    private User getRequestedFriendUser(FriendRequestHandler friendRequest) {
        Optional<User> optFriend = this.userRepository.findByPseudoAndSecret(friendRequest.pseudo, friendRequest.secret);
        if (!optFriend.isPresent())
            throw new EntityNotFoundException("No user exist for this pseudo and secret.");
        return optFriend.get();
    }
}
