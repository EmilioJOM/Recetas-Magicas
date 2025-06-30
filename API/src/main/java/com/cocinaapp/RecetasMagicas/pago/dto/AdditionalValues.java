package com.cocinaapp.RecetasMagicas.pago.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AdditionalValues {
    @JsonProperty("TX_VALUE")
    private TxValue txValue;
}
