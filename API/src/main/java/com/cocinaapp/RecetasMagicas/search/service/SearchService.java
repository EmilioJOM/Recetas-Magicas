package com.cocinaapp.RecetasMagicas.search.service;

import com.cocinaapp.RecetasMagicas.course.model.Course;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.recipe.model.Recipe;
import com.cocinaapp.RecetasMagicas.recipe.model.RecipeIngredient;
import com.cocinaapp.RecetasMagicas.recipe.repository.RecipeRepository;
import com.cocinaapp.RecetasMagicas.course.repository.CourseRepository;
import com.cocinaapp.RecetasMagicas.search.dto.SearchResultDto;
import com.cocinaapp.RecetasMagicas.search.dto.SearchFilterDto;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final RecipeRepository recipeRepository;
    private final CourseRepository courseRepository;

    public List<SearchResultDto> search(SearchFilterDto filtro) {
        List<SearchResultDto> results = new ArrayList<>();

        // Recetas
        List<Recipe> recetas = recipeRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Texto libre (en nombre, descripción)
            if (filtro.getQuery() != null && !filtro.getQuery().isBlank()) {
                String likePattern = "%" + filtro.getQuery().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("title")), likePattern),
                        cb.like(cb.lower(root.get("description")), likePattern)
                ));
            }

            // Tipo de receta
            if (filtro.getTipoReceta() != null) {
                predicates.add(cb.equal(root.get("tipo").get("descripcion"), filtro.getTipoReceta()));
            }

            // Ingredientes incluidos
            if (filtro.getIngredientesIncluidos() != null && !filtro.getIngredientesIncluidos().isEmpty()) {
                Join<Recipe, RecipeIngredient> ingJoin = root.join("ingredientesUtilizados");
                predicates.add(ingJoin.get("ingredient").get("nombre").in(filtro.getIngredientesIncluidos()));
            }

            // Ingredientes excluidos
            if (filtro.getIngredientesExcluidos() != null && !filtro.getIngredientesExcluidos().isEmpty()) {
                Join<Recipe, RecipeIngredient> ingJoin = root.join("ingredientesUtilizados");
                predicates.add(cb.not(ingJoin.get("ingredient").get("nombre").in(filtro.getIngredientesExcluidos())));
            }

            // Porciones
            if (filtro.getPorciones() != null) {
                predicates.add(cb.equal(root.get("porciones"), filtro.getPorciones()));
            }

            // Valoración mínima
            if (filtro.getValoracionMinima() != null) {
                predicates.add(cb.ge(root.get("valoracionPromedio"), filtro.getValoracionMinima()));
            }

            // Autor
            if (filtro.getAutorId() != null) {
                predicates.add(cb.equal(root.get("author").get("id"), filtro.getAutorId()));
            }

            // Estado
            if (filtro.getEstado() != null) {
                predicates.add(cb.equal(root.get("status"), filtro.getEstado()));
            }

            // Favoritos, modificados, etc.: si se manejan en backend, agregar lógica
            // Orden
            // ...

            query.distinct(true);
            return cb.and(predicates.toArray(new Predicate[0]));
        });

        // Mapear a DTO
        for (Recipe r : recetas) {
            results.add(SearchResultDto.fromRecipe(r));
        }

        // Cursos
        List<Course> cursos = courseRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            // Texto libre
            if (filtro.getQuery() != null && !filtro.getQuery().isBlank()) {
                String likePattern = "%" + filtro.getQuery().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get("descripcion")), likePattern));
            }
            // Modalidad
            if (filtro.getModalidad() != null) {
                predicates.add(cb.equal(root.get("modalidad"), filtro.getModalidad()));
            }
            // Sede
            if (filtro.getSede() != null) {
                Join<Course, CronogramaCurso> croJoin = root.join("cronogramas");
                predicates.add(cb.equal(croJoin.get("sede").get("nombreSede"), filtro.getSede()));
            }
            // Precio máximo
            if (filtro.getPrecioMax() != null) {
                predicates.add(cb.le(root.get("precio"), filtro.getPrecioMax()));
            }
            // Vacantes mínimas
            if (filtro.getVacantesMin() != null) {
                Join<Course, CronogramaCurso> croJoin = root.join("cronogramas");
                predicates.add(cb.ge(croJoin.get("vacantesDisponibles"), filtro.getVacantesMin()));
            }
            // Mis cursos (si manejás inscripciones)
            // ...

            query.distinct(true);
            return cb.and(predicates.toArray(new Predicate[0]));
        });

        for (Course c : cursos) {
            results.add(SearchResultDto.fromCourse(c));
        }

        // Opcional: ordena y pagina resultados
        // results.sort(...);

        return results;
    }

}
