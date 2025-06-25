package com.cocinaapp.RecetasMagicas.course.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Sede {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // corresponde a idSede

    private String nombre;
    private String direccion;
    @Column(nullable = true)
    private String telefono;
    @Column(nullable = true)
    private String mail;
    @Column(nullable = true)
    private String whatsapp;
    @Column(nullable = true)
    private String tipoBonificacion;
    @Column(nullable = true)
    private String bonificacionCursos;
    @Column(nullable = true)
    private String tipoPromocion;
    @Column(nullable = true)
    private String promocionCursos;

    private int capacidadAlumnos;
}
