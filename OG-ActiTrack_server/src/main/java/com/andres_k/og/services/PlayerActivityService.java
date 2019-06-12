package com.andres_k.og.services;

import com.andres_k.og.models.http.PlayerActivityHandler;
import com.andres_k.og.models.item.activity.ActivityLog;
import com.andres_k.og.models.item.activity.ActivityLogRepository;
import com.andres_k.og.models.item.mapping.*;
import com.andres_k.og.utils.data.Pair;
import com.andres_k.og.utils.tools.Console;
import com.andres_k.og.utils.tools.TDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class PlayerActivityService {
    @Autowired
    ActivityLogRepository activityLogRepository;
    @Autowired
    PlayerRepository playerRepository;
    @Autowired
    PlanetRepository planetRepository;
    @Autowired
    MoonRepository moonRepository;

    public void saveActivity(Long userId, PlayerActivityHandler playerActivity) {
        // IS EMPTY
        if (playerActivity.getIsEmpty()) {
            Planet planet = this.planetRepository.findByPosition(playerActivity.getPosition());
            if (planet != null) {
                this.planetRepository.delete(planet);
            }
            return;
        }
        // GET PLAYER
        Player player = this.playerRepository.findByPlayerName(playerActivity.getPlayerName());
        if (player == null) {
            player = new Player();
            player.setPlayerName(playerActivity.getPlayerName());
            player.setServer(playerActivity.getServer());
            player.setPlayerAlly(playerActivity.getAllyTag());
            player = this.playerRepository.save(player);
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

        LocalDateTime currentDate = LocalDateTime.now();
        Pair<LocalDateTime, LocalDateTime> ranges = TDate.getDateRangeLimits(currentDate, 15);
        Console.log("Dates Ranges: " + ranges.v1 + " ; " + ranges.v2);
        ActivityLog activityLog = this.activityLogRepository.findByPositionAndServerAndUserIdAndCreationDateBetween(playerActivity.getPosition(), playerActivity.getServer(), userId, ranges.v1, ranges.v2);
        if (activityLog == null) {
            // CREATE ACTIVITY
            activityLog = new ActivityLog();
            activityLog.setUserId(userId);
            activityLog.setCreationDate(currentDate);
            activityLog.setActivity(playerActivity.getActivity());
            activityLog.setPosition(playerActivity.getPosition());
            activityLog.setPlayerName(playerActivity.getPlayerName());
            activityLog.setServer(playerActivity.getServer());
        } else {
            activityLog.setCreationDate(currentDate);
            activityLog.setActivity(playerActivity.getActivity());
        }
        this.activityLogRepository.save(activityLog);
    }

    public List<ActivityLog> getSelfPlayerActivity(Long userId, String playerName) {
        return this.activityLogRepository.findAllByUserIdAndPlayerName(userId, playerName);
    }
    public List<ActivityLog> getGlobalPlayerActivity(String playerName) {
        return this.activityLogRepository.findAllByPlayerName(playerName);
    }
    public List<ActivityLog> getSelfActivity(Long userId) {
        return this.activityLogRepository.findAllByUserId(userId);
    }
    public List<ActivityLog> getGlobalActivity() {
        return this.activityLogRepository.findAll();
    }
    public List<ActivityLog> getSelfGalaxyActivity(Long userId, String galaxy) {
        return this.activityLogRepository.findAllByUserIdAndPositionStartingWith(userId, galaxy);
    }
    public List<ActivityLog> getGlobalGalaxyActivity(String galaxy) {
        return this.activityLogRepository.findAllByPositionStartingWith(galaxy);
    }
}
