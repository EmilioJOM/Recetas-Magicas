package com.cocinaapp.RecetasMagicas.card.dto;

import lombok.*;

@Getter @Setter
public class CardRegisterRequestDto {
    private String numero;
    private String titular;
    private String vencimiento;
}
