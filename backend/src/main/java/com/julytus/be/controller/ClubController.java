package com.julytus.be.controller;

import com.julytus.be.entity.Club;
import com.julytus.be.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clubs")
@CrossOrigin(origins = "*")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @GetMapping
    public List<Club> getAllClubs() {
        return clubService.getAllClubs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Club> getClubById(@PathVariable Long id) {
        Club club = clubService.getClubById(id);
        if (club != null) {
            return ResponseEntity.ok(club);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Club> getClubByName(@PathVariable String name) {
        Optional<Club> club = clubService.getClubByName(name);
        return club.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Club> createClub(@RequestBody Club club) {
        Club savedClub = clubService.createClub(club);
        return ResponseEntity.ok(savedClub);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Club> updateClub(@PathVariable Long id, @RequestBody Club clubDetails) {
        try {
            Club updatedClub = clubService.updateClub(id, clubDetails);
            return ResponseEntity.ok(updatedClub);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClub(@PathVariable Long id) {
        try {
            clubService.deleteClub(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}