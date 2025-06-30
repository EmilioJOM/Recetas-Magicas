package com.cocinaapp.RecetasMagicas.pago.dto;

import lombok.Data;

@Data
public class Payer {
    private String fullName;
    private String emailAddress;
    private String dniNumber;
}
