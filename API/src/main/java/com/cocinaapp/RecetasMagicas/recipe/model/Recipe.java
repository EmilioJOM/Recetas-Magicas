package com.cocinaapp.RecetasMagicas.recipe.model;

import com.cocinaapp.RecetasMagicas.recipe.model.Ingredient;
import com.cocinaapp.RecetasMagicas.recipe.model.RecipeStatus;
import com.cocinaapp.RecetasMagicas.recipe.model.Step;
import com.cocinaapp.RecetasMagicas.user.model.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "idTipo", nullable = false) // o "tipo_id"
    private RecipeType tipo;
    private Integer likes;
    private String title;
    private String description;
    private Integer servings;
    private String mainPhoto; // path o nombre archivo, o base64 si querés

    private LocalDateTime createdAt;
    @Enumerated(EnumType.STRING)
    private ExperienceLevel experienceLevel;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeIngredient> ingredientesUtilizados;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Step> steps;

    @Enumerated(EnumType.STRING)
    private RecipeStatus status; // PENDIENTE, APROBADA, RECHAZADA

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipePhoto> fotosAdicionales;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Recipe recipe = (Recipe) o;
        return id != null && id.equals(recipe.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

}
