package com.cocinaapp.RecetasMagicas.course.service;

import com.cocinaapp.RecetasMagicas.course.dto.CourseListItemDto;
import com.cocinaapp.RecetasMagicas.course.model.Course;
import com.cocinaapp.RecetasMagicas.course.repository.CourseRepository;
import lombok.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;

    public List<CourseListItemDto> getLatestCourses(int n) {
        List<Course> courses = courseRepository.findAllByOrderByIdDesc(PageRequest.of(0, n));
        return courses.stream()
                .map(c -> CourseListItemDto.builder()
                        .id(c.getId())
                        .descripcion(c.getDescription())
                        .modalidad(c.getModality())
                        .precio(c.getPrice())
                        .portada(c.getMainPhoto())
                        .duracion(c.getDateStart())
                        .build())
                .toList();
    }
}
