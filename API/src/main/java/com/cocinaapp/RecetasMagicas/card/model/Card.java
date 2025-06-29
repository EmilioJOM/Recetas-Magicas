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
    private String tipo;
    private String emailMP;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User user;

    public int getMesExp(){
        String[] partes = vencimiento.split("/");  // divide en ["12", "26"]

        return Integer.parseInt(partes[0]);
    }
    public int getAnioExp(){
        String[] partes = vencimiento.split("/");  // divide en ["12", "26"]

        return 2000 + Integer.parseInt(partes[1]);
    }
}
