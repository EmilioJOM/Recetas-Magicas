package com.cocinaapp.RecetasMagicas.pago.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ExtraParameters {
    @JsonProperty("INSTALLMENTS_NUMBER")
    private int installmentsNumber;
}
