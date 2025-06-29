package com.cocinaapp.RecetasMagicas.pago.controller;

import com.cocinaapp.RecetasMagicas.pago.dto.CardTokenRequest;
import com.cocinaapp.RecetasMagicas.pago.dto.PagoRequestDto;
import com.cocinaapp.RecetasMagicas.pago.service.MercadoPagoTokenService;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/pagar")
public class PagoController {

    @Autowired
    private MercadoPagoTokenService mpService;



//    @PostMapping("/create-token")
//    public Map<String, String> createToken(@RequestBody CardTokenRequest request) {
//        String token = mpService.createCardToken(request);
//        return Map.of("card_token", token);
//    }

    @PostMapping("")
    public void createToken(@RequestBody PagoRequestDto request, Authentication authentication) {
        System.out.println("POST /pagar");
        String email = authentication.getName();

        mpService.pagar(request,email);
        return;
    }

}
