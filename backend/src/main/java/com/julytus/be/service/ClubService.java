package com.julytus.be.service;

import com.julytus.be.entity.Club;
import com.julytus.be.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClubService {
    @Autowired
    private ClubRepository clubRepository;


    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    public Club getClubById(Long id) {
        return clubRepository.findById(id).orElse(null);
    }

    public Optional<Club> getClubByName(String name) {
        return clubRepository.findByName(name);
    }

    public Club createClub(Club club) {
        // Không còn xử lý stadium
        return clubRepository.save(club);
    }

    public Club updateClub(Long id, Club clubDetails) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found"));

        club.setName(clubDetails.getName());
        club.setFoundedYear(clubDetails.getFoundedYear());
        club.setManager(clubDetails.getManager());
        club.setLocation(clubDetails.getLocation());
        club.setWebsite(clubDetails.getWebsite());
        club.setLogo(clubDetails.getLogo());
        club.setCapacity(clubDetails.getCapacity());

        return clubRepository.save(club);
    }

    public void deleteClub(Long id) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found"));
        clubRepository.delete(club);
    }
}