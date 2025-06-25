package com.cocinaapp.RecetasMagicas.course.dto;

import lombok.*;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CronogramaCursoCreateRequestDto {
    private Long courseId;
    private Long sedeId;
    private String ubicacion;      // Aula/sala/opcional
    private Double promotion;      // Opcional
    private String fechaInicio;
    private String fechaFin;
    private Integer vacantes;
}
