package com.cocinaapp.RecetasMagicas.recipe.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "receta_id")
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "ingrediente_id")
    private Ingredient ingredient;

    private Double cantidad;
    private String unidad;
    private String observaciones;
}
