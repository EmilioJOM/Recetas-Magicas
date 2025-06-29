package com.cocinaapp.RecetasMagicas.course.service;

import com.cocinaapp.RecetasMagicas.course.dto.CourseCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.dto.CourseDetailDto;
import com.cocinaapp.RecetasMagicas.course.dto.CourseListItemDto;
import com.cocinaapp.RecetasMagicas.course.model.Course;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.course.repository.CourseRepository;
import com.cocinaapp.RecetasMagicas.course.repository.CronogramaCursoRepository;
import com.cocinaapp.RecetasMagicas.util.GuardarImagenes;
import lombok.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final GuardarImagenes guardarImagenes;
    private final CronogramaCursoRepository cronogramaCursoRepository;

    public List<CourseListItemDto> getLatestCourses(int n) {
        List<Course> courses = courseRepository.findAllByOrderByIdDesc(PageRequest.of(0, n));
        return courses.stream()
                .map(c -> CourseListItemDto.builder()
                        .id(c.getId())
                        .title(c.getTitle())
                        .modalidad(c.getModality())
                        .precio(c.getPrice())
                        .portada(c.getMainPhoto())
                        .duracion(c.getDuration())
                        .build())
                .toList();
    }

    @Transactional
    public Course crearCurso(CourseCreateRequestDto dto, MultipartFile mainPhoto) {
        String mainPhotoPath = null;
        if (mainPhoto != null && !mainPhoto.isEmpty()) {
            mainPhotoPath = guardarImagenes.guardarArchivo(mainPhoto, "cursos", "principal");
        }

        Course course = Course.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .mainPhoto(mainPhotoPath)
                .contenidos(dto.getContenidos())
                .requirements(dto.getRequirements())
                .duration(dto.getDuration())
                .price(dto.getPrice())
                .modality(dto.getModality())
                .build();
        return courseRepository.save(course);
    }

    public CourseDetailDto getCourseDetail(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        return CourseDetailDto.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .mainPhoto(course.getMainPhoto())
                .contenidos(course.getContenidos())
                .requirements(course.getRequirements())
                .duration(course.getDuration())
                .price(course.getPrice())
                .modality(course.getModality())
                .build();
    }

}

