package com.julytus.be.service;

import com.julytus.be.entity.Stadium;
import com.julytus.be.repository.StadiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StadiumService {
    @Autowired
    private StadiumRepository stadiumRepository;

    public List<Stadium> getAllStadiums() {
        return stadiumRepository.findAll();
    }

    public Stadium getStadiumById(Long id) {
        return stadiumRepository.findById(id).orElse(null);
    }

    public Stadium createStadium(Stadium stadium) {
        return stadiumRepository.save(stadium);
    }

    public Stadium updateStadium(Long id, Stadium stadiumDetails) {
        Stadium stadium = stadiumRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Stadium not found"));
        
        stadium.setName(stadiumDetails.getName());
        stadium.setCapacity(stadiumDetails.getCapacity());
        stadium.setLocation(stadiumDetails.getLocation());
        stadium.setYearBuilt(stadiumDetails.getYearBuilt());
        
        return stadiumRepository.save(stadium);
    }

    public void deleteStadium(Long id) {
        Stadium stadium = stadiumRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Stadium not found"));
        stadiumRepository.delete(stadium);
    }
} 