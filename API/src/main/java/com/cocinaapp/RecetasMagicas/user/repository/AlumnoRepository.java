package com.cocinaapp.RecetasMagicas.user.repository;

import com.cocinaapp.RecetasMagicas.user.model.Alumno;
import com.cocinaapp.RecetasMagicas.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

    Optional<Alumno> findByUser(User user);

    boolean existsByUser(User user);


    boolean existsByNumeroTramite(String numeroTramite);

    Optional<Alumno> findByNumeroTramite(String numeroTramite);

    // Otros métodos custom según necesidad...
}