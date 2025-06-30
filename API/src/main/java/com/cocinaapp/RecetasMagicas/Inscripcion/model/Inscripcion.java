package com.cocinaapp.RecetasMagicas.Inscripcion.model;

import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.user.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Inscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User usuario;

    @ManyToOne
    private CronogramaCurso cronograma;

    private LocalDate fechaInscripcion;
    private String estado;
}