package com.cocinaapp.RecetasMagicas.search.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CursoListadoDto {
    private Long id;
    private String title;
    private String description;
    private String mainPhoto;
    private String duration;
    private String modality;
    private Double price;
}