package com.cocinaapp.RecetasMagicas.recipe.model;

import jakarta.persistence.*;
import lombok.*;
import com.cocinaapp.RecetasMagicas.recipe.model.Recipe;

import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int nroPaso;

    private String instruction;

    @ManyToOne
    @JoinColumn(name = "receta_id")
    private Recipe recipe;

    @OneToMany(mappedBy = "step", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StepMedia> media;
}