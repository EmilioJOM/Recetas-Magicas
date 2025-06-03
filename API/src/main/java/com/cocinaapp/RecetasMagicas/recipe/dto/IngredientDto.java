package com.cocinaapp.RecetasMagicas.recipe.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public
class IngredientDto {
    private double quantity;
    private String detail;
    private String unit;
    private String observations;
}
