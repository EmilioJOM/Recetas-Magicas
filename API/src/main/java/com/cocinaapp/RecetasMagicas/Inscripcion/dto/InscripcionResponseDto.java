package com.cocinaapp.RecetasMagicas.Inscripcion.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InscripcionResponseDto {
    private String codigoPago;
    private String email;
    private double precioFinal;
}
