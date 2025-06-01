package com.julytus.be.repository;

import com.julytus.be.entity.Fixture;
import com.julytus.be.entity.Club;
import com.julytus.be.entity.Stadium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface FixtureRepository extends JpaRepository<Fixture, Long> {
    List<Fixture> findByHomeTeamOrAwayTeam(Club homeTeam, Club awayTeam);
    List<Fixture> findByDate(LocalDate date);
    List<Fixture> findByStadium(Stadium stadium);
} 