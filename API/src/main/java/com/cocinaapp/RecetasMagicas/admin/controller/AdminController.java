package com.cocinaapp.RecetasMagicas.admin.controller;

import com.cocinaapp.RecetasMagicas.course.dto.CourseCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.dto.CronogramaCursoCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.dto.SedeCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.course.model.Sede;
import com.cocinaapp.RecetasMagicas.course.repository.CourseRepository;
import com.cocinaapp.RecetasMagicas.course.repository.CronogramaCursoRepository;
import com.cocinaapp.RecetasMagicas.course.repository.SedeRepository;
import com.cocinaapp.RecetasMagicas.course.service.CourseService;
import com.cocinaapp.RecetasMagicas.course.service.CronogramaCursoService;
import com.cocinaapp.RecetasMagicas.course.service.SedeService;
import com.cocinaapp.RecetasMagicas.recipe.repository.RecipeRepository;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final SedeRepository sedeRepository;
    private final CronogramaCursoRepository cronogramaCursoRepository;

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        System.out.println("DELETE /admin/user/" + id);
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return ResponseEntity.ok("Usuario eliminado correctamente");
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/course/{id}")
    public ResponseEntity<?> eliminarCurso(@PathVariable Long id) {
        System.out.println("DELETE /admin/course/" + id);
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return ResponseEntity.ok("Curso eliminado correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/recipe/{id}")
    public ResponseEntity<?> eliminarReceta(@PathVariable Long id) {
        System.out.println("DELETE /admin/recipe/" + id);
        if (recipeRepository.existsById(id)) {
            recipeRepository.deleteById(id);
            return ResponseEntity.ok("Receta eliminada correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/sede/{id}")
    public ResponseEntity<?> eliminarSede(@PathVariable Long id) {
        System.out.println("DELETE /admin/sede/" + id);
        if (sedeRepository.existsById(id)) {
            sedeRepository.deleteById(id);
            return ResponseEntity.ok("sede eliminada correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/Catedra/{id}")
    public ResponseEntity<?> eliminarCatedra(@PathVariable Long id) {
        System.out.println("DELETE /admin/Catedra/" + id);
        if (cronogramaCursoRepository.existsById(id)) {
            cronogramaCursoRepository.deleteById(id);
            return ResponseEntity.ok("catedra eliminada correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/courses")
    public ResponseEntity<?> crearCurso(
            @RequestPart("data") CourseCreateRequestDto dto,
            @RequestPart(value = "mainPhoto", required = false) MultipartFile mainPhoto
    )  {
        System.out.println("POST /admin/courses");
        courseService.crearCurso(dto, mainPhoto);
        return ResponseEntity.ok("Curso creado correctamente");
    }

    @PostMapping("/sede")
    public ResponseEntity<Sede> crearSede(
            @RequestPart("data") SedeCreateRequestDto dto,
            @RequestPart(value = "mainPhoto", required = false) MultipartFile mainPhoto
    ){
        System.out.println("POST /admin/sede");
        Sede sede = sedeService.crearSede(dto, mainPhoto);
        return ResponseEntity.ok(sede);
    }

    @PostMapping("/catedra")
    public ResponseEntity<CronogramaCurso> crearCronogramaCurso(@RequestBody CronogramaCursoCreateRequestDto dto) {
        System.out.println("POST /admin/catedra");
        CronogramaCurso cronograma = cronogramaCursoService.crearCronogramaCurso(dto);
        return ResponseEntity.ok(cronograma);
    }



}