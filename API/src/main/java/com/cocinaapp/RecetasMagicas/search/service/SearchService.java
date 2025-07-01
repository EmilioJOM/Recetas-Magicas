package com.cocinaapp.RecetasMagicas.search.service;

import com.cocinaapp.RecetasMagicas.course.model.Course;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.recipe.dto.RecipeListItemDto;
import com.cocinaapp.RecetasMagicas.recipe.model.Recipe;
import com.cocinaapp.RecetasMagicas.recipe.model.RecipeIngredient;
import com.cocinaapp.RecetasMagicas.recipe.model.RecipeStatus;
import com.cocinaapp.RecetasMagicas.recipe.repository.RecipeRepository;
import com.cocinaapp.RecetasMagicas.course.repository.CourseRepository;
import com.cocinaapp.RecetasMagicas.search.dto.*;
import com.cocinaapp.RecetasMagicas.user.model.User;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final CourseRepository courseRepository;
    public List<RecipeListItemDto> buscarRecetas(FiltroBusquedaRecetaDto filtro, String emailUsuario) {
        // Obtener usuario si está logueado
        final User user;
        if (emailUsuario != null) {
            user = userRepository.findByEmail(emailUsuario)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        } else { user = null;}

        List<Recipe> recetas = recipeRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Texto libre (en título o descripción)
            if (filtro.getQuery() != null && !filtro.getQuery().isBlank()) {
                Predicate titulo = cb.like(cb.lower(root.get("title")), "%" + filtro.getQuery().toLowerCase() + "%");
                Predicate descripcion = cb.like(cb.lower(root.get("description")), "%" + filtro.getQuery().toLowerCase() + "%");
                predicates.add(cb.or(titulo, descripcion));
            }

            // Filtro por tipo
            if (filtro.getTipoReceta() != null) {
                Join<?, ?> tipoJoin = root.join("tipo");
                predicates.add(cb.equal(cb.lower(tipoJoin.get("descripcion")), filtro.getTipoReceta().toLowerCase()));
            }

            // Porciones
            if (filtro.getPorciones() != null) {
                predicates.add(cb.equal(root.get("servings"), filtro.getPorciones()));
            }

            // Estado (aprobada, pendiente, etc)
            if (filtro.getEstado() != null) {
                predicates.add(cb.equal(root.get("status"), RecipeStatus.valueOf(filtro.getEstado().toUpperCase())));
            }

            // Fechas
            if (filtro.getFechaDesde() != null) {
                LocalDateTime desde = LocalDate.parse(filtro.getFechaDesde()).atStartOfDay();
                predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"), desde));
            }
            if (filtro.getFechaHasta() != null) {
                LocalDateTime hasta = LocalDate.parse(filtro.getFechaHasta()).atTime(23, 59, 59);
                predicates.add(cb.lessThanOrEqualTo(root.get("createdAt"), hasta));
            }

            // Si es visitante, solo mostrar APROBADAS
            if (user == null) {
                predicates.add(cb.equal(root.get("status"), RecipeStatus.APROBADA));
            }

            // Si es usuario autenticado y pide favoritos o modificadas
            if (user != null) {
                if (Boolean.TRUE.equals(filtro.getFavoritos())) {
                    Set<Long> recetasFavoritasIds = user.getFavoritos()
                            .stream()
                            .map(Recipe::getId)
                            .collect(Collectors.toSet());
                    if (!recetasFavoritasIds.isEmpty()) {
                        predicates.add(root.get("id").in(recetasFavoritasIds));
                    } else {
                        // No hay favoritos, devolver lista vacía directamente
                        return cb.disjunction(); // equivalente a WHERE false
                    }
                }
                if (Boolean.TRUE.equals(filtro.getModificados())) {
                    predicates.add(cb.equal(root.get("author").get("id"), user.getId())); // si modificados == de él
                    // opcional: agregá una columna isModified en Recipe si querés más precisión
                }
            }

            // Autores
            if (filtro.getAutorId() != null) {
                predicates.add(cb.equal(root.get("author").get("id"), filtro.getAutorId()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        });

        return recetas.stream().map(r -> RecipeListItemDto.builder()
                .id(r.getId())
                .title(r.getTitle())
                .description(r.getDescription())
                .mainPhoto(r.getMainPhoto())
                .experienceLevel(r.getExperienceLevel().name())
                .authorAlias(r.getAuthor().getAlias())
                .servings(r.getServings())
                .createdAt(r.getCreatedAt())
                .build()).toList();
    }


    public List<CursoListadoDto> buscarCursos(FiltroBusquedaCursoDto filtro, String emailUsuario) {
        List<Course> cursos = courseRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filtro.getQuery() != null && !filtro.getQuery().isBlank()) {
                Predicate titulo = cb.like(cb.lower(root.get("title")), "%" + filtro.getQuery().toLowerCase() + "%");
                Predicate descripcion = cb.like(cb.lower(root.get("description")), "%" + filtro.getQuery().toLowerCase() + "%");
                predicates.add(cb.or(titulo, descripcion));
            }

            if (filtro.getModalidad() != null) {
                predicates.add(cb.equal(cb.lower(root.get("modality")), filtro.getModalidad().toLowerCase()));
            }

            if (filtro.getPrecioMinimo() != null) {
                predicates.add(cb.ge(root.get("price"), filtro.getPrecioMinimo()));
            }

            if (filtro.getPrecioMaximo() != null) {
                predicates.add(cb.le(root.get("price"), filtro.getPrecioMaximo()));
            }

            if (filtro.getDuracion() != null) {
                predicates.add(cb.equal(cb.lower(root.get("duration")), filtro.getDuracion().toLowerCase()));
            }

            if (filtro.getContenidos() != null && !filtro.getContenidos().isEmpty()) {
                Join<Course, String> contenidoJoin = root.join("contenidos");
                predicates.add(contenidoJoin.in(filtro.getContenidos()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        });

        return cursos.stream().map(c -> CursoListadoDto.builder()
                .id(c.getId())
                .title(c.getTitle())
                .description(c.getDescription())
                .mainPhoto(c.getMainPhoto())
                .duration(c.getDuration())
                .modality(c.getModality())
                .price(c.getPrice())
                .build()).toList();
    }
}
