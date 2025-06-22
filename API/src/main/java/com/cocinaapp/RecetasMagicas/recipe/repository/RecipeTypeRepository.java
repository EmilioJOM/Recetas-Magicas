package com.cocinaapp.RecetasMagicas.recipe.repository;

import com.cocinaapp.RecetasMagicas.recipe.model.RecipeType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecipeTypeRepository extends JpaRepository<RecipeType, Long> {
    // Si querés buscar por descripción (opcional)
    Optional<RecipeType> findByDescripcion(String descripcion);
    // Buscar por nombre ignorando mayúsculas/minúsculas
    Optional<RecipeType> findByNameIgnoreCase(String name);
}
