package com.cocinaapp.RecetasMagicas.course.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CardItemDto {
    private Long id;
    private String tipo;
    private String numero;
}
