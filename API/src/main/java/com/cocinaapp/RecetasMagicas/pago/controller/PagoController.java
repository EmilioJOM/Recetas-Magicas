package com.cocinaapp.RecetasMagicas.pago.controller;

import com.cocinaapp.RecetasMagicas.pago.dto.DevolucionRequestDto;
import com.cocinaapp.RecetasMagicas.pago.dto.PagoRequestDto;
import com.cocinaapp.RecetasMagicas.pago.model.Pago;
import com.cocinaapp.RecetasMagicas.pago.service.MercadoPagoTokenService;
import com.cocinaapp.RecetasMagicas.pago.service.PayU;
import com.cocinaapp.RecetasMagicas.pago.service.RegistrarPago;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pagar")
public class PagoController {

    @Autowired
    private MercadoPagoTokenService mpService;
    @Autowired
    private PayU payU;
    @Autowired
    private RegistrarPago registrarPago;




//    @PostMapping("/create-token")
//    public Map<String, String> createToken(@RequestBody CardTokenRequest request) {
//        String token = mpService.createCardToken(request);
//        return Map.of("card_token", token);
//    }

    @PostMapping("/mercadoPago")
    public void createToken(@RequestBody PagoRequestDto request, Authentication authentication) {
        System.out.println("POST /pagar");
        String email = authentication.getName();

        mpService.pagar(request,email);
        return;
    }

    @PostMapping("/payu")
    public ResponseEntity<String> pagarConPayU(@RequestBody PagoRequestDto request, Authentication authentication) throws Exception {
        System.out.println("POST /pagar/payu");
        String email = authentication.getName();

        return payU.pagar(request, email);
    }

    @PostMapping("/payu/devolucion")
    public ResponseEntity<String> devolucionConPayU(
            @RequestBody DevolucionRequestDto request,
            Authentication authentication
    ) throws Exception {
        System.out.println("POST /pagar/payu/devolucion");
        String email = authentication.getName();

        return payU.reembolsarParcial(request, email);
    }

    @GetMapping("/CC")
    public List<Pago> estadoPagos(Authentication authentication) throws Exception {
        System.out.println("POST /pagar/CC");
        String email = authentication.getName();

        return registrarPago.getPagos(email);
    }

}
