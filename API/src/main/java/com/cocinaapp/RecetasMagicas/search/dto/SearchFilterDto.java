package com.cocinaapp.RecetasMagicas.search.dto;

import com.cocinaapp.RecetasMagicas.course.model.Course;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.recipe.model.Recipe;
import  com.cocinaapp.RecetasMagicas.search.dto.SearchFilterDto;
import lombok.*;

import java.util.List;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SearchFilterDto {
    private String query;                  // texto libre
    private String tipoReceta;             // tipo de receta, por nombre o id
    private List<String> ingredientesIncluidos;
    private List<String> ingredientesExcluidos;
    private Integer porciones;             // o cantidadPersonas
    private Long autorId;
    private Boolean favoritos;
    private Boolean modificados;
    private Double valoracionMinima;
    private String estado;                 // "aprobada", "pendiente", etc.
    private String fechaDesde;
    private String fechaHasta;
    private String orden;                  // "fecha", "valoracion", "nombre", etc.
    // Para cursos
    private String modalidad;
    private String sede;
    private Double precioMax;
    private Integer vacantesMin;
    private Boolean misCursos;

}
