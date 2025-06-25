package com.cocinaapp.RecetasMagicas.admin.controller;

import com.cocinaapp.RecetasMagicas.course.dto.CourseCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.dto.CronogramaCursoCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.dto.SedeCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.course.model.Sede;
import com.cocinaapp.RecetasMagicas.course.repository.CourseRepository;
import com.cocinaapp.RecetasMagicas.course.service.CourseService;
import com.cocinaapp.RecetasMagicas.course.service.CronogramaCursoService;
import com.cocinaapp.RecetasMagicas.course.service.SedeService;
import com.cocinaapp.RecetasMagicas.recipe.repository.RecipeRepository;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final SedeService sedeService;
    private final CourseService courseService;
    private final CronogramaCursoService cronogramaCursoService;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final RecipeRepository recipeRepository;

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return ResponseEntity.ok("Usuario eliminado correctamente");
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/course/{id}")
    public ResponseEntity<?> eliminarCurso(@PathVariable Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return ResponseEntity.ok("Curso eliminado correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/recipe/{id}")
    public ResponseEntity<?> eliminarReceta(@PathVariable Long id) {
        if (recipeRepository.existsById(id)) {
            recipeRepository.deleteById(id);
            return ResponseEntity.ok("Receta eliminada correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/courses")
    public ResponseEntity<?> crearCurso(@RequestBody CourseCreateRequestDto dto) {
        courseService.crearCurso(dto);
        return ResponseEntity.ok("Curso creado correctamente");
    }

    @PostMapping("/sede")
    public ResponseEntity<Sede> crearSede(@RequestBody SedeCreateRequestDto dto) {
        Sede sede = sedeService.crearSede(dto);
        return ResponseEntity.ok(sede);
    }

    @PostMapping("/Catedra")
    public ResponseEntity<CronogramaCurso> crearCronogramaCurso(@RequestBody CronogramaCursoCreateRequestDto dto) {
        CronogramaCurso cronograma = cronogramaCursoService.crearCronogramaCurso(dto);
        return ResponseEntity.ok(cronograma);
    }



}