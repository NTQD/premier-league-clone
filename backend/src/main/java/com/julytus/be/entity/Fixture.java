package com.julytus.be.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Fixture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "home_team_id", nullable = false)
    private Club homeTeam;

    @ManyToOne
    @JoinColumn(name = "away_team_id", nullable = false)
    private Club awayTeam;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;

    @Column(name = "stadium_name")
    private String stadiumName;

    private Integer homeScore;
    private Integer awayScore;
    private String competition;
    private Integer matchweek;
    private String status;

    public Club getHomeTeam() { return homeTeam; }
    public void setHomeTeam(Club homeTeam) { this.homeTeam = homeTeam; }

    public Club getAwayTeam() { return awayTeam; }
    public void setAwayTeam(Club awayTeam) { this.awayTeam = awayTeam; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public LocalTime getTime() { return time; }
    public void setTime(LocalTime time) { this.time = time; }

    public String getStadiumName() { return stadiumName; }
    public void setStadiumName(String stadiumName) { this.stadiumName = stadiumName; }

    public Integer getHomeScore() { return homeScore; }
    public void setHomeScore(Integer homeScore) { this.homeScore = homeScore; }

    public Integer getAwayScore() { return awayScore; }
    public void setAwayScore(Integer awayScore) { this.awayScore = awayScore; }

    public String getCompetition() { return competition; }
    public void setCompetition(String competition) { this.competition = competition; }

    public Integer getMatchweek() { return matchweek; }
    public void setMatchweek(Integer matchweek) { this.matchweek = matchweek; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
} 