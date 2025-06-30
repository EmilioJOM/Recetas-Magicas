package com.cocinaapp.RecetasMagicas.pago.dto;

import lombok.Data;

@Data
public class Transaction {
    private Order order;
    private Payer payer;
    private CreditCard creditCard;
    private ExtraParameters extraParameters;
    private String type;
    private String paymentMethod;
    private String paymentCountry;
    private String deviceSessionId;
    private String ipAddress;
    private String cookie;
    private String userAgent;
}
