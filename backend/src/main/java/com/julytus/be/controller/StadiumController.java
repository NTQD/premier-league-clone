package com.julytus.be.controller;

import com.julytus.be.entity.Stadium;
import com.julytus.be.service.StadiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stadiums")
@CrossOrigin(origins = "*")
public class StadiumController {
    @Autowired
    private StadiumService stadiumService;

    @GetMapping
    public ResponseEntity<List<Stadium>> getAllStadiums() {
        return ResponseEntity.ok(stadiumService.getAllStadiums());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stadium> getStadiumById(@PathVariable Long id) {
        Stadium stadium = stadiumService.getStadiumById(id);
        if (stadium == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(stadium);
    }

    @PostMapping
    public ResponseEntity<Stadium> createStadium(@RequestBody Stadium stadium) {
        return ResponseEntity.ok(stadiumService.createStadium(stadium));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stadium> updateStadium(@PathVariable Long id, @RequestBody Stadium stadiumDetails) {
        try {
            Stadium updatedStadium = stadiumService.updateStadium(id, stadiumDetails);
            return ResponseEntity.ok(updatedStadium);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStadium(@PathVariable Long id) {
        try {
            stadiumService.deleteStadium(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 