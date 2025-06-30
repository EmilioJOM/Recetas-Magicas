package com.cocinaapp.RecetasMagicas.pago.dto;

import lombok.Data;

@Data
public class Order {
    private String accountId;
    private String referenceCode;
    private String description;
    private String language;
    private String signature;
    private String notifyUrl;
    private AdditionalValues additionalValues;
    private Buyer buyer;
}
