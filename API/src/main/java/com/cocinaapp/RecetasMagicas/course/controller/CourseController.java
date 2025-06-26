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

    @GetMapping("/latest/{n}")
    public List<CourseListItemDto> getLatestCourses(@PathVariable int n) {
        System.out.println("courses/latest/" + n);
        return courseService.getLatestCourses(n);
    }
}

