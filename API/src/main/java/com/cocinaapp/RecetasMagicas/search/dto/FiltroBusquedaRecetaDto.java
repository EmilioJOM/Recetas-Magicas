package com.cocinaapp.RecetasMagicas.search.dto;

import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FiltroBusquedaRecetaDto {
    private String query; // texto libre
    private String tipoReceta;
    private List<String> ingredientesIncluidos;
    private List<String> ingredientesExcluidos;
    private Integer porciones;
    private Long autorId;
    private Boolean favoritos;
    private Boolean modificados;
    private Double valoracionMinima;
    private String estado;
    private String fechaDesde;
    private String fechaHasta;
}
