package com.cocinaapp.RecetasMagicas.search.controller;

import com.cocinaapp.RecetasMagicas.recipe.dto.RecipeListItemDto;
import com.cocinaapp.RecetasMagicas.search.dto.*;
import com.cocinaapp.RecetasMagicas.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;

    @PostMapping("/receta")
    public List<RecipeListItemDto> buscarRecetas(
            @RequestBody FiltroBusquedaRecetaDto filtros,
            Authentication authentication
    ) {
        System.out.println("POST /search/receta");
        String email = (authentication != null) ? authentication.getName() : null;
        return searchService.buscarRecetas(filtros, email);
    }

    @PostMapping("/curso")
    public List<CursoListadoDto> buscarCursos(
            @RequestBody FiltroBusquedaCursoDto filtros,
            Authentication authentication
    ) {
        System.out.println("POST /search/curso");
        String email = authentication != null ? authentication.getName() : null;
        return searchService.buscarCursos(filtros, email);
    }

}
