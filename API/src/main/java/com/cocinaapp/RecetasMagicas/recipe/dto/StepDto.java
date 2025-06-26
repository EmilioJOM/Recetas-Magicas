package com.cocinaapp.RecetasMagicas.recipe.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public
class StepDto {

    private Integer nroPaso;
    private String instruction;
    private boolean foto;
    private List<StepMediaDto> media;
}