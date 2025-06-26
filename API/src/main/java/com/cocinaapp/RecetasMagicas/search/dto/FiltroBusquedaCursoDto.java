package com.cocinaapp.RecetasMagicas.search.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FiltroBusquedaCursoDto {
    private String query;              // Texto libre en título o descripción
    private String modalidad;          // presencial, virtual, etc.
    private Double precioMinimo;
    private Double precioMaximo;
    private String duracion;           // duración exacta (ej: "4 meses")
    private List<String> contenidos;  // Contenidos que debe incluir
}