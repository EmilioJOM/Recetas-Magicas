package com.cocinaapp.RecetasMagicas.search.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SearchResultDto {
    private String tipo;      // "receta" o "curso"
    private String titulo;
    private String portada;   // mainPhoto
    private String inicio;    // solo si es curso (fecha de inicio), sino null
    private Integer likes;    // solo si es receta, sino null
}
