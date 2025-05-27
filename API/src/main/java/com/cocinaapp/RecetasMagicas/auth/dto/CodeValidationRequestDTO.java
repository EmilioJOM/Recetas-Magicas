package com.cocinaapp.RecetasMagicas.auth.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CodeValidationRequestDTO {
    private String email;
    private String code;
}
