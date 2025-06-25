package com.cocinaapp.RecetasMagicas.course.repository;

import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CronogramaCursoRepository extends JpaRepository<CronogramaCurso, Long> {
}