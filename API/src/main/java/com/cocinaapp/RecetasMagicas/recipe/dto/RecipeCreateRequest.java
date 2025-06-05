package com.cocinaapp.RecetasMagicas.recipe.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RecipeCreateRequest {
    private String title;
    private String description;
    private Integer servings;
    private List<IngredientDto> ingredients;
    private List<StepDto> steps;
}
