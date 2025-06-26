package com.cocinaapp.RecetasMagicas.course.dto;

import lombok.*;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CronogramaCursoConSedeDto {
    // Info de la catedra
    private Long id;
    private String fechaInicio;
    private String fechaFin;
    private Integer vacantes;
    private String ubicacion;
    private Double promotion;

    // Info de la sede
    private Long sedeId;
    private String sedeNombre;
    private String sedeDireccion;
    private String sedeCoordenadas;
    private String sedeMainPhoto;
}