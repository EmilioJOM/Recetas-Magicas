package com.cocinaapp.RecetasMagicas.user.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangeRequestDTO {
    private String newPassword;
}
