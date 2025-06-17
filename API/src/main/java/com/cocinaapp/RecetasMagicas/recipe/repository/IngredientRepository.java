package com.cocinaapp.RecetasMagicas.recipe.repository;

import com.cocinaapp.RecetasMagicas.recipe.model.Ingredient;
import com.cocinaapp.RecetasMagicas.recipe.model.RecipeType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

}
