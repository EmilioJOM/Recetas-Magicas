package com.cocinaapp.RecetasMagicas.course.repository;

import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CronogramaCursoRepository extends JpaRepository<CronogramaCurso, Long> {
    List<CronogramaCurso> findByCourseId(Long courseId);

}