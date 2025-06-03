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
    private String dniNif;
    private String nombre;           // Podrías hacer referencia a User si tenés relación
    private String cuentaCorriente;

    // Si tu modelo lo necesita: relación uno a uno con User
    @OneToOne
    @JoinColumn(name = "idUsuario", referencedColumnName = "idUsuario")
    private User user;
}