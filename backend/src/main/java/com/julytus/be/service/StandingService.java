package com.julytus.be.service;

import com.julytus.be.entity.Standing;
import com.julytus.be.entity.Club;
import com.julytus.be.repository.StandingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class StandingService {
    @Autowired
    private StandingRepository standingRepository;

    public List<Standing> getStandingsByPoints() {
        return standingRepository.findAllByOrderByPointsDesc();
    }

    public Standing getStandingByTeam(Long teamId) {
        return standingRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Standing not found for team"));
    }

    private void updateTeamStanding(Club team, int teamScore, int opponentScore) {
        Standing standing = standingRepository.findStandingByTeam(team);
        if (standing == null) {
            standing = new Standing();
            standing.setTeam(team);
            standing.setPlayed(0);
            standing.setWon(0);
            standing.setDrawn(0);
            standing.setLost(0);
            standing.setPoints(0);
        }

        standing.setPlayed(standing.getPlayed() + 1);
        
        if (teamScore > opponentScore) {
            standing.setWon(standing.getWon() + 1);
        } else if (teamScore == opponentScore) {
            standing.setDrawn(standing.getDrawn() + 1);
        } else {
            standing.setLost(standing.getLost() + 1);
        }

        standing.calculatePoints();
        standingRepository.save(standing);
    }
} 