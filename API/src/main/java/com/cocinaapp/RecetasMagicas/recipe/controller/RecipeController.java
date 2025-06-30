package com.cocinaapp.RecetasMagicas.recipe.controller;


import com.cocinaapp.RecetasMagicas.recipe.dto.*;
import com.cocinaapp.RecetasMagicas.recipe.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;
    private Authentication authentication;

    @GetMapping("/latest/{n}")
    public List<RecipeListItemDto> getLatestRecipes(@PathVariable int n) {
        System.out.println("recipe/latest/" + n);
        return recipeService.getLatestRecipes(n);
    }
    @GetMapping
    public List<RecipeListItemDto> getRecipes() {
        System.out.println("GET recipe");
        return recipeService.getRecipes();
    }

    @GetMapping("/{id}")
    public RecipeDetailDto getRecipeDetail(@PathVariable Long id) {
        System.out.println("recipe{"+id.toString()+"}");
        return recipeService.getRecipeDetail(id);
    }

    @PostMapping(value = "/crearReceta1",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> crearReceta(
            @RequestPart("data") RecipeCreate1Request request,
            @RequestPart(value = "mainPhoto", required = false) MultipartFile mainPhoto,
            Authentication authentication
    ) {
        System.out.println("POST recipe/crearReceta1");
        String email = authentication.getName();
        long id = recipeService.crearReceta1(request, mainPhoto, email); // retorna el ID
        return ResponseEntity.ok(Map.of("id", id));
    }

    @PostMapping("/crearReceta2/{id}")
    public ResponseEntity<?> crearReceta2(
            @PathVariable Long id,
            @RequestBody RecipeCreate2Request request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        recipeService.creaReceta2(id, request,email);
        return ResponseEntity.ok("Ingredientes agregados");
    }

    @PostMapping(value = "/crearReceta3/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> crearReceta3(
            @PathVariable Long id,
            @RequestPart("data") RecipeCreate3Request request,
            @RequestPart(value = "stepPhotos", required = false) List<MultipartFile> stepPhotos,
            Authentication authentication
    ) {
        String email = authentication.getName();
        recipeService.crearReceta3(id, request, stepPhotos,email);
        return ResponseEntity.ok("Pasos y fotos agregados");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarReceta(
            @PathVariable Long id,
            Authentication authentication
    ) {
        System.out.println("DELETE recipe/{"+id.toString()+"}");
        String email = authentication.getName();
        recipeService.eliminarReceta(id, email);
        return ResponseEntity.ok("Receta eliminada correctamente.");
    }

    @PostMapping("/{id}/favorito")
    public ResponseEntity<?> marcarFavorito(@PathVariable Long id, Authentication authentication) {
        System.out.println("POST recipe/{id}/favorite");
        String userEmail = authentication.getName();
        recipeService.marcarComoFavorito(id, userEmail);
        return ResponseEntity.ok("Receta marcada como favorita");
    }

    @DeleteMapping("/{id}/favorito")
    public ResponseEntity<?> desmarcarFavorito(@PathVariable Long id, Authentication authentication) {
        System.out.println("DELETE recipe/{id}/favorite");
        String userEmail = authentication.getName();
        recipeService.desmarcarComoFavorito(id, userEmail);
        return ResponseEntity.ok("Receta desmarcada como favorita");
    }
    @PostMapping("/{id}/modificada")
    public ResponseEntity<?> marcarRecetaComoModificada(
            @PathVariable Long id,
            Authentication authentication
    ) {
        System.out.println("POST recipe/{id}/modificada");
        String email = authentication.getName();
        recipeService.marcarRecetaComoModificada(id, email);
        return ResponseEntity.ok("Receta marcada como modificada");
    }





}
