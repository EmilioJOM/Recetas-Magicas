package com.cocinaapp.RecetasMagicas.recipe.dto;

import lombok.*;

@Builder
@Getter @Setter @NoArgsConstructor
@AllArgsConstructor
public class StepMediaDto {
    private String tipoContenido;
    private String extension;
    private String urlContenido;
}