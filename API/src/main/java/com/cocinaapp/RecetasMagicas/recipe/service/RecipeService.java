package com.cocinaapp.RecetasMagicas.recipe.service;


import com.cocinaapp.RecetasMagicas.recipe.dto.*;
import com.cocinaapp.RecetasMagicas.recipe.model.*;
import com.cocinaapp.RecetasMagicas.recipe.repository.RecipeRepository;
import com.cocinaapp.RecetasMagicas.user.model.User;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;

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
                                .instruction(s.getInstruction())
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
    public void crearReceta(
            RecipeCreateRequest dto,
            MultipartFile mainPhoto,
            List<MultipartFile> stepPhotos,
            String emailUsuario
    ) {
        User user = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Validar unicidad de nombre de receta para este usuario
        if (recipeRepository.existsByTitleAndAuthor(dto.getTitle(), user)) {
            throw new IllegalArgumentException("Ya existe una receta con ese nombre para tu usuario.");
        }

        Recipe receta = new Recipe();
        // Guardar foto principal
        if (mainPhoto != null && !mainPhoto.isEmpty()) {
            String mainPhotoPath = guardarArchivo(mainPhoto, "uploads/recetas/", "principal_" + System.currentTimeMillis());
            receta.setMainPhoto(mainPhotoPath);
        } else {
            // Si querés que quede null, esto alcanza (o podés setear un path de imagen default)
            receta.setMainPhoto(null); // o, por ejemplo: "uploads/recetas/placeholder.jpg"
        }

        // Crear entidad receta
        receta.setTitle(dto.getTitle());
        receta.setDescription(dto.getDescription());
        receta.setServings(dto.getServings());
        receta.setAuthor(user);
        receta.setStatus(RecipeStatus.APROBADA); // La receta queda publicada automáticamente

        // Ingredientes
        List<RecipeIngredient> ingredientes = new ArrayList<>();
        for (IngredientDto i : dto.getIngredients()) {
            Ingredient ingrediente = new Ingredient();
            ingrediente.setDetail(i.getDetail());
            // ingredienteRepository.save(ingrediente); // Si lo necesitas persistente

            RecipeIngredient ri = new RecipeIngredient();
            ri.setCantidad(i.getQuantity());
            ri.setUnidad(i.getUnit());
            ri.setObservaciones(i.getObservations());
            ri.setIngredient(ingrediente);
            ri.setRecipe(receta);
            ingredientes.add(ri);
        }
        receta.setIngredientesUtilizados(ingredientes);

        // Pasos
        List<Step> steps = new ArrayList<>();
        for (int idx = 0; idx < dto.getSteps().size(); idx++) {
            StepDto stepDto = dto.getSteps().get(idx);
            Step step = new Step();
            step.setNroPaso(idx + 1);
            step.setInstruction(stepDto.getInstruction());
            step.setRecipe(receta);

            List<StepMedia> mediaList = new ArrayList<>();
            // Guardar foto si viene
            if (stepPhotos != null && stepPhotos.size() > idx && stepPhotos.get(idx) != null && !stepPhotos.get(idx).isEmpty()) {
                String stepPhotoPath = guardarArchivo(stepPhotos.get(idx), "uploads/recetas/", "step_" + idx + "_" + System.currentTimeMillis());
                StepMedia media = StepMedia.builder()
                        .tipoContenido("foto")
                        .extension(getExtension(stepPhotos.get(idx).getOriginalFilename()))
                        .urlContenido(stepPhotoPath)
                        .step(step)
                        .build();
                mediaList.add(media);
            }
            // Puedes agregar videos aquí también si tienes.

            step.setMedia(mediaList);
            steps.add(step);
        }
        receta.setSteps(steps);

        // Guardar receta en la base
        recipeRepository.save(receta);
    }
    private String guardarArchivo(MultipartFile archivo, String carpeta, String nombre) {
        try {
            Files.createDirectories(Paths.get(carpeta));
            String path = carpeta + nombre + "_" + archivo.getOriginalFilename();
            archivo.transferTo(new File(path));
            return path;
        } catch (IOException e) {
            throw new RuntimeException("No se pudo guardar el archivo", e);
        }
    }
    private String getExtension (String filename) {
        if (filename == null) return "";
        int dot = filename.lastIndexOf(".");
        return (dot >= 0) ? filename.substring(dot + 1) : "";
    }
    public void eliminarReceta(Long recipeId, String emailUsuario) {
        User user = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Recipe receta = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));
        if (!receta.getAuthor().getId().equals(user.getId())) {
            throw new RuntimeException("No autorizado para eliminar esta receta.");
        }
        recipeRepository.delete(receta);
    }
    public void marcarComoFavorito(Long recipeId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));

        user.getFavoritos().add(recipe);
        userRepository.save(user);
    }

    public void desmarcarComoFavorito(Long recipeId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));

        user.getFavoritos().remove(recipe);
        userRepository.save(user);
    }

    public void marcarRecetaComoModificada(Long recetaId, String emailUsuario) {
        User user = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!user.getRecetasModificadas().contains(recetaId)) {
            user.getRecetasModificadas().add(recetaId);
            userRepository.save(user);
        }
    }



}