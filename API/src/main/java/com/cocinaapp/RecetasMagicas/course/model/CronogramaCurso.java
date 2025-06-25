package com.cocinaapp.RecetasMagicas.course.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CronogramaCurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne
    @JoinColumn(name = "sede_id", nullable = false)
    private Sede sede;

    private String ubicacion; // Aula, sala, etc (opcional)
    private Double promotion; // Porcentaje/descuento especial para esa edición (opcional)
    private String fechaInicio;
    private String fechaFin;
    private Integer vacantes;
}
