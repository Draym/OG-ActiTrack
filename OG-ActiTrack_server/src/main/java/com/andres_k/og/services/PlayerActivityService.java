package com.andres_k.og.services;

import com.andres_k.og.dao.*;
import com.andres_k.og.models.auth.user.UserPremium;
import com.andres_k.og.models.enums.EActivityType;
import com.andres_k.og.models.http.PlayerActivityHandler;
import com.andres_k.og.models.item.FriendGroup;
import com.andres_k.og.models.item.game.PlayerActivityLog;
import com.andres_k.og.models.item.game.*;
import com.andres_k.og.utils.data.Pair;
import com.andres_k.og.utils.tools.Console;
import com.andres_k.og.utils.tools.TDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class PlayerActivityService {
    private final PlayerActivityLogRepository playerActivityLogRepository;
    private final PlayerRepository playerRepository;
    private final PlanetRepository planetRepository;
    private final MoonRepository moonRepository;
    private final GameServerRepository GameServerRepository;
    private final FriendGroupRepository friendGroupRepository;
    private final UserPremiumRepository userPremiumRepository;

    @Autowired
    public PlayerActivityService(PlayerActivityLogRepository playerActivityLogRepository, PlayerRepository playerRepository, PlanetRepository planetRepository, MoonRepository moonRepository, GameServerRepository GameServerRepository, FriendGroupRepository friendGroupRepository, UserPremiumRepository userPremiumRepository) {
        this.playerActivityLogRepository = playerActivityLogRepository;
        this.playerRepository = playerRepository;
        this.planetRepository = planetRepository;
        this.moonRepository = moonRepository;
        this.GameServerRepository = GameServerRepository;
        this.friendGroupRepository = friendGroupRepository;
        this.userPremiumRepository = userPremiumRepository;
    }

    public void saveActivity(Long userId, PlayerActivityHandler playerActivity) {
        // IS EMPTY
        if (playerActivity.getIsEmpty()) {
            Planet planet = this.planetRepository.findByPosition(playerActivity.getPosition());
            if (planet != null) {
                this.planetRepository.delete(planet);
            }
            return;
        }
        // GET SERVER
        GameServer GameServer = this.GameServerRepository.findByServer(playerActivity.getServer());
        if (GameServer == null) {
            GameServer = new GameServer();
            GameServer.setServer(playerActivity.getServer());
            this.GameServerRepository.save(GameServer);
        }
        // GET PLAYER
        Player player = this.playerRepository.findByServerAndPlayerRef(playerActivity.getServer(), playerActivity.getPlayerRef()).orElse(null);
        if (player == null) {
            player = new Player();
            player.setPlayerName(playerActivity.getPlayerName());
            player.setServer(playerActivity.getServer());
            player.setPlayerAlly(playerActivity.getAllyTag());
            player.setPlayerRef(playerActivity.getPlayerRef());
            player = this.playerRepository.save(player);
        } else {
            boolean hasChange = false;
            if (!player.getPlayerAlly().equals(playerActivity.getAllyTag())) {
                player.setPlayerAlly(playerActivity.getAllyTag());
                hasChange = true;
            }
            if (!player.getPlayerName().equals(playerActivity.getPlayerName())) {
                player.setPlayerName(playerActivity.getPlayerName());
                hasChange = true;
            }
            if (hasChange) {
                this.playerRepository.save(player);
            }
        }

        // GET MOON OR PLANET
        if (playerActivity.getIsMoon()) {
            Moon moon = this.moonRepository.findByPosition(playerActivity.getPosition());
            if (moon != null && !moon.getPlayerId().equals(player.getId())) {
                this.moonRepository.delete(moon);
                moon = null;
            }
            if (moon == null) {
                moon = new Moon();
                moon.setPosition(playerActivity.getPosition());
                moon.setServer(playerActivity.getServer());
                moon.setPlayerId(player.getId());
                this.moonRepository.save(moon);
            }
        } else {
            Planet planet = this.planetRepository.findByPosition(playerActivity.getPosition());
            if (planet != null && !planet.getPlayerId().equals(player.getId())) {
                this.planetRepository.delete(planet);
                planet = null;
            }
            if (planet == null) {
                planet = new Planet();
                planet.setPosition(playerActivity.getPosition());
                planet.setServer(playerActivity.getServer());
                planet.setPlayerId(player.getId());
                this.planetRepository.save(planet);
            }
        }

        // CREATE ACTIVITY
        LocalDateTime currentDate = LocalDateTime.now();
        Pair<LocalDateTime, LocalDateTime> ranges = TDate.getDateRangeLimits(currentDate, 15);
        Console.log("Dates Ranges: " + ranges.v1 + " ; " + ranges.v2);
        PlayerActivityLog playerActivityLog = this.playerActivityLogRepository.findByPositionAndServerAndUserIdAndCreationDateBetween(playerActivity.getPosition(), playerActivity.getServer(), userId, ranges.v1, ranges.v2);
        if (playerActivityLog == null) {
            playerActivityLog = new PlayerActivityLog();
            playerActivityLog.setUserId(userId);
            playerActivityLog.setCreationDate(currentDate);
            playerActivityLog.setActivity(playerActivity.getActivity());
            playerActivityLog.setPosition(playerActivity.getPosition());
            playerActivityLog.setPlayerId(player.getId());
            playerActivityLog.setServer(playerActivity.getServer());
        } else {
            playerActivityLog.setCreationDate(currentDate);
            playerActivityLog.setActivity(playerActivity.getActivity());
        }
        this.playerActivityLogRepository.save(playerActivityLog);
    }

    /** SELF **/
    public List<PlayerActivityLog> getPlayerActivity(EActivityType type, Long userId, String server, Long playerId, LocalDateTime start, LocalDateTime end) {
        Set<Long> users = generateUsersFor(type, userId);
        return this.playerActivityLogRepository.findAllByServerAndPlayerIdAndCreationDateBetweenAndUserIdIn(server, playerId, start, end, users);
    }
    public List<PlayerActivityLog> getGalaxyActivity(EActivityType type, Long userId, String server, String galaxy, LocalDateTime start, LocalDateTime end) {
        Set<Long> users = generateUsersFor(type, userId);
        return this.playerActivityLogRepository.findAllByServerAndPositionStartingWithAndCreationDateBetweenAndUserIdIn(server, galaxy, start, end, users);
    }

    private Set<Long> generateUsersFor(EActivityType type, Long userId) {
        Set<Long> result = new HashSet<>();
        if (type == EActivityType.FRIEND) {
            result = this.friendGroupRepository.findAllByUserId(userId).stream()
                    .map(FriendGroup::getUserId)
                    .collect(Collectors.toSet());
        } else if (type == EActivityType.GLOBAL) {
            Optional<UserPremium> optPremium = this.userPremiumRepository.findByUserId(userId);
            if (optPremium.isPresent()) {
                result = this.userPremiumRepository.findAllByScoreLessThan(optPremium.get().getScore()).stream()
                        .map(UserPremium::getUserId)
                        .collect(Collectors.toSet());
            }
        }
        result.add(userId);
        return result;
    }

}
