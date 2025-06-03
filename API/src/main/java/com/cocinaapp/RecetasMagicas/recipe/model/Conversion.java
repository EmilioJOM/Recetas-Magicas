package com.cocinaapp.RecetasMagicas.recipe.model;

import lombok.*;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Conversion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idConversion;

    @ManyToOne
    @JoinColumn(name = "idUnidadOrigen", nullable = false)
    private Unit unidadOrigen;

    @ManyToOne
    @JoinColumn(name = "idUnidadDestino", nullable = false)
    private Unit unidadDestino;

    @Column(nullable = false, precision = 10, scale = 4)
    private BigDecimal factorConversion;
}
