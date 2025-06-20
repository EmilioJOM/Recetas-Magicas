package com.cocinaapp.RecetasMagicas.recipe.dto;

import com.cocinaapp.RecetasMagicas.recipe.dto.IngredientDto;
import lombok.*;

import java.util.List;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RecipeCreate2Request {
    private int id;
    private List<IngredientDto> ingredients;

}
