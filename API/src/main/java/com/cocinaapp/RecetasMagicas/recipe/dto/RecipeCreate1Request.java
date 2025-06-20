package com.cocinaapp.RecetasMagicas.recipe.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RecipeCreate1Request {
    private String title;
    private String description;
    private Integer servings;
    private Long tipoId;
}
