package com.cocinaapp.RecetasMagicas.pago.service;

import com.cocinaapp.RecetasMagicas.card.model.Card;
import com.cocinaapp.RecetasMagicas.card.repository.CardRepository;
import com.cocinaapp.RecetasMagicas.pago.dto.PagoRequestDto;
import com.cocinaapp.RecetasMagicas.user.model.Alumno;
import com.cocinaapp.RecetasMagicas.user.model.User;
import com.cocinaapp.RecetasMagicas.user.repository.AlumnoRepository;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.common.IdentificationRequest;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.payment.PaymentCreateRequest;
import com.mercadopago.client.payment.PaymentPayerRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class MercadoPagoTokenService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Value("${mercadopago.access.token}")
    private String accessToken;

    public String makePaymentWithSdk(String token, Double amount, String payerEmail, String paymentMethodId, String dni) {
        System.out.println("CREANDO PAGO");
        try {
            MercadoPagoConfig.setAccessToken(accessToken);

            PaymentClient paymentClient = new PaymentClient();

            PaymentCreateRequest paymentRequest = PaymentCreateRequest.builder()
                    .transactionAmount(BigDecimal.valueOf(amount))
                    .token(token)
                    .description("Pago en app Recetas Mágicas")
                    .installments(1)
                    .paymentMethodId(paymentMethodId)
                    .payer(
                            PaymentPayerRequest.builder()
                                    .email(payerEmail)
                                    .identification(
                                            IdentificationRequest.builder()
                                                    .type("DNI")
                                                    .number(dni)
                                                    .build()
                                    )
                                    .build()
                    )
                    .build();
            System.out.println("Consulta a la API de MP");
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(paymentRequest);
            System.out.println(json);
            Payment createdPayment = paymentClient.create(paymentRequest);

            return createdPayment.getStatus() + " - " + createdPayment.getStatusDetail();
        } catch (MPApiException apiException) {
            System.out.println("=== Error Mercado Pago API ===");
            System.out.println(apiException.getApiResponse().getContent()); // 👈 Te muestra el JSON con el detalle
            throw new RuntimeException("Error al procesar el pago: " + apiException.getApiResponse().getContent(), apiException);
        } catch (MPException mpException) {
            System.out.println("=== Error SDK Mercado Pago ===");
            System.out.println(mpException.getMessage());
            throw new RuntimeException("Error en el SDK de Mercado Pago: " + mpException.getMessage(), mpException);
        } catch (Exception e) {
            throw new RuntimeException("Error inesperado: " + e.getMessage(), e);
        }
    }

    public void pagar(PagoRequestDto dto, String email) {
        Card card = cardRepository.findById(dto.getCardID())
                .orElseThrow(() -> new RuntimeException("Tarjeta no encontrada"));

        Double monto = dto.getMonto();
        if (monto == null || monto <= 0) {
            throw new IllegalArgumentException("Monto inválido");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Alumno alumno = alumnoRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado para el usuario: " + user.getEmail()));

        // Aquí seguís usando tu método de creación de token (puede ser con RestTemplate o lo cambiamos si querés)
        String token = createCardToken(card, alumno.getNumeroDNI());

        if (token == null) {
            throw new RuntimeException("No se pudo generar el token de tarjeta");
        }

        makePaymentWithSdk(token, monto, card.getEmailMP(), card.getTipo(), alumno.getNumeroDNI());
    }

    // Tu método original de generación de token con RestTemplate puede seguir igual
    public String createCardToken(Card card, String dni) {
        System.out.println("Creando TOKEN");
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.mercadopago.com/v1/card_tokens?access_token=" + accessToken;

        Map<String, Object> cardholder = Map.of(
                "name", "APRO",
                "type", "DNI",
                "number", dni
        );

        Map<String, Object> body = Map.of(
                "card_number", card.getNumero(),
                "security_code", card.getCodigo(),
                "expiration_month", card.getMesExp(),
                "expiration_year", card.getAnioExp(),
                "cardholder", cardholder
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            Object token = response.getBody().get("id");
            return token != null ? token.toString() : null;
        } catch (Exception e) {
            throw new RuntimeException("Error al generar token de tarjeta: " + e.getMessage());
        }
    }
}
