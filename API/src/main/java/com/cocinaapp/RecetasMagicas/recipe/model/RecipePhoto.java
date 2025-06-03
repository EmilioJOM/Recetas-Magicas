package com.cocinaapp.RecetasMagicas.recipe.model;

import jakarta.persistence.*;

@Entity
public class RecipePhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String urlFoto;
    private String extension;

    @ManyToOne
    private Recipe recipe;
}
