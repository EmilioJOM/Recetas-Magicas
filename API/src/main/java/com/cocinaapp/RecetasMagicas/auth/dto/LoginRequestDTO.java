package com.cocinaapp.RecetasMagicas.auth.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {
    private String email;
    private String password;
    private boolean rememberMe;
}
