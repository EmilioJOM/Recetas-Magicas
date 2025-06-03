package com.cocinaapp.RecetasMagicas.recipe.service;


import com.cocinaapp.RecetasMagicas.recipe.dto.*;
import com.cocinaapp.RecetasMagicas.recipe.model.Recipe;
import com.cocinaapp.RecetasMagicas.recipe.model.RecipeStatus;
import com.cocinaapp.RecetasMagicas.recipe.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageRequest;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;

    public List<RecipeListItemDto> getLatestRecipes(int n) {
        List<Recipe> recipes = recipeRepository.findByStatusOrderByIdDesc(RecipeStatus.APROBADA, PageRequest.of(0, n));
        return recipes.stream()
                .map(r -> RecipeListItemDto.builder()
                        .id(r.getId())
                        .title(r.getTitle())
                        .description(r.getDescription())
                        .servings(r.getServings())
                        .mainPhoto(r.getMainPhoto())
                        .authorAlias(r.getAuthor().getAlias())
                        .createdAt(r.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    public RecipeDetailDto getRecipeDetail(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));

        // Solo mostrar receta si está APROBADA (o podés controlar si el usuario logueado es el autor)
        if (recipe.getStatus() != RecipeStatus.APROBADA) {
            throw new RuntimeException("Receta no publicada");
        }

        return RecipeDetailDto.builder()
                .id(recipe.getId())
                .title(recipe.getTitle())
                .description(recipe.getDescription())
                .servings(recipe.getServings())
                .mainPhoto(recipe.getMainPhoto())
                .authorAlias(recipe.getAuthor().getAlias())
                .createdAt(recipe.getCreatedAt())
                .ingredients(recipe.getIngredientesUtilizados().stream()
                        .map(ri -> IngredientDto.builder()
                                .quantity(ri.getCantidad())
                                .unit(ri.getUnidad())
                                .detail(ri.getIngredient().getDetail())
                                .observations(ri.getObservaciones())
                                .build())
                        .collect(Collectors.toList()))
                .steps(recipe.getSteps().stream()
                        .map(s -> StepDto.builder()
                                .nroPaso(s.getNroPaso())
                                .texto(s.getTexto())
                                .media(s.getMedia().stream()
                                        .map(m -> StepMediaDto.builder()
                                                .tipoContenido(m.getTipoContenido())
                                                .extension(m.getExtension())
                                                .urlContenido(m.getUrlContenido())
                                                .build())
                                        .collect(Collectors.toList()))
                                .build())
                        .collect(Collectors.toList()))
                .build();

    }
}