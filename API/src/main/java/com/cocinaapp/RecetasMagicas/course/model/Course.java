package com.cocinaapp.RecetasMagicas.course.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String mainPhoto;

    // Lista de temas o contenidos principales
    @ElementCollection
    private List<String> contenidos;

    private String requirements;

    private String duration; // Ej: "4 meses", "8 semanas"

    private Double price;

    private String modality; // Ej: "presencial", "virtual", "online"

    private List<String> Elementos;
    private List<String> Cronograma;
}
