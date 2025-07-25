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
    public ResponseEntity<LoginResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        System.out.println("register");
        LoginResponseDTO response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        System.out.println("login");
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/validate")
    public ResponseEntity<AuthResponseDTO> validate(@RequestBody ValidationRequestDTO request) {
        System.out.println("validate");
        authService.validate(request);
        return ResponseEntity.ok(new AuthResponseDTO("","Alias y email disponibles"));
    }

    @PostMapping("/validateCode")
    public ResponseEntity<AuthResponseDTO> validateCode(@RequestBody CodeValidationRequestDTO request) {
        System.out.println("validateCode");
        authService.validateCode(request);
        return ResponseEntity.ok(new AuthResponseDTO("","Código válido"));
    }


    @PostMapping("/recoverPassword1")
    public ResponseEntity<AuthResponseDTO> recoverPassword(@RequestBody PasswordRecoveryRequest1DTO request) {
        System.out.println("recoverPassword1");
        authService.sendRecoveryCode(request);
        return ResponseEntity.ok(new AuthResponseDTO("","Código enviado por correo"));
    }
    @PostMapping("/recoverPassword2")
    public ResponseEntity<AuthResponseDTO> recoverPassword(@RequestBody CodeValidationRequestDTO request) {
        System.out.println("recoverPassword2");
        String token = authService.validateCodeRecoveryPassword(request);
        return ResponseEntity.ok(new AuthResponseDTO(token,"Codigo valido"));
    }



}