package com.andres_k.og.services;

import com.andres_k.og.models.auth.custom.PlayerActivityHandler;
import com.andres_k.og.models.item.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    UserActivitiesRepository userActivitiesRepository;

    public void saveActivity(Long userId, PlayerActivityHandler playerActivity) {
        // GET PLAYER
        Player player = this.playerRepository.findByPlayerName(playerActivity.getPlayerName());
        if (player == null) {
            player = new Player();
            player.setPlayerName(playerActivity.getPlayerName());
            player.setPlayerAlly(playerActivity.getAllyTag());
            player.setPlayerRank(playerActivity.getPlayerRank());
            player.setPlanets(new ArrayList<>());
            player = this.playerRepository.save(player);
        }

        // GET PLANET
        Planet planet = this.planetRepository.findByPlanetPosAndPlayerId(playerActivity.getPlanetPos(), player.getId());
        if (planet == null) {
            planet = new Planet();
            planet.setMoon((playerActivity.getMoon().equals("true")));
            planet.setPlanetPos(playerActivity.getPlanetPos());
            planet.setServer(playerActivity.getServer());
            planet.setPlayerId(player.getId());
            planet.setActivityLogs(new ArrayList<>());
            planet = this.planetRepository.save(planet);

            player.getPlanets().add(planet);
            this.playerRepository.save(player);
        } else {
            planet.setMoon((playerActivity.getMoon().equals("true")));
            planet = this.planetRepository.save(planet);
        }


        LocalDateTime currentDate = LocalDateTime.now();

        ActivityLog activityLog = this.activityLogRepository.findByPlanetIdAndCreationDateIsGreaterThan(planet.getId(), currentDate.plusMinutes(5));
        if (activityLog == null) {
            // CREATE ACTIVITY
            activityLog = new ActivityLog();
            activityLog.setCreationDate(currentDate);
            activityLog.setActivity(playerActivity.getActivity());
            planet.getActivityLogs().add(activityLog);
            this.planetRepository.save(planet);
        }

        UserActivities userActivities = this.userActivitiesRepository.findByUserId(userId);
        if (userActivities == null) {
            userActivities = new UserActivities();
            userActivities.setUserId(userId);
            List<ActivityLog> values = new ArrayList<>();
            values.add(activityLog);
            userActivities.setActivities(values);
        } else {
            userActivities.getActivities().add(activityLog);
        }

        this.userActivitiesRepository.save(userActivities);
    }


}
