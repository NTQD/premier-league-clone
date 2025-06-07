package com.julytus.be.controller;

import com.julytus.be.entity.Standing;
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

    // API lấy danh sách standing sắp xếp theo điểm từ cao xuống thấp
    @GetMapping
    public ResponseEntity<List<Standing>> getStandingsByPoints() {
        return ResponseEntity.ok(standingService.getStandingsByPoints());
    }

    // API lấy standing của một club cụ thể
    @GetMapping("/team/{teamId}")
    public ResponseEntity<Standing> getStandingByTeam(@PathVariable Long teamId) {
        try {
            return ResponseEntity.ok(standingService.getStandingByTeam(teamId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 