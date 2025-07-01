package com.cocinaapp.RecetasMagicas.Inscripcion.controller;

import com.cocinaapp.RecetasMagicas.Inscripcion.dto.InscripcionResponseDto;
import com.cocinaapp.RecetasMagicas.Inscripcion.service.InscripcionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inscripciones")
@RequiredArgsConstructor
public class InscripcionController {

    private final InscripcionService inscripcionService;

    @PostMapping("/{idCronograma}")
    public InscripcionResponseDto inscribirse(
            @PathVariable Long idCronograma,
            Authentication authentication) {
        System.out.print("/inscripciones/"+idCronograma.toString());
        String email = authentication.getName();
        return inscripcionService.inscribirse(idCronograma, email);
    }

    @DeleteMapping("/{idCronograma}")
    public ResponseEntity<?> darBaja(
            @PathVariable Long idCronograma,
            Authentication authentication) {
        System.out.print("DELETE /inscripciones/"+idCronograma.toString());
        String email = authentication.getName();
        inscripcionService.darBaja(email, idCronograma);

        return ResponseEntity.ok("BAJA exitosa");
    }
}
