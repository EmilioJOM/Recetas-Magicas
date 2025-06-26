package com.cocinaapp.RecetasMagicas.course.controller;

import com.cocinaapp.RecetasMagicas.course.dto.CourseDetailDto;
import com.cocinaapp.RecetasMagicas.course.dto.CourseListItemDto;
import com.cocinaapp.RecetasMagicas.course.dto.CronogramaCursoConSedeDto;
import com.cocinaapp.RecetasMagicas.course.service.CourseService;
import com.cocinaapp.RecetasMagicas.course.service.CronogramaCursoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;
    private final CronogramaCursoService cronogramaCursoService;

    @GetMapping("/latest/{n}")
    public List<CourseListItemDto> getLatestCourses(@PathVariable int n) {
        System.out.println("courses/latest/" + n);
        return courseService.getLatestCourses(n);
    }

    @GetMapping("/{id}")
    public CourseDetailDto getCourseDetail(@PathVariable Long id) {
        System.out.println("courses/" + id);
        return courseService.getCourseDetail(id);
    }
    @GetMapping("/catedras/{id}")
    public List<CronogramaCursoConSedeDto> getCronogramasPorCurso(@PathVariable Long id) {
        return cronogramaCursoService.getCronogramasPorCurso(id);
    }
}

