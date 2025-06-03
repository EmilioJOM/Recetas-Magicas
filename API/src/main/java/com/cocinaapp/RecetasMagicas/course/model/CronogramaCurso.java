package com.cocinaapp.RecetasMagicas.course.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CronogramaCurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ubicacion;   // dirección u otros datos

    // Promoción particular para esa sede (opcional)
    private Double promotion; // o porcentaje, como prefieras

    @ManyToOne
    @JoinColumn(name = "sede_id", nullable = false)
    private Sede sede;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

}
