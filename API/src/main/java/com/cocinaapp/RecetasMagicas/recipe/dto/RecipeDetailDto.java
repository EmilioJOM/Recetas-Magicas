package com.cocinaapp.RecetasMagicas.recipe.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RecipeDetailDto {
    private Long id;
    private String title;
    private String description;
    private Integer servings;
    private String experienceLevel;
    private String mainPhoto;
    private String authorAlias;
    private LocalDateTime createdAt;
    private List<IngredientDto> ingredients;
    private List<StepDto> steps;
}

