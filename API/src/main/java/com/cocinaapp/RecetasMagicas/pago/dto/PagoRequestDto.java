package com.cocinaapp.RecetasMagicas.pago.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PagoRequestDto {
    private Long cardID;
    private Double monto;

}
