package com.cocinaapp.RecetasMagicas.user.model;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Alumno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAlumno;

    private String numeroTarjeta;
    private String numeroTramite;
    private String nombre;           // Podrías hacer referencia a User si tenés relación
    private String PathDniFrente;
    private String PathDniDorso;
    private String numeroDNI;

    // Si tu modelo lo necesita: relación uno a uno con User

    @OneToOne
    @JoinColumn(name = "idUsuario", referencedColumnName = "id")
    private User user;
}