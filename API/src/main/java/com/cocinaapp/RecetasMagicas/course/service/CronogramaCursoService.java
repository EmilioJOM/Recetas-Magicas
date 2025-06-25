package com.cocinaapp.RecetasMagicas.course.service;

import com.cocinaapp.RecetasMagicas.course.dto.CronogramaCursoCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.model.Course;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.course.model.Sede;
import com.cocinaapp.RecetasMagicas.course.repository.CourseRepository;
import com.cocinaapp.RecetasMagicas.course.repository.CronogramaCursoRepository;
import com.cocinaapp.RecetasMagicas.course.repository.SedeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CronogramaCursoService {
    private final CourseRepository courseRepository;
    private final SedeRepository sedeRepository;
    private final CronogramaCursoRepository cronogramaCursoRepository;

    public CronogramaCurso crearCronogramaCurso(CronogramaCursoCreateRequestDto dto) {
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        Sede sede = sedeRepository.findById(dto.getSedeId())
                .orElseThrow(() -> new RuntimeException("Sede no encontrada"));

        CronogramaCurso cronograma = CronogramaCurso.builder()
                .course(course)
                .sede(sede)
                .ubicacion(dto.getUbicacion())
                .promotion(dto.getPromotion())
                .fechaInicio(dto.getFechaInicio())
                .fechaFin(dto.getFechaFin())
                .vacantes(dto.getVacantes())
                .build();

        return cronogramaCursoRepository.save(cronograma);
    }
}
