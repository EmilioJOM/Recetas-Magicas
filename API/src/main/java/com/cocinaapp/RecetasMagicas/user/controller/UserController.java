package com.cocinaapp.RecetasMagicas.user.controller;

import ch.qos.logback.classic.Logger;
import com.cocinaapp.RecetasMagicas.user.dto.PasswordChangeRequestDTO;
import com.cocinaapp.RecetasMagicas.auth.service.AuthService;
import com.cocinaapp.RecetasMagicas.user.dto.UserResponseDTO;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
import com.cocinaapp.RecetasMagicas.user.service.AlumnoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final AlumnoService alumnoService;
    private Authentication authentication;


    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequestDTO request, Authentication authentication) {
        String email = authentication.getName();

        alumnoService.changePassword(email, request.getNewPassword());
        return ResponseEntity.ok(new UserResponseDTO("Contraseña actualizada con éxito"));
    }

    @PostMapping(value = "/dni", consumes = "multipart/form-data")
    public ResponseEntity<?> subirDni(
            @RequestParam("dniFrente") MultipartFile dniFrente,
            @RequestParam("dniDorso") MultipartFile dniDorso,
            @RequestParam("numeroTramite") String numeroTramite
    ) {
        String email = authentication.getName();
        alumnoService.registrarAlumno(email, dniFrente, dniDorso, numeroTramite);
        return ResponseEntity.ok("Fotos y número de trámite recibidos correctamente.");
    }
}
