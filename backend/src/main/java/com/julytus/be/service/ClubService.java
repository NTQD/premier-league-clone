package com.julytus.be.service;

import com.julytus.be.entity.Club;
import com.julytus.be.entity.Stadium;
import com.julytus.be.repository.ClubRepository;
import com.julytus.be.repository.StadiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClubService {
    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private StadiumRepository stadiumRepository;

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
        // Kiểm tra và lấy stadium nếu có stadiumId
        if (club.getStadium() != null && club.getStadium().getId() != null) {
            Stadium stadium = stadiumRepository.findById(club.getStadium().getId())
                    .orElseThrow(() -> new RuntimeException("Stadium not found"));
            club.setStadium(stadium);
        }
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

        // Cập nhật stadium nếu có thay đổi
        if (clubDetails.getStadium() != null && clubDetails.getStadium().getId() != null) {
            Stadium stadium = stadiumRepository.findById(clubDetails.getStadium().getId())
                    .orElseThrow(() -> new RuntimeException("Stadium not found"));
            club.setStadium(stadium);
        }

        return clubRepository.save(club);
    }

    public void deleteClub(Long id) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found"));
        clubRepository.delete(club);
    }
}