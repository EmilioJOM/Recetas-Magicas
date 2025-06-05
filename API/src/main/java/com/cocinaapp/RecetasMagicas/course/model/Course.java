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
    private String dateStart;

    // Cronograma de clases o temas
    @ElementCollection
    private List<String> cronograma;

    // Relación a sedes
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CronogramaCurso> locations;

    // Precio y promoción (pueden ser null si no aplican)
    private Double price;

    // Modalidad: presencial, virtual, online, etc.
    private String modality;

    // Requisitos, insumos o utensilios
    private String requirements;

    // Estado del curso (puede ser "Abierto", "Cerrado", etc.)
    private String status;
}
