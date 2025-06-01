package com.julytus.be.repository;

import com.julytus.be.entity.Player;
import com.julytus.be.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByClub(Club club);
    List<Player> findByNationality(String nationality);
    List<Player> findByPosition(String position);
} 