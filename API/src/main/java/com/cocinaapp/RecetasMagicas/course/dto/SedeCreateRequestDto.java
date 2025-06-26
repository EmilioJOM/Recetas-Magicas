package com.cocinaapp.RecetasMagicas.course.dto;

import lombok.*;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SedeCreateRequestDto {
    private String nombre;
    private String direccion;
    private String coordenadas;
    private String telefono;
    private String mail;
    private String whatsapp;
    private String tipoBonificacion;
    private String bonificacionCursos;
    private String tipoPromocion;
    private String promocionCursos;
    private int capacidadAlumnos;
}