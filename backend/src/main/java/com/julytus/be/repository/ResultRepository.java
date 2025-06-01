package com.julytus.be.repository;

import com.julytus.be.entity.Result;
import com.julytus.be.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByHomeTeamOrAwayTeam(Club homeTeam, Club awayTeam);
    List<Result> findByDate(LocalDate date);
    List<Result> findByHomeTeamAndAwayTeam(Club homeTeam, Club awayTeam);
} 