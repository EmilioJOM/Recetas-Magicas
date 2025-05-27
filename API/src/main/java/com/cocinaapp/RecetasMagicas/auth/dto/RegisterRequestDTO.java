package com.cocinaapp.RecetasMagicas.auth.dto;
import jakarta.persistence.Entity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {
    private String alias;
    private String email;
    private String password;
    // Getters/Setters
}
