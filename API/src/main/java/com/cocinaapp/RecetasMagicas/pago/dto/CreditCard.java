package com.cocinaapp.RecetasMagicas.pago.dto;

import lombok.Data;

@Data
public class CreditCard {
    private String number;
    private String securityCode;
    private String expirationDate;
    private String name;
}
