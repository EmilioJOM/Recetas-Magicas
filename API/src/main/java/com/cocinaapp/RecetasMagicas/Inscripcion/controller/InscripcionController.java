package com.cocinaapp.RecetasMagicas.Inscripcion.controller;

import com.cocinaapp.RecetasMagicas.Inscripcion.service.InscripcionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inscripciones")
@RequiredArgsConstructor
public class InscripcionController {

    private final InscripcionService inscripcionService;

    @PostMapping("/{idCronograma}")
    public ResponseEntity<?> inscribirse(
            @PathVariable Long idCronograma,
            Authentication authentication) {
        System.out.print("/inscripciones/"+idCronograma.toString());
        String email = authentication.getName();
        inscripcionService.inscribirse(idCronograma, email);
        return ResponseEntity.ok("Inscripción exitosa");
    }
}
