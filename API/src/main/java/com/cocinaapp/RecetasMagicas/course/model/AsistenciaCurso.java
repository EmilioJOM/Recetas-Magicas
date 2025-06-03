package com.cocinaapp.RecetasMagicas.course.model;

import com.cocinaapp.RecetasMagicas.user.model.Alumno;
import lombok.*;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AsistenciaCurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAsistencia;

    @ManyToOne
    @JoinColumn(name = "idAlumno", nullable = false)
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "idCronograma", nullable = false)
    private CronogramaCurso cronogramaCurso;

    private LocalDate fecha;
}
