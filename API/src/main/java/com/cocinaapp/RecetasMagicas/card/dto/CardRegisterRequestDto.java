package com.cocinaapp.RecetasMagicas.card.dto;

import lombok.*;

@Getter @Setter
public class CardRegisterRequestDto {
    private String cardNumber;
    private String cardHolderName;
    private String expirationDate;
    private String securityCode;
    private String emailMP;
}
