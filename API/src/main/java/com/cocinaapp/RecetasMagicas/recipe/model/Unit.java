package com.cocinaapp.RecetasMagicas.recipe.model;

import lombok.*;

import jakarta.persistence.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUnidad;

    @Column(nullable = false, length = 50)
    private String descripcion;
}
