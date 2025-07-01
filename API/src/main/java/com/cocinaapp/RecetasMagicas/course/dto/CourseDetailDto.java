package com.cocinaapp.RecetasMagicas.course.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDetailDto {
    private Long id;
    private String title;
    private String description;
    private String mainPhoto;
    private List<String> contenidos;
    private String requirements;
    private String duration;
    private Double price;
    private String modality;
    private List<String> Elementos;
    private List<String> Cronograma;
}