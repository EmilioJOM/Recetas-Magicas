package com.cocinaapp.RecetasMagicas.pago.service;

import com.cocinaapp.RecetasMagicas.pago.model.Pago;
import com.cocinaapp.RecetasMagicas.pago.repository.PagoRepository;
import com.cocinaapp.RecetasMagicas.user.model.User;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RegistrarPago {

    private final PagoRepository pagoRepository;

    public void pagoPendiente(User usuario, Double monto, String referenceCode){
        Pago pago = new Pago();
        pago.setUsuarioEmail(usuario.getEmail());
        pago.setEstado("PENDIENTE");
        pago.setMonto(monto);
        pago.setReferencia(referenceCode); // el mismo que usás en PayU
        pago.setFechaRegistro(LocalDateTime.now());
        pagoRepository.save(pago);
    }

    public void pagoRealizado(String referenceCode, String orderId, String transactionId, String metodo){
        Pago pago = pagoRepository.findTopByReferenciaOrderByFechaRegistroDesc(referenceCode)
                .orElseThrow(() -> new RuntimeException("No se encontró pago con referencia: " + referenceCode));
        pago.setEstado("PAGADO");
        pago.setMetodo(metodo);
        pago.setOrderId(orderId);
        pago.setTransactionId(transactionId);
        pago.setFechaPago(LocalDateTime.now());

        pagoRepository.save(pago);
    }
    public void devolucionRealizada(User usuario, Double monto, String referenceCode, String orderId, String transactionId, String metodo){
        Pago pago = new Pago();
        LocalDateTime tiempoActual = LocalDateTime.now();
        pago.setUsuarioEmail(usuario.getEmail());
        pago.setEstado("DEVOLUCION");
        pago.setMonto(monto);
        pago.setReferencia(referenceCode);
        pago.setFechaRegistro(tiempoActual);
        pago.setOrderId(orderId);
        pago.setTransactionId(transactionId);
        pago.setFechaPago(tiempoActual);

        pagoRepository.save(pago);
    }

    public List<Pago> getPagos(String email) {
    List<Pago> pagos = pagoRepository.findByUsuarioEmail(email);
    if (pagos.isEmpty()) {
        throw new RuntimeException("No se encontraron pagos para: " + email);
    }
    return pagos;
    }
}
