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

//    public static SearchResultDto fromCourse(Course course) {
//        String sede = null;
//        if (course.get() != null && !course.getLocations().isEmpty()) {
//            CronogramaCurso cc = course.getLocations().get(0);
//            if (cc.getSede() != null) {
//                sede = cc.getSede().getNombre();
//            }
//        }
//
//        return SearchResultDto.builder()
//                .tipo("curso")
//                .id(course.getId())
//                .titulo(course.getTitle())
//                .descripcion(course.getDescription())
//                .portada(course.getMainPhoto())
//                .inicio(course.getDateStart())
//                .modalidad(course.getModality())
//                .sede(sede)
//                .precio(course.getPrice())
//                .likes(null)
//                .autorAlias(null)
//                .tipoReceta(null)
//                .build();
//    }
//
//    public static SearchResultDto fromRecipe(Recipe recipe) {
//        return SearchResultDto.builder()
//                .tipo("receta")
//                .id(recipe.getId())
//                .titulo(recipe.getTitle())
//                .descripcion(recipe.getDescription())
//                .portada(recipe.getMainPhoto())
//                .inicio(null)
//                .modalidad(null)
//                .sede(null)
//                .precio(null)
//                .likes(recipe.getLikes() != null ? recipe.getLikes() : 0)
//                .autorAlias(recipe.getAuthor() != null ? recipe.getAuthor().getAlias() : null)
//                .tipoReceta(recipe.getTipo() != null ? recipe.getTipo().getDescripcion() : null)
//                .build();
//    }
}
