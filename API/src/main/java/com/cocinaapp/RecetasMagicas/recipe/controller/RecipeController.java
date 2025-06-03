package com.cocinaapp.RecetasMagicas.recipe.controller;


import com.cocinaapp.RecetasMagicas.recipe.dto.RecipeDetailDto;
import com.cocinaapp.RecetasMagicas.recipe.dto.RecipeListItemDto;
import com.cocinaapp.RecetasMagicas.recipe.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping("/latest")
    public List<RecipeListItemDto> getLatestRecipes(@RequestParam(defaultValue = "3") int n) {
        return recipeService.getLatestRecipes(n);
    }

    @GetMapping("/{id}")
    public RecipeDetailDto getRecipeDetail(@PathVariable Long id) {
        return recipeService.getRecipeDetail(id);
    }
    
}
