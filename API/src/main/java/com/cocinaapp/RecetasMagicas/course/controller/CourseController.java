package com.cocinaapp.RecetasMagicas.course.controller;

import com.cocinaapp.RecetasMagicas.course.dto.CourseListItemDto;
import com.cocinaapp.RecetasMagicas.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @GetMapping("/latest")
    public List<CourseListItemDto> getLatestCourses(@RequestParam(defaultValue = "3") int n) {
        return courseService.getLatestCourses(n);
    }
}

