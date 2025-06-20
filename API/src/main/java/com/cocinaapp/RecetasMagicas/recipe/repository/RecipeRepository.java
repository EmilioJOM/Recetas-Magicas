package com.cocinaapp.RecetasMagicas.recipe.repository;


import com.cocinaapp.RecetasMagicas.recipe.model.Recipe;
import com.cocinaapp.RecetasMagicas.recipe.model.RecipeStatus;
import com.cocinaapp.RecetasMagicas.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long>, JpaSpecificationExecutor<Recipe> {
    // Para N variable:
    List<Recipe> findByStatusOrderByIdDesc(RecipeStatus status, Pageable pageable);

    @Query("SELECT r FROM Recipe r WHERE (LOWER(r.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(r.description) LIKE LOWER(CONCAT('%', :query, '%'))) AND r.status = 'APROBADA'")
    List<Recipe> findByQueryAndFilter(@Param("query") String query, @Param("filter") String filter, @Param("userId") Long userId);

    boolean existsByTitleAndAuthor(String title, User user);
    Optional<Recipe> findByTitleAndAuthor(String title, User user);
}