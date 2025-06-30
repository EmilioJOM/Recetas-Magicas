package com.cocinaapp.RecetasMagicas.pago.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "pagos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usuarioEmail;

    private String metodo; // "ONLINE" o "EFECTIVO"

    private String estado; // "PENDIENTE" o "PAGADO"

    private String orderId; // Devuelto por PayU

    private String transactionId; // Devuelto por PayU

    private LocalDateTime fechaPago;
    private LocalDateTime fechaRegistro;

    private double monto;

    private String referencia; // referenceCode de PayU

    // getters y setters
}