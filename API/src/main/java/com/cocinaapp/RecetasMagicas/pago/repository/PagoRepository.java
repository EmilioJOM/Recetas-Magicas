package com.cocinaapp.RecetasMagicas.pago.repository;

import com.cocinaapp.RecetasMagicas.pago.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    Optional<Pago> findByReferencia(String referencia);

    List<Pago> findByUsuarioEmail(String email); // ✅ campo exacto
    Optional<Pago> findTopByReferenciaOrderByFechaRegistroDesc(String referencia);

}