package com.cocinaapp.RecetasMagicas.card.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CardResponseDto {
    private Long id;
    private String numeroEnmascarado;
    private String titular;
    private String vencimiento;
}