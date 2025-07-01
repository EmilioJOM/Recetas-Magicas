package com.cocinaapp.RecetasMagicas.pago.service;

import com.cocinaapp.RecetasMagicas.card.model.Card;
import com.cocinaapp.RecetasMagicas.card.repository.CardRepository;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.course.repository.CronogramaCursoRepository;
import com.cocinaapp.RecetasMagicas.pago.dto.*;
import com.cocinaapp.RecetasMagicas.pago.model.Pago;
import com.cocinaapp.RecetasMagicas.pago.repository.PagoRepository;
import com.cocinaapp.RecetasMagicas.user.model.*;
import com.cocinaapp.RecetasMagicas.user.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PayU {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final AlumnoRepository alumnoRepository;
    private final CronogramaCursoRepository cronogramaCursoRepository;
    private final RegistrarPago registrarPago;
    private final PagoRepository pagoRepository;

    public ResponseEntity<String> pagar(PagoRequestDto dto, String email) throws JsonProcessingException {
        if (dto.getCardID() == null) {
            throw new IllegalArgumentException("El ID de la tarjeta no puede ser null");
        }
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

        Long catedraId = Long.valueOf(dto.getCodigoPago().split("#")[1]);

        CronogramaCurso catedra = cronogramaCursoRepository.findById(catedraId)
                .orElseThrow(() -> new RuntimeException("Catedra no encontrada para el ID: " + dto.getCodigoPago()));

        ResponseEntity<String> respuesta = pagarPayU(monto, user, card, alumno);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(respuesta.getBody());
        registrarPago.pagoRealizado(
                user.getEmail()+"#"+catedra.getId(),
                root.path("transactionResponse").path("orderId").asText(),
                root.path("transactionResponse").path("transactionId").asText(),
                "ONLINE");
        return respuesta;
    }
    public ResponseEntity<String> pagarPayU(Double amount, User user, Card card, Alumno alumno){
        String apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
        String apiLogin = "pRRXKOl8ikMmt9u";
        String merchantId = "508029";
        String accountId = "512322";
        String currency = "ARS";

        // 👉 DATOS DINÁMICOS DESDE EL PAYLOAD
        double value = Double.parseDouble(String.valueOf(amount));
        String cardNumber = "4850110000000000".toString();
        String cvv = "123".toString();
        String expiry = "2025/12".toString();
        String fullName = "APPROVED".toString();
        String email = user.getEmail().toString();
        String dni = alumno.getNumeroDNI().toString();

        // 👉 REFERENCIA Y FIRMA
        String referenceCode = "TEST_" + System.currentTimeMillis();
        String signature = DigestUtils.md5Hex(apiKey + "~" + merchantId + "~" + referenceCode + "~" + value + "~" + currency);

        // 👉 ARMADO DEL REQUEST
        PayURequest request = new PayURequest();
        request.setLanguage("es");
        request.setCommand("SUBMIT_TRANSACTION");
        request.setTest(true);

        // Merchant
        Merchant merchant = new Merchant();
        merchant.setApiLogin(apiLogin);
        merchant.setApiKey(apiKey);
        request.setMerchant(merchant);

        // TX_VALUE
        TxValue txValue = new TxValue();
        txValue.setValue(value);
        txValue.setCurrency(currency);

        // AdditionalValues
        AdditionalValues additionalValues = new AdditionalValues();
        additionalValues.setTxValue(txValue);

        // Buyer
        Buyer buyer = new Buyer();
        buyer.setFullName(fullName);
        buyer.setEmailAddress(email);
        buyer.setDniNumber(dni);

        // Order
        Order order = new Order();
        order.setAccountId(accountId);
        order.setReferenceCode(referenceCode);
        order.setDescription("Pago de prueba");
        order.setLanguage("es");
        order.setSignature(signature);
        order.setNotifyUrl("http://test.com/notify");
        order.setAdditionalValues(additionalValues);
        order.setBuyer(buyer);

        // Payer (mismo que Buyer)
        Payer payer = new Payer();
        payer.setFullName(fullName);
        payer.setEmailAddress(email);
        payer.setDniNumber(dni);

        // CreditCard
        CreditCard creditCard = new CreditCard();
        creditCard.setNumber(cardNumber);
        creditCard.setSecurityCode(cvv);
        creditCard.setExpirationDate(expiry);
        creditCard.setName(fullName);

        // ExtraParameters
        ExtraParameters extraParams = new ExtraParameters();
        extraParams.setInstallmentsNumber(1);

        // Transaction
        Transaction transaction = new Transaction();
        transaction.setOrder(order);
        transaction.setPayer(payer);
        transaction.setCreditCard(creditCard);
        transaction.setExtraParameters(extraParams);
        transaction.setType("AUTHORIZATION_AND_CAPTURE");
        transaction.setPaymentMethod("VISA");
        transaction.setPaymentCountry("AR");
        transaction.setDeviceSessionId(UUID.randomUUID().toString());
        transaction.setIpAddress("127.0.0.1");
        transaction.setCookie("test_cookie");
        transaction.setUserAgent("PostmanRuntime");

        // Asignar Transaction a la request
        request.setTransaction(transaction);
        ObjectMapper mapper = new ObjectMapper();
        String json = null;
        try {
            json = mapper.writeValueAsString(request);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        System.out.println(json);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(json, headers);

        RestTemplate rest = new RestTemplate();
        String url = "https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi";

        ResponseEntity<String> respuesta = rest.postForEntity(url, entity, String.class);
        return respuesta;

    }
    public ResponseEntity<String> reembolsarParcial(DevolucionRequestDto payload, String email) {
        String apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
        String apiLogin = "pRRXKOl8ikMmt9u";
        String currency = "ARS";

        Pago pago = pagoRepository.findByReferencia(payload.getReferencia())
                .orElseThrow(() -> new RuntimeException("Registro de Pago no encontrado segun codigo: " + payload.getReferencia()));

        String[] partes = pago.getReferencia().split("\\|");
        Long catedraId = Long.parseLong(partes[1]);

        User usuario = userRepository.findByEmail(partes[0])
                .orElseThrow(() -> new RuntimeException("Usuario no encontrada para el ID: " + partes[0]));

        CronogramaCurso catedra = cronogramaCursoRepository.findById(catedraId)
                .orElseThrow(() -> new RuntimeException("Catedra no encontrada para el ID: " + catedraId));

        double precioBase = catedra.getCourse().getPrice();  // o getPrecio()
        double descuento = catedra.getPromotion() == null ? catedra.getPromotion() : 0;  // en porcentaje
        long precioFinal = Math.round(precioBase * (100 - descuento) / 100.0);

        double montoFinal = calcularMontoReintegro(LocalDate.now(), LocalDate.parse(catedra.getFechaInicio()), precioFinal);

        if (montoFinal == 0) {
            throw new RuntimeException("No está disponible el reembolso de este curso para esta fecha");
        }
        // 🔢 DATOS DINÁMICOS desde el payload
        String orderId = pago.getOrderId().toString();
        String parentTransactionId = pago.getTransactionId().toString();
        double refundAmount = Double.parseDouble(String.valueOf(montoFinal));

        // 🧱 Construcción del cuerpo
        Map<String, Object> request = Map.of(
                "language", "es",
                "command", "SUBMIT_TRANSACTION",
                "test", true,
                "merchant", Map.of(
                        "apiLogin", apiLogin,
                        "apiKey", apiKey
                ),
                "transaction", Map.of(
                        "order", Map.of(
                                "id", orderId
                        ),
                        "parentTransactionId", parentTransactionId,
                        "type", "REFUND",
                        "additionalValues", Map.of(
                                "TX_VALUE", Map.of(
                                        "value", refundAmount,
                                        "currency", currency
                                )
                        )
                )
        );

        // 📡 Envío del request
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        ObjectMapper mapper = new ObjectMapper();
        String json;
        try {
            json = mapper.writeValueAsString(request);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al serializar el JSON de reembolso", e);
        }

        System.out.println("➡️ Enviando reembolso parcial: \n" + json);
        registrarPago.devolucionRealizada(
                usuario,
                montoFinal,
                pago.getReferencia(),
                pago.getOrderId(),
                pago.getTransactionId()
        );
        HttpEntity<String> entity = new HttpEntity<>(json, headers);
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi";

        return restTemplate.postForEntity(url, entity, String.class);
    }
    public static double calcularMontoReintegro(LocalDate hoy, LocalDate inicioCurso, double montoCurso) {
        long diasHabiles = contarDiasHabiles(hoy, inicioCurso);

        if (hoy.isAfter(inicioCurso)) {
            return 0.0; // Curso ya empezó
        }

        if (diasHabiles >= 10) {
            return montoCurso; // 100%
        } else if (diasHabiles >= 1) {
            return montoCurso * 0.7; // 70%
        } else if (hoy.equals(inicioCurso)) {
            return montoCurso * 0.5; // 50%
        } else {
            return 0.0;
        }
    }
    private static long contarDiasHabiles(LocalDate desde, LocalDate hasta) {
        long dias = 0;
        LocalDate fecha = desde;

        while (fecha.isBefore(hasta)) {
            DayOfWeek dia = fecha.getDayOfWeek();
            if (dia != DayOfWeek.SATURDAY && dia != DayOfWeek.SUNDAY) {
                dias++;
            }
            fecha = fecha.plusDays(1);
        }

        return dias;
    }

}
