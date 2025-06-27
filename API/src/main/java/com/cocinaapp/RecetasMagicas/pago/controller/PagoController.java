package com.cocinaapp.RecetasMagicas.pago.controller;

import com.cocinaapp.RecetasMagicas.pago.dto.CardTokenRequest;
import com.cocinaapp.RecetasMagicas.pago.service.MercadoPagoTokenService;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/mp")
public class PagoController {

    @Autowired
    private MercadoPagoTokenService mpService;



    @PostMapping("/create-token")
    public Map<String, String> createToken(@RequestBody CardTokenRequest request) {
        String token = mpService.createCardToken(request);
        return Map.of("card_token", token);
    }


}
