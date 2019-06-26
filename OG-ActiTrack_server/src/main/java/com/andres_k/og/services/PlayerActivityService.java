package com.andres_k.og.services;

import com.andres_k.og.models.http.PlayerActivityHandler;
import com.andres_k.og.models.item.activity.ActivityLog;
import com.andres_k.og.models.item.activity.ActivityLogRepository;
import com.andres_k.og.models.item.mapping.*;
import com.andres_k.og.utils.data.Pair;
import com.andres_k.og.utils.tools.Console;
import com.andres_k.og.utils.tools.TDate;
import com.andres_k.og.utils.tools.TString;
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
    @Autowired
    OGServerRepository OGServerRepository;

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
        OGServer OGServer = this.OGServerRepository.findByServer(playerActivity.getServer());
        if (OGServer == null) {
            OGServer = new OGServer();
            OGServer.setServer(playerActivity.getServer());
            this.OGServerRepository.save(OGServer);
        }
        // GET PLAYER
        Player player = this.playerRepository.findByPlayerRef(playerActivity.getPlayerRef());
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
        ActivityLog activityLog = this.activityLogRepository.findByPositionAndServerAndUserIdAndCreationDateBetween(playerActivity.getPosition(), playerActivity.getServer(), userId, ranges.v1, ranges.v2);
        if (activityLog == null) {
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

    public List<ActivityLog> getSelfActivity(Long userId, String server, LocalDateTime start, LocalDateTime end) {
        if (start != null && end == null)
            end = start;
        if (start != null) {
            if (!TString.isNull(server))
                return this.activityLogRepository.findAllByUserIdAndServerAndCreationDateBetween(userId, server, start, end);
            else
                return this.activityLogRepository.findAllByUserIdAndCreationDateBetween(userId, start, end);
        } else if (!TString.isNull(server)) {
            return this.activityLogRepository.findAllByUserIdAndServer(userId, server);
        }
        return this.activityLogRepository.findAllByUserId(userId);
    }

    public List<ActivityLog> getSelfPlayerActivity(Long userId, String server, String playerName, LocalDateTime start, LocalDateTime end) {
        if (start != null && end == null)
            end = start;
        if (start != null) {
            return this.activityLogRepository.findAllByUserIdAndServerAndPlayerNameAndCreationDateBetween(userId, server, playerName, start, end);
        } else {
            return this.activityLogRepository.findAllByUserIdAndServerAndPlayerName(userId, server, playerName);
        }
    }

    public List<ActivityLog> getSelfGalaxyActivity(Long userId, String server, String galaxy, LocalDateTime start, LocalDateTime end) {
        if (start != null && end == null)
            end = start;
        if (start != null) {
            return this.activityLogRepository.findAllByUserIdAndServerAndPositionStartingWithAndCreationDateBetween(userId, server, galaxy, start, end);
        } else {
            return this.activityLogRepository.findAllByUserIdAndServerAndPositionStartingWith(userId, server, galaxy);
        }
    }

    public List<ActivityLog> getGlobalActivity(String server, LocalDateTime start, LocalDateTime end) {
        if (start != null && end == null)
            end = start;
        if (start != null) {
            if (!TString.isNull(server))
                return this.activityLogRepository.findAllByServerAndCreationDateBetween(server, start, end);
            else
                return this.activityLogRepository.findAllByCreationDateBetween(start, end);
        } else if (!TString.isNull(server)) {
            return this.activityLogRepository.findAllByServer(server);
        }
        return this.activityLogRepository.findAll();
    }

    public List<ActivityLog> getGlobalPlayerActivity(String server, String playerName, LocalDateTime start, LocalDateTime end) {
        if (start != null && end == null)
            end = start;
        if (start != null) {
            return this.activityLogRepository.findAllByServerAndPlayerNameAndCreationDateBetween(server, playerName, start, end);
        } else {
            return this.activityLogRepository.findAllByServerAndPlayerName(server, playerName);
        }
    }

    public List<ActivityLog> getGlobalGalaxyActivity(String server, String galaxy, LocalDateTime start, LocalDateTime end) {
        if (start != null && end == null)
            end = start;
        if (start != null) {
            return this.activityLogRepository.findAllByServerAndPositionStartingWithAndCreationDateBetween(server, galaxy, start, end);
        } else {
            return this.activityLogRepository.findAllByServerAndPositionStartingWith(server, galaxy);
        }
    }
}
