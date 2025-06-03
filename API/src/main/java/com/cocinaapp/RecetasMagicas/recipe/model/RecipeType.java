package com.cocinaapp.RecetasMagicas.recipe.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class RecipeType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // esto corresponde a idTipo en SQL

    @Column(nullable = false, length = 100)
    private String descripcion;
}
