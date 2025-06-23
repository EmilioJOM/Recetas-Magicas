package com.cocinaapp.RecetasMagicas.recipe.dto;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RecipeListItemDto {
    private Long id;
    private String title;
    private String description;
    private Integer servings;
    private String experienceLevel;
    private String mainPhoto;
    private String authorAlias;
    private LocalDateTime createdAt;
}
