package com.cocinaapp.RecetasMagicas.search.dto;

import com.cocinaapp.RecetasMagicas.recipe.model.Recipe;
import com.cocinaapp.RecetasMagicas.course.model.Course;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchResultDto {
    private String tipo;
    private Long id;
    private String titulo;
    private String descripcion;
    private String portada;
    private String inicio;
    private String modalidad;
    private String sede;
    private Double precio;
    private Integer likes;
    private String autorAlias;
    private String tipoReceta;

}
