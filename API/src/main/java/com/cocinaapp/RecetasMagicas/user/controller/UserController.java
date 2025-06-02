package com.cocinaapp.RecetasMagicas.user.controller;

import com.cocinaapp.RecetasMagicas.user.dto.PasswordChangeRequestDTO;
import com.cocinaapp.RecetasMagicas.auth.service.AuthService;
import com.cocinaapp.RecetasMagicas.user.dto.UserResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final AuthService authService;

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequestDTO request, Authentication authentication) {
        String email = authentication.getName();

        authService.changePassword(email, request.getNewPassword());
        return ResponseEntity.ok(new UserResponseDTO("Contraseña actualizada con éxito"));
    }
}
