package com.julytus.be.repository;

import com.julytus.be.entity.Standing;
import com.julytus.be.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface StandingRepository extends JpaRepository<Standing, Long> {
    Optional<Standing> findByTeam(Club team);
    
    @Query("SELECT s FROM Standing s ORDER BY s.points DESC, s.won DESC")
    List<Standing> findAllOrderByPointsDesc();
    
    @Query("SELECT s FROM Standing s WHERE s.team = ?1")
    Standing findStandingByTeam(Club team);

    // Lấy danh sách standing sắp xếp theo điểm từ cao xuống thấp
    List<Standing> findAllByOrderByPointsDesc();
} 