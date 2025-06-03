package com.cocinaapp.RecetasMagicas.recipe.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Builder
public class StepMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoContenido; // "foto", "video"
    private String extension;
    private String urlContenido;

    @ManyToOne
    @JoinColumn(name = "paso_id")
    private Step step;
}
