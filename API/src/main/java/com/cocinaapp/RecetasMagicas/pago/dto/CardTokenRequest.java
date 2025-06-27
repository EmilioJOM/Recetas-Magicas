package com.cocinaapp.RecetasMagicas.pago.dto;

public class CardTokenRequest {
    public String card_number;
    public String security_code;
    public int expiration_month;
    public int expiration_year;
    public String cardholder_name;
    public String doc_type;
    public String doc_number;
}

