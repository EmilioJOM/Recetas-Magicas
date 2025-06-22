package com.cocinaapp.RecetasMagicas.recipe.service;


import com.cocinaapp.RecetasMagicas.recipe.dto.*;
import com.cocinaapp.RecetasMagicas.recipe.model.*;
import com.cocinaapp.RecetasMagicas.recipe.repository.IngredientRepository;
import com.cocinaapp.RecetasMagicas.recipe.repository.RecipeRepository;
import com.cocinaapp.RecetasMagicas.recipe.repository.RecipeTypeRepository;
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
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final RecipeTypeRepository recipeTypeRepository;
    private final IngredientRepository ingredientRepository;


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

    private String getBaseRecipeImageDir() {
//        String env = System.getenv("APP_ENV");
//        if (env != null && env.equalsIgnoreCase("production")) {
//            return "src/main/resources/static/uploads/recetas/";
//        }
        return "/uploads/recetas/";
    }


    public long crearReceta1(
            RecipeCreate1Request dto,
            MultipartFile mainPhoto,
            String emailUsuario
    ) {
        User user = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (recipeRepository.existsByTitleAndAuthor(dto.getTitle(), user)) {
            throw new IllegalArgumentException("Ya existe una receta con ese nombre para tu usuario.");
        }

        Recipe receta = new Recipe();

        // Guardar foto principal con ruta adecuada
        if (mainPhoto != null && !mainPhoto.isEmpty()) {
            String mainPhotoPath = guardarArchivo(mainPhoto, getBaseRecipeImageDir(), "principal_" + System.currentTimeMillis());
            receta.setMainPhoto(mainPhotoPath);
        } else {
            receta.setMainPhoto(null);
        }

        receta.setTitle(dto.getTitle());
        receta.setDescription(dto.getDescription());
        receta.setServings(dto.getServings());
        receta.setAuthor(user);
        receta.setStatus(RecipeStatus.APROBADA);


        RecipeType tipo = recipeTypeRepository.findById(dto.getTipoId())
                .orElseThrow(() -> new RuntimeException("Tipo de receta no encontrado"));
        receta.setTipo(tipo);
        recipeRepository.save(receta);

        Recipe recetaCreada = recipeRepository.findByTitleAndAuthor(dto.getTitle(), user)
                .orElseThrow(() -> new RuntimeException("No se encontró la receta recién creada"));
        long id = recetaCreada.getId();

        return id;
    }

    public void creaReceta2(long id, RecipeCreate2Request dto, String email) {
        Optional<Recipe> recetaget = recipeRepository.findById(id);
        Recipe receta = recetaget.get();
        if (receta.getAuthor().getEmail() == email){
            new RuntimeException("hubo un error al identificar el autor de la receta");
        }
        // Ingredientes
        List<RecipeIngredient> ingredientes = new ArrayList<>();
        for (IngredientDto i : dto.getIngredients()) {
            Ingredient ingrediente = new Ingredient();
            ingrediente.setDetail(i.getDetail());

            RecipeIngredient ri = new RecipeIngredient();
            ri.setCantidad(i.getQuantity());
            ri.setUnidad(i.getUnit());
            ri.setObservaciones(i.getObservations());
            ri.setIngredient(ingrediente);
            ri.setRecipe(receta);
            ingredientes.add(ri);
            ingredientRepository.save(ingrediente);
        }
        receta.getIngredientesUtilizados().clear();
        receta.getIngredientesUtilizados().addAll(ingredientes);

        recipeRepository.save(receta);
    }

    public void crearReceta3(long id, RecipeCreate3Request dto, List<MultipartFile> stepPhotos, String email){
        Optional<Recipe> recetaget = recipeRepository.findById(id);
        Recipe receta = recetaget.get();
        if (receta.getAuthor().getEmail() == email){
            new RuntimeException("hubo un error al identificar el autor de la receta");
        }
        // Pasos
        List<Step> steps = new ArrayList<>();
        for (int idx = 0; idx < dto.getSteps().size(); idx++) {
            StepDto stepDto = dto.getSteps().get(idx);
            Step step = new Step();
            step.setNroPaso(idx + 1);
            step.setInstruction(stepDto.getInstruction());
            step.setRecipe(receta);

            List<StepMedia> mediaList = new ArrayList<>();
            if (stepPhotos != null && stepPhotos.size() > idx && stepPhotos.get(idx) != null && !stepPhotos.get(idx).isEmpty()) {
                String stepPhotoPath = guardarArchivo(stepPhotos.get(idx), getBaseRecipeImageDir(), "step_" + idx + "_" + System.currentTimeMillis());
                StepMedia media = StepMedia.builder()
                        .tipoContenido("foto")
                        .extension(getExtension(stepPhotos.get(idx).getOriginalFilename()))
                        .urlContenido(stepPhotoPath)
                        .step(step)
                        .build();
                mediaList.add(media);
            }
            step.setMedia(mediaList);
            steps.add(step);
        }
        receta.getSteps().clear();
        receta.getSteps().addAll(steps);

        recipeRepository.save(receta);
    }

    private String guardarArchivo(MultipartFile archivo, String carpeta, String nombre) {
        try {
            Files.createDirectories(Paths.get(carpeta));
            String filename = nombre + "_" + archivo.getOriginalFilename();
            String fullPath = carpeta + filename;
            System.out.println("Intentando guardar en: " + fullPath);
            archivo.transferTo(new File(fullPath));
            return "/uploads/recetas/" + filename;
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