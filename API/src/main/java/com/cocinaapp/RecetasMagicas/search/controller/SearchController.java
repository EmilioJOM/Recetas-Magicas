package com.cocinaapp.RecetasMagicas.search.controller;

import com.cocinaapp.RecetasMagicas.search.dto.SearchResultDto;
import com.cocinaapp.RecetasMagicas.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;

    @GetMapping
    public List<SearchResultDto> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String filter,
            @RequestParam(required = false) Long userId // si necesitás el usuario logueado
    ) {
        return searchService.search(query, filter, userId);
    }
}
