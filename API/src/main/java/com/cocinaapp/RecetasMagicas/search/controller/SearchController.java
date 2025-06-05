package com.cocinaapp.RecetasMagicas.search.controller;

import com.cocinaapp.RecetasMagicas.search.dto.SearchResultDto;
import com.cocinaapp.RecetasMagicas.search.dto.SearchFilterDto;
import com.cocinaapp.RecetasMagicas.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;

    @PostMapping("/search")
    public List<SearchResultDto> search(@RequestBody SearchFilterDto filtro) {
        return searchService.search(filtro);
    }

}
