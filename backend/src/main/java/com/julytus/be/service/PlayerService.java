package com.julytus.be.service;

import com.julytus.be.entity.Player;
import com.julytus.be.entity.Club;
import com.julytus.be.repository.PlayerRepository;
import com.julytus.be.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;
    
    @Autowired
    private ClubRepository clubRepository;

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Player getPlayerById(Long id) {
        return playerRepository.findById(id).orElse(null);
    }

    public List<Player> getPlayersByClub(Long clubId) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new RuntimeException("Club not found"));
        return playerRepository.findByClub(club);
    }

    public List<Player> getPlayersByNationality(String nationality) {
        return playerRepository.findByNationality(nationality);
    }

    public List<Player> getPlayersByPosition(String position) {
        return playerRepository.findByPosition(position);
    }

    public Player createPlayer(Player player) {
        // Kiểm tra và lấy club nếu có clubId
        if (player.getClub() != null && player.getClub().getId() != null) {
            Club club = clubRepository.findById(player.getClub().getId())
                .orElseThrow(() -> new RuntimeException("Club not found"));
            player.setClub(club);
        }
        return playerRepository.save(player);
    }

    public Player updatePlayer(Long id, Player playerDetails) {
        Player player = playerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Player not found"));
        
        player.setName(playerDetails.getName());
        player.setDateOfBirth(playerDetails.getDateOfBirth());
        player.setNationality(playerDetails.getNationality());
        player.setPosition(playerDetails.getPosition());
        player.setAvatar(playerDetails.getAvatar());
        player.setFlag(playerDetails.getFlag());
        
        // Cập nhật club nếu có thay đổi
        if (playerDetails.getClub() != null && playerDetails.getClub().getId() != null) {
            Club club = clubRepository.findById(playerDetails.getClub().getId())
                .orElseThrow(() -> new RuntimeException("Club not found"));
            player.setClub(club);
        }
        
        return playerRepository.save(player);
    }

    public void deletePlayer(Long id) {
        Player player = playerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Player not found"));
        playerRepository.delete(player);
    }
} 