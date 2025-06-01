package com.julytus.be.service;

import com.julytus.be.entity.Fixture;
import com.julytus.be.entity.Club;
import com.julytus.be.entity.Stadium;
import com.julytus.be.repository.FixtureRepository;
import com.julytus.be.repository.ClubRepository;
import com.julytus.be.repository.StadiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class FixtureService {
    @Autowired
    private FixtureRepository fixtureRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private StadiumRepository stadiumRepository;

    public List<Fixture> getAllFixtures() {
        return fixtureRepository.findAll();
    }

    public Fixture getFixtureById(Long id) {
        return fixtureRepository.findById(id).orElse(null);
    }

    public List<Fixture> getFixturesByTeam(Long teamId) {
        Club team = clubRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Club not found"));
        return fixtureRepository.findByHomeTeamOrAwayTeam(team, team);
    }

    public List<Fixture> getFixturesByDate(LocalDate date) {
        return fixtureRepository.findByDate(date);
    }

    public List<Fixture> getFixturesByStadium(Long stadiumId) {
        Stadium stadium = stadiumRepository.findById(stadiumId)
                .orElseThrow(() -> new RuntimeException("Stadium not found"));
        return fixtureRepository.findByStadium(stadium);
    }

    public Fixture createFixture(Fixture fixture) {
        // Kiểm tra và lấy các entity liên quan
        if (fixture.getHomeTeam() != null && fixture.getHomeTeam().getId() != null) {
            Club homeTeam = clubRepository.findById(fixture.getHomeTeam().getId())
                    .orElseThrow(() -> new RuntimeException("Home team not found"));
            fixture.setHomeTeam(homeTeam);
        }

        if (fixture.getAwayTeam() != null && fixture.getAwayTeam().getId() != null) {
            Club awayTeam = clubRepository.findById(fixture.getAwayTeam().getId())
                    .orElseThrow(() -> new RuntimeException("Away team not found"));
            fixture.setAwayTeam(awayTeam);
        }

        if (fixture.getStadium() != null && fixture.getStadium().getId() != null) {
            Stadium stadium = stadiumRepository.findById(fixture.getStadium().getId())
                    .orElseThrow(() -> new RuntimeException("Stadium not found"));
            fixture.setStadium(stadium);
        }

        return fixtureRepository.save(fixture);
    }

    public Fixture updateFixture(Long id, Fixture fixtureDetails) {
        Fixture fixture = fixtureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fixture not found"));

        // Cập nhật thông tin cơ bản
        fixture.setDate(fixtureDetails.getDate());
        fixture.setTime(fixtureDetails.getTime());

        // Cập nhật các entity liên quan
        if (fixtureDetails.getHomeTeam() != null && fixtureDetails.getHomeTeam().getId() != null) {
            Club homeTeam = clubRepository.findById(fixtureDetails.getHomeTeam().getId())
                    .orElseThrow(() -> new RuntimeException("Home team not found"));
            fixture.setHomeTeam(homeTeam);
        }

        if (fixtureDetails.getAwayTeam() != null && fixtureDetails.getAwayTeam().getId() != null) {
            Club awayTeam = clubRepository.findById(fixtureDetails.getAwayTeam().getId())
                    .orElseThrow(() -> new RuntimeException("Away team not found"));
            fixture.setAwayTeam(awayTeam);
        }

        if (fixtureDetails.getStadium() != null && fixtureDetails.getStadium().getId() != null) {
            Stadium stadium = stadiumRepository.findById(fixtureDetails.getStadium().getId())
                    .orElseThrow(() -> new RuntimeException("Stadium not found"));
            fixture.setStadium(stadium);
        }

        return fixtureRepository.save(fixture);
    }

    public void deleteFixture(Long id) {
        Fixture fixture = fixtureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fixture not found"));
        fixtureRepository.delete(fixture);
    }
}