package com.cocinaapp.RecetasMagicas.recipe.model;

import jakarta.persistence.*;
import lombok.*;
import com.cocinaapp.RecetasMagicas.recipe.model.Recipe;

@Entity
@Getter
@Setter
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String quantity;
    private String detail;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;
}

