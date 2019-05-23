package com.andres_k.og.services;

import com.andres_k.og.models.http.PlayerActivityHandler;
import com.andres_k.og.models.item.activity.ActivityLog;
import com.andres_k.og.models.item.activity.ActivityLogRepository;
import com.andres_k.og.models.item.mapping.Planet;
import com.andres_k.og.models.item.mapping.PlanetRepository;
import com.andres_k.og.models.item.mapping.Player;
import com.andres_k.og.models.item.mapping.PlayerRepository;
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

    public void saveActivity(Long userId, PlayerActivityHandler playerActivity) {
        // GET PLAYER
        Player player = this.playerRepository.findByPlayerName(playerActivity.getPlayerName());
        if (player == null) {
            player = new Player();
            player.setPlayerName(playerActivity.getPlayerName());
            player.setServer(playerActivity.getServer());
            player.setPlayerAlly(playerActivity.getAllyTag());
            player = this.playerRepository.save(player);
        }

        // GET PLANET
        Planet planet = this.planetRepository.findByPlanetPos(playerActivity.getPlanetPos());
        if (planet != null && !planet.getPlayerId().equals(player.getId()))
        {
            this.planetRepository.delete(planet);
            planet = null;
        }
        if (planet == null) {
            planet = new Planet();
            planet.setMoon((playerActivity.getMoon().equals("true")));
            planet.setPlanetPos(playerActivity.getPlanetPos());
            planet.setServer(playerActivity.getServer());
            planet.setPlayerId(player.getId());
            planet = this.planetRepository.save(planet);
        } else {
            planet.setMoon((playerActivity.getMoon().equals("true")));
            planet = this.planetRepository.save(planet);
        }


        LocalDateTime currentDate = LocalDateTime.now();

        ActivityLog activityLog = this.activityLogRepository.findByPlanetPosAndServerAndCreationDateAfter(playerActivity.getPlanetPos(), playerActivity.getServer(), currentDate.minusMinutes(15));
        if (activityLog == null) {
            // CREATE ACTIVITY
            activityLog = new ActivityLog();
            activityLog.setUserId(userId);
            activityLog.setCreationDate(currentDate);
            activityLog.setActivity(playerActivity.getActivity());
            activityLog.setPlanetPos(playerActivity.getPlanetPos());
            activityLog.setPlayerName(playerActivity.getPlayerName());
            activityLog.setServer(playerActivity.getServer());
            activityLog = this.activityLogRepository.save(activityLog);
        }
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
        return this.activityLogRepository.findAllByUserIdAndPlanetPosStartingWith(userId, galaxy);
    }
    public List<ActivityLog> getGlobalGalaxyActivity(String galaxy) {
        return this.activityLogRepository.findAllByPlanetPosStartingWith(galaxy);
    }
}
