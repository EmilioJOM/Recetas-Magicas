package com.cocinaapp.RecetasMagicas.auth.dto;

import com.cocinaapp.RecetasMagicas.user.dto.UserInfoResponseDTO;
import com.cocinaapp.RecetasMagicas.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    private String token;
    private UserInfoResponseDTO user;
}
