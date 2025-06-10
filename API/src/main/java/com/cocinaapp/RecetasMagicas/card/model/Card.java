package com.cocinaapp.RecetasMagicas.card.model;

import com.cocinaapp.RecetasMagicas.user.model.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;
    private String titular;
    private String vencimiento;
    private String codigo;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User user;
}
