package com.julytus.be.service;

import com.julytus.be.entity.Standing;
import com.julytus.be.entity.Club;
import com.julytus.be.entity.Result;
import com.julytus.be.repository.StandingRepository;
import com.julytus.be.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class StandingService {
    @Autowired
    private StandingRepository standingRepository;
    
    @Autowired
    private ResultRepository resultRepository;

    public List<Standing> getAllStandings() {
        return standingRepository.findAllOrderByPointsDesc();
    }

    public Standing getStandingByTeam(Club team) {
        return standingRepository.findStandingByTeam(team);
    }

    @Transactional
    public void updateStandings(Result result) {
        // Cập nhật cho đội chủ nhà
        updateTeamStanding(result.getHomeTeam(), result.getHomeScore(), result.getAwayScore());
        // Cập nhật cho đội khách
        updateTeamStanding(result.getAwayTeam(), result.getAwayScore(), result.getHomeScore());
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

    @Transactional
    public void recalculateAllStandings() {
        List<Result> allResults = resultRepository.findAll();
        // Reset tất cả standings
        standingRepository.deleteAll();
        
        // Tính toán lại từ kết quả
        for (Result result : allResults) {
            updateStandings(result);
        }
    }
} 