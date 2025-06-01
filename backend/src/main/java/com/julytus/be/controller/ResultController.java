package com.julytus.be.controller;

import com.julytus.be.entity.Result;
import com.julytus.be.entity.Club;
import com.julytus.be.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
public class ResultController {
    @Autowired
    private ResultService resultService;

    @GetMapping
    public ResponseEntity<List<Result>> getAllResults() {
        return ResponseEntity.ok(resultService.getAllResults());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Result> getResultById(@PathVariable Long id) {
        Result result = resultService.getResultById(id);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Result>> getResultsByTeam(@PathVariable Long teamId) {
        Club team = new Club();
        team.setId(teamId);
        return ResponseEntity.ok(resultService.getResultsByTeam(team));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Result>> getResultsByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return ResponseEntity.ok(resultService.getResultsByDate(localDate));
    }

    @PostMapping
    public ResponseEntity<Result> createResult(@RequestBody Result result) {
        return ResponseEntity.ok(resultService.createResult(result));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Result> updateResult(@PathVariable Long id, @RequestBody Result resultDetails) {
        try {
            Result updatedResult = resultService.updateResult(id, resultDetails);
            return ResponseEntity.ok(updatedResult);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResult(@PathVariable Long id) {
        try {
            resultService.deleteResult(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 