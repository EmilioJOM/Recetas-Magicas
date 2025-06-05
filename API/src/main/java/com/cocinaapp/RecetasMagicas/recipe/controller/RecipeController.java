package com.cocinaapp.RecetasMagicas.recipe.controller;


import com.cocinaapp.RecetasMagicas.recipe.dto.RecipeCreateRequest;
import com.cocinaapp.RecetasMagicas.recipe.dto.RecipeDetailDto;
import com.cocinaapp.RecetasMagicas.recipe.dto.RecipeListItemDto;
import com.cocinaapp.RecetasMagicas.recipe.dto.RecipeModifiedRequestDto;
import com.cocinaapp.RecetasMagicas.recipe.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;
    private Authentication authentication;

    @GetMapping("/latest")
    public List<RecipeListItemDto> getLatestRecipes(@RequestParam(defaultValue = "3") int n) {
        return recipeService.getLatestRecipes(n);
    }

    @GetMapping("/{id}")
    public RecipeDetailDto getRecipeDetail(@PathVariable Long id) {
        return recipeService.getRecipeDetail(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> crearReceta(
            @RequestPart("data") RecipeCreateRequest request,
            @RequestPart("mainPhoto") MultipartFile mainPhoto,
            @RequestPart(value = "stepPhotos", required = false) List<MultipartFile> stepPhotos,
            Authentication authentication
    ) {
        String email = authentication.getName();
        recipeService.crearReceta(request, mainPhoto, stepPhotos, email);
        return ResponseEntity.ok("Receta creada exitosamente");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarReceta(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        recipeService.eliminarReceta(id, email);
        return ResponseEntity.ok("Receta eliminada correctamente.");
    }

    @PostMapping("/{id}/favorito")
    public ResponseEntity<?> marcarFavorito(@PathVariable Long id, @RequestParam String userEmail) {
        recipeService.marcarComoFavorito(id, userEmail);
        return ResponseEntity.ok("Receta marcada como favorita");
    }

    @DeleteMapping("/{id}/favorito")
    public ResponseEntity<?> desmarcarFavorito(@PathVariable Long id, @RequestParam String userEmail) {
        recipeService.desmarcarComoFavorito(id, userEmail);
        return ResponseEntity.ok("Receta desmarcada como favorita");
    }
    @PostMapping("/{id}/modified")
    public ResponseEntity<?> guardarRecetaModificada(
            @PathVariable Long id,
            @RequestBody RecipeModifiedRequestDto dto,
            Authentication authentication
    ) {
        String email = authentication.getName();
        recipeService.guardarRecetaModificada(id, dto.getPortions(), email);
        return ResponseEntity.ok("Receta modificada y guardada correctamente");
    }



}
