package com.cocinaapp.RecetasMagicas.recipe.dto;

import lombok.*;

import java.util.ArrayList;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RecipeCreate3Request {
    private int id;

    private ArrayList<StepDto> steps;
}
