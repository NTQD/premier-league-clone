package com.julytus.be.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Standing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Club team;

    @Column(nullable = false)
    private Integer played;

    @Column(nullable = false)
    private Integer won;

    @Column(nullable = false)
    private Integer drawn;

    @Column(nullable = false)
    private Integer lost;

    @Column(nullable = false)
    private Integer points;

    @PrePersist
    @PreUpdate
    public void calculatePoints() {
        this.points = (won * 3) + drawn;
    }
} 