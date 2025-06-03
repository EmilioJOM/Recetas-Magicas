package com.cocinaapp.RecetasMagicas.recipe.model;

import com.cocinaapp.RecetasMagicas.user.model.User;
import jakarta.persistence.*;

@Entity
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double calificacion;
    private String comentarios;

    @ManyToOne
    private User user;

    @ManyToOne
    private Recipe recipe;
}
