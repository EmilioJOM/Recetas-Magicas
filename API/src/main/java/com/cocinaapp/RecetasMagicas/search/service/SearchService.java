package com.cocinaapp.RecetasMagicas.search.service;

import com.cocinaapp.RecetasMagicas.recipe.repository.RecipeRepository;
import com.cocinaapp.RecetasMagicas.course.repository.CourseRepository;
import com.cocinaapp.RecetasMagicas.search.dto.SearchResultDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final RecipeRepository recipeRepository;
    private final CourseRepository courseRepository;

    public List<SearchResultDto> search(String query, String filter, Long userId) {
        List<SearchResultDto> results = new ArrayList<>();

        // Buscar recetas
        if (filter == null || filter.equals("favoritos") || filter.equals("modificados")) {
            // Si tenés favoritos/modificados en backend, filtrá por eso y por usuario
            // Ejemplo básico: buscar por nombre o descripción
            recipeRepository.findByQueryAndFilter(query, filter, userId).forEach(recipe -> {
                results.add(SearchResultDto.builder()
                        .tipo("receta")
                        .titulo(recipe.getTitle())
                        .portada(recipe.getMainPhoto())
                        .inicio(null)
                        .likes(recipe.getLikes()) // o el campo que tengas
                        .build());
            });
        }

        // Buscar cursos
        if (filter == null || filter.equals("cursos")) {
            courseRepository.findByQuery(query).forEach(course -> {
                results.add(SearchResultDto.builder()
                        .tipo("curso")
                        .titulo(course.getTitle())
                        .portada(course.getMainPhoto())
                        .inicio(course.getDateStart().toString())
                        .likes(null)
                        .build());
            });
        }

        return results;
    }
}
