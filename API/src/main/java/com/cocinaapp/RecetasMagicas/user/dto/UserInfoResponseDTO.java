package com.cocinaapp.RecetasMagicas.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponseDTO {
    private Long Id ;
    private String Alia;
    private String Email;
    private String Role ;
    private boolean EsPago;
}
