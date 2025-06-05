package com.cocinaapp.RecetasMagicas.course.dto;

import lombok.*;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CourseListItemDto {
    private Long id;
    private String descripcion;
    private String modalidad;
    private Double precio;
    private String portada; // Si usás imagen principal
    private String duracion;
    // Agrega otros campos que te interese mostrar
}
