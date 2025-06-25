package com.cocinaapp.RecetasMagicas.course.service;

import com.cocinaapp.RecetasMagicas.course.dto.CourseCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.dto.CourseListItemDto;
import com.cocinaapp.RecetasMagicas.course.model.Course;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.course.repository.CourseRepository;
import com.cocinaapp.RecetasMagicas.course.repository.CronogramaCursoRepository;
import lombok.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final CronogramaCursoRepository cronogramaCursoRepository;

    public List<CourseListItemDto> getLatestCourses(int n) {
        List<Course> courses = courseRepository.findAllByOrderByIdDesc(PageRequest.of(0, n));
        return courses.stream()
                .map(c -> CourseListItemDto.builder()
                        .id(c.getId())
                        .descripcion(c.getDescription())
                        .modalidad(c.getModality())
                        .precio(c.getPrice())
                        .portada(c.getMainPhoto())
                        .duracion(c.getDuration())
                        .build())
                .toList();
    }

    @Transactional
    public Course crearCurso(CourseCreateRequestDto dto) {
        Course course = Course.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .mainPhoto(dto.getMainPhoto())
                .contenidos(dto.getContenidos())
                .requirements(dto.getRequirements())
                .duration(dto.getDuration())
                .price(dto.getPrice())
                .modality(dto.getModality())
                .build();
        return courseRepository.save(course);
    }

}

