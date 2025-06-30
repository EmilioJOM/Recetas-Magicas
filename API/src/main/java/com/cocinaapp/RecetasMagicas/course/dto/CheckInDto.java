package com.cocinaapp.RecetasMagicas.course.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CheckInDto {
    private List<CardItemDto> MediosPago;
    private Long precio;
    private String sede;
    private String promocionSede;
    private Double descuentoCatedra;
    private String curso;
    private String fotoCurso;
    private Long catedraID;
}
