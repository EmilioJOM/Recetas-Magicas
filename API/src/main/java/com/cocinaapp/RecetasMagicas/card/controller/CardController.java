package com.cocinaapp.RecetasMagicas.card.controller;

import com.cocinaapp.RecetasMagicas.card.dto.CardRegisterRequestDto;
import com.cocinaapp.RecetasMagicas.card.dto.CardResponseDto;
import com.cocinaapp.RecetasMagicas.card.service.CardService;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarjetas")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarTarjeta(
            @RequestBody CardRegisterRequestDto request,
            Authentication authentication) {
        String email = authentication.getName();
        cardService.registrarTarjeta(request, email);
        return ResponseEntity.ok("Tarjeta registrada exitosamente.");
    }

    @GetMapping
    public List<CardResponseDto> listarTarjetas(Authentication authentication) {
        String email = authentication.getName();
        return cardService.getCardsByUser(email);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarTarjeta(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        cardService.eliminarTarjeta(id, email);
        return ResponseEntity.ok("Tarjeta eliminada correctamente");
    }


}
