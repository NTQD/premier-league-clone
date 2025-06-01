package com.julytus.be.controller;

import com.julytus.be.entity.Standing;
import com.julytus.be.entity.Club;
import com.julytus.be.service.StandingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/standings")
@CrossOrigin(origins = "*")
public class StandingController {
    @Autowired
    private StandingService standingService;

    @GetMapping
    public ResponseEntity<List<Standing>> getAllStandings() {
        return ResponseEntity.ok(standingService.getAllStandings());
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<Standing> getStandingByTeam(@PathVariable Long teamId) {
        Club team = new Club();
        team.setId(teamId);
        Standing standing = standingService.getStandingByTeam(team);
        if (standing == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(standing);
    }

    @PostMapping("/recalculate")
    public ResponseEntity<Void> recalculateStandings() {
        standingService.recalculateAllStandings();
        return ResponseEntity.ok().build();
    }
} 