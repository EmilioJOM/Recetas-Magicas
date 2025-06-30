package com.cocinaapp.RecetasMagicas.pago.dto;

import lombok.Data;

@Data
public class TxValue {
    private double value;
    private String currency;
}
