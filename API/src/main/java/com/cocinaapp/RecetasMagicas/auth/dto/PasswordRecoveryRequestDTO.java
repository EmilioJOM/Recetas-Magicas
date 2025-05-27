package com.cocinaapp.RecetasMagicas.auth.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordRecoveryRequestDTO {
    private String email;
}
