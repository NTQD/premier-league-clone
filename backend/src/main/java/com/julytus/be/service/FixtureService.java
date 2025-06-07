package com.julytus.be.service;

import com.julytus.be.entity.Fixture;
import com.julytus.be.entity.Club;
import com.julytus.be.repository.FixtureRepository;
import com.julytus.be.repository.ClubRepository;
import com.julytus.be.entity.Standing;
import com.julytus.be.repository.StandingRepository;
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
    private StandingRepository standingRepository;

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

    public Fixture createFixture(Fixture fixture) {
        // Lấy homeTeam từ DB nếu có id, nếu không có id thì ném lỗi (vì homeTeam là @JoinColumn(nullable = false)
        if (fixture.getHomeTeam() == null || fixture.getHomeTeam().getId() == null) {
            throw new RuntimeException("Home team id không được để trống.");
        }
        Club homeTeam = clubRepository.findById(fixture.getHomeTeam().getId())
                .orElseThrow(() -> new RuntimeException("Home team not found"));
        fixture.setHomeTeam(homeTeam);

        // Lấy awayTeam từ DB nếu có id, nếu không có id thì ném lỗi (vì awayTeam là @JoinColumn(nullable = false)
        if (fixture.getAwayTeam() == null || fixture.getAwayTeam().getId() == null) {
            throw new RuntimeException("Away team id không được để trống.");
        }
        Club awayTeam = clubRepository.findById(fixture.getAwayTeam().getId())
                .orElseThrow(() -> new RuntimeException("Away team not found"));
        fixture.setAwayTeam(awayTeam);

        // Lưu fixture mới
        Fixture savedFixture = fixtureRepository.save(fixture);

        // Nếu fixture có homeScore và awayScore (đã có kết quả) thì cập nhật điểm cho homeTeam và awayTeam trong bảng Standing
        if (savedFixture.getHomeScore() != null && savedFixture.getAwayScore() != null) {
            updateStandings(savedFixture, homeTeam, awayTeam);
        }

        return savedFixture;
    }

    public Fixture updateFixture(Long id, Fixture fixtureDetails) {
        Fixture fixture = fixtureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fixture not found"));

        // Lưu lại kết quả cũ (nếu có) để trừ điểm khi cập nhật
        Integer oldHomeScore = fixture.getHomeScore();
        Integer oldAwayScore = fixture.getAwayScore();

        fixture.setDate(fixtureDetails.getDate());
        fixture.setTime(fixtureDetails.getTime());
        fixture.setStadiumName(fixtureDetails.getStadiumName());
        fixture.setHomeScore(fixtureDetails.getHomeScore());
        fixture.setAwayScore(fixtureDetails.getAwayScore());
        fixture.setCompetition(fixtureDetails.getCompetition());
        fixture.setMatchweek(fixtureDetails.getMatchweek());
        fixture.setStatus(fixtureDetails.getStatus());

        // Nếu có homeTeam (và có id) thì fetch từ DB và gán, nếu không thì giữ nguyên (không gán null)
        if (fixtureDetails.getHomeTeam() != null && fixtureDetails.getHomeTeam().getId() != null) {
            Club homeTeam = clubRepository.findById(fixtureDetails.getHomeTeam().getId())
                    .orElseThrow(() -> new RuntimeException("Home team not found"));
            fixture.setHomeTeam(homeTeam);
        }

        // Nếu có awayTeam (và có id) thì fetch từ DB và gán, nếu không thì giữ nguyên (không gán null)
        if (fixtureDetails.getAwayTeam() != null && fixtureDetails.getAwayTeam().getId() != null) {
            Club awayTeam = clubRepository.findById(fixtureDetails.getAwayTeam().getId())
                    .orElseThrow(() -> new RuntimeException("Away team not found"));
            fixture.setAwayTeam(awayTeam);
        }

        Fixture updatedFixture = fixtureRepository.save(fixture);

        // Nếu fixture cũ đã có kết quả (oldHomeScore, oldAwayScore không null) thì trừ điểm cho homeTeam và awayTeam (dựa trên kết quả cũ)
        if (oldHomeScore != null && oldAwayScore != null) {
            revertStandings(oldHomeScore, oldAwayScore, fixture.getHomeTeam(), fixture.getAwayTeam());
        }

        // Nếu fixture mới (updatedFixture) có homeScore và awayScore thì cập nhật điểm cho homeTeam và awayTeam (dựa trên kết quả mới)
        if (updatedFixture.getHomeScore() != null && updatedFixture.getAwayScore() != null) {
            updateStandings(updatedFixture, updatedFixture.getHomeTeam(), updatedFixture.getAwayTeam());
        }

        return updatedFixture;
    }

    public void deleteFixture(Long id) {
        Fixture fixture = fixtureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fixture not found"));
        // Nếu fixture đã có kết quả (homeScore, awayScore không null) thì trừ điểm cho homeTeam và awayTeam
        if (fixture.getHomeScore() != null && fixture.getAwayScore() != null) {
            revertStandings(fixture.getHomeScore(), fixture.getAwayScore(), fixture.getHomeTeam(), fixture.getAwayTeam());
        }
        fixtureRepository.delete(fixture);
    }

    // Phương thức cập nhật điểm cho homeTeam và awayTeam trong bảng Standing dựa trên kết quả trận đấu (homeScore, awayScore)
    private void updateStandings(Fixture fixture, Club homeTeam, Club awayTeam) {
        Integer homeScore = fixture.getHomeScore();
        Integer awayScore = fixture.getAwayScore();
        Standing homeStanding = standingRepository.findByTeam(homeTeam).orElseGet(() -> {
            Standing s = new Standing();
            s.setTeam(homeTeam);
            s.setPlayed(0);
            s.setWon(0);
            s.setDrawn(0);
            s.setLost(0);
            s.setPoints(0);
            return s;
        });
        Standing awayStanding = standingRepository.findByTeam(awayTeam).orElseGet(() -> {
            Standing s = new Standing();
            s.setTeam(awayTeam);
            s.setPlayed(0);
            s.setWon(0);
            s.setDrawn(0);
            s.setLost(0);
            s.setPoints(0);
            return s;
        });

        // Cập nhật số trận đã chơi (played) cho cả hai đội
        homeStanding.setPlayed(homeStanding.getPlayed() + 1);
        awayStanding.setPlayed(awayStanding.getPlayed() + 1);

        if (homeScore > awayScore) {
            // homeTeam thắng, awayTeam thua
            homeStanding.setWon(homeStanding.getWon() + 1);
            awayStanding.setLost(awayStanding.getLost() + 1);
        } else if (homeScore < awayScore) {
            // awayTeam thắng, homeTeam thua
            awayStanding.setWon(awayStanding.getWon() + 1);
            homeStanding.setLost(homeStanding.getLost() + 1);
        } else {
            // Hòa
            homeStanding.setDrawn(homeStanding.getDrawn() + 1);
            awayStanding.setDrawn(awayStanding.getDrawn() + 1);
        }

        // Tính điểm (3*trận thắng + 1*trận hòa + 0*trận thua) (đã có @PrePersist trong Standing)
        standingRepository.save(homeStanding);
        standingRepository.save(awayStanding);
    }

    // Phương thức trừ điểm cho homeTeam và awayTeam (dùng khi cập nhật hoặc xóa fixture đã có kết quả)
    private void revertStandings(Integer homeScore, Integer awayScore, Club homeTeam, Club awayTeam) {
        Standing homeStanding = standingRepository.findByTeam(homeTeam).orElseThrow(() -> new RuntimeException("Home standing not found"));
        Standing awayStanding = standingRepository.findByTeam(awayTeam).orElseThrow(() -> new RuntimeException("Away standing not found"));

        // Trừ số trận đã chơi (played) cho cả hai đội
        homeStanding.setPlayed(homeStanding.getPlayed() - 1);
        awayStanding.setPlayed(awayStanding.getPlayed() - 1);

        if (homeScore > awayScore) {
            // homeTeam thắng, awayTeam thua (trừ trận thắng của home, trừ trận thua của away)
            homeStanding.setWon(homeStanding.getWon() - 1);
            awayStanding.setLost(awayStanding.getLost() - 1);
        } else if (homeScore < awayScore) {
            // awayTeam thắng, homeTeam thua (trừ trận thắng của away, trừ trận thua của home)
            awayStanding.setWon(awayStanding.getWon() - 1);
            homeStanding.setLost(homeStanding.getLost() - 1);
        } else {
            // Hòa (trừ trận hòa của cả hai đội)
            homeStanding.setDrawn(homeStanding.getDrawn() - 1);
            awayStanding.setDrawn(awayStanding.getDrawn() - 1);
        }

        // Tính lại điểm (đã có @PrePersist trong Standing)
        standingRepository.save(homeStanding);
        standingRepository.save(awayStanding);
    }
}