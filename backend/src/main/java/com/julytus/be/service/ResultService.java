package com.julytus.be.service;

import com.julytus.be.entity.Result;
import com.julytus.be.entity.Club;
import com.julytus.be.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class ResultService {
    @Autowired
    private ResultRepository resultRepository;
    
    @Autowired
    private StandingService standingService;

    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    public Result getResultById(Long id) {
        return resultRepository.findById(id).orElse(null);
    }

    public List<Result> getResultsByTeam(Club team) {
        return resultRepository.findByHomeTeamOrAwayTeam(team, team);
    }

    public List<Result> getResultsByDate(LocalDate date) {
        return resultRepository.findByDate(date);
    }

    @Transactional
    public Result createResult(Result result) {
        Result savedResult = resultRepository.save(result);
        standingService.updateStandings(savedResult);
        return savedResult;
    }

    @Transactional
    public Result updateResult(Long id, Result resultDetails) {
        Result result = resultRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Result not found"));
        
        // Cập nhật thông tin kết quả
        result.setHomeTeam(resultDetails.getHomeTeam());
        result.setAwayTeam(resultDetails.getAwayTeam());
        result.setHomeScore(resultDetails.getHomeScore());
        result.setAwayScore(resultDetails.getAwayScore());
        result.setDate(resultDetails.getDate());
        
        Result updatedResult = resultRepository.save(result);
        // Tính toán lại bảng xếp hạng
        standingService.recalculateAllStandings();
        return updatedResult;
    }

    @Transactional
    public void deleteResult(Long id) {
        Result result = resultRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Result not found"));
        resultRepository.delete(result);
        // Tính toán lại bảng xếp hạng
        standingService.recalculateAllStandings();
    }
} 