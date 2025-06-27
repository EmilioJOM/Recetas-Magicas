package com.cocinaapp.RecetasMagicas.pago.service;

import com.cocinaapp.RecetasMagicas.pago.dto.CardTokenRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class MercadoPagoTokenService {

    @Value("${mercadopago.access.token}")
    private String accessToken;

    public String createCardToken(CardTokenRequest request) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://api.mercadopago.com/v1/card_tokens?access_token=" + accessToken;

        Map<String, Object> cardholder = Map.of(
                "name", request.cardholder_name,
                "identification", Map.of(
                        "type", request.doc_type,
                        "number", request.doc_number
                )
        );

        Map<String, Object> body = Map.of(
                "card_number", request.card_number,
                "security_code", request.security_code,
                "expiration_month", request.expiration_month,
                "expiration_year", request.expiration_year,
                "cardholder", cardholder
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        Object token = response.getBody().get("id");
        return token != null ? token.toString() : null;
    }
    public String makePayment(String token, Double amount, String payerEmail) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://api.mercadopago.com/v1/payments?access_token=" + accessToken;

        Map<String, Object> payer = Map.of("email", payerEmail);

        Map<String, Object> body = Map.of(
                "transaction_amount", amount,
                "token", token,
                "description", "Pago en app",
                "installments", 1,
                "payment_method_id", "visa",  // ajustá según corresponda
                "payer", payer
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);

        return response.getBody().toString();
    }

}
