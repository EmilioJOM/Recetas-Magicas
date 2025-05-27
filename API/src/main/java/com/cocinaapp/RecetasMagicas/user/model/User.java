package com.cocinaapp.RecetasMagicas.user.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String alias;
    private String email;
    private String password;
    private String role = "USER";
}
