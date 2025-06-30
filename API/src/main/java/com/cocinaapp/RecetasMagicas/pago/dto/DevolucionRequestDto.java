package com.cocinaapp.RecetasMagicas.pago.dto;

import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DevolucionRequestDto {
    private String referencia; // referenceCode de PayU
}
