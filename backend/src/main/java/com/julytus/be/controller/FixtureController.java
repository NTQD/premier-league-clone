package com.julytus.be.controller;

import com.julytus.be.entity.Fixture;
import com.julytus.be.service.FixtureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/fixtures")
@CrossOrigin(origins = "*")
public class FixtureController {
    @Autowired
    private FixtureService fixtureService;

    @GetMapping
    public ResponseEntity<List<Fixture>> getAllFixtures() {
        return ResponseEntity.ok(fixtureService.getAllFixtures());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fixture> getFixtureById(@PathVariable Long id) {
        Fixture fixture = fixtureService.getFixtureById(id);
        if (fixture == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(fixture);
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Fixture>> getFixturesByTeam(@PathVariable Long teamId) {
        try {
            return ResponseEntity.ok(fixtureService.getFixturesByTeam(teamId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Fixture>> getFixturesByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return ResponseEntity.ok(fixtureService.getFixturesByDate(localDate));
    }

    @GetMapping("/stadium/{stadiumId}")
    public ResponseEntity<List<Fixture>> getFixturesByStadium(@PathVariable Long stadiumId) {
        try {
            return ResponseEntity.ok(fixtureService.getFixturesByStadium(stadiumId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Fixture> createFixture(@RequestBody Fixture fixture) {
        return ResponseEntity.ok(fixtureService.createFixture(fixture));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fixture> updateFixture(@PathVariable Long id, @RequestBody Fixture fixtureDetails) {
        try {
            Fixture updatedFixture = fixtureService.updateFixture(id, fixtureDetails);
            return ResponseEntity.ok(updatedFixture);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFixture(@PathVariable Long id) {
        try {
            fixtureService.deleteFixture(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 