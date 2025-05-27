package com.cocinaapp.RecetasMagicas.auth.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValidationRequestDTO {
    private String alias;
    private String email;
}
