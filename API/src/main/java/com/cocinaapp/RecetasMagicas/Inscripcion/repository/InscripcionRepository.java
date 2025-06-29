package com.cocinaapp.RecetasMagicas.Inscripcion.repository;

import com.cocinaapp.RecetasMagicas.Inscripcion.model.Inscripcion;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {
    boolean existsByUsuarioAndCronograma(User usuario, CronogramaCurso cronograma);
}
