package com.cocinaapp.RecetasMagicas.auth.controller;

import com.cocinaapp.RecetasMagicas.auth.dto.*;
import com.cocinaapp.RecetasMagicas.auth.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponseDTO("Usuario registrado"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO request) {

        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/validate")
    public ResponseEntity<AuthResponseDTO> validate(@RequestBody ValidationRequestDTO request) {
        authService.validate(request);
        return ResponseEntity.ok(new AuthResponseDTO("Alias y email disponibles"));
    }

    @PostMapping("/validate-code")
    public ResponseEntity<AuthResponseDTO> validateCode(@RequestBody CodeValidationRequestDTO request) {
        authService.validateCode(request);
        return ResponseEntity.ok(new AuthResponseDTO("Código válido"));
    }


    @PostMapping("/recover-password")
    public ResponseEntity<AuthResponseDTO> recoverPassword(@RequestBody PasswordRecoveryRequestDTO request) {
        authService.sendRecoveryCode(request);
        return ResponseEntity.ok(new AuthResponseDTO("Código enviado por correo"));
    }



}