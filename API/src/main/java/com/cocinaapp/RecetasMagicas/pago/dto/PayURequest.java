package com.cocinaapp.RecetasMagicas.pago.dto;

import lombok.*;

@Data
public class PayURequest {
    private String language;
    private String command;
    private boolean test;
    private Merchant merchant;
    private Transaction transaction;
}
