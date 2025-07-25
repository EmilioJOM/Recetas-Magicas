package com.cocinaapp.RecetasMagicas.user.model;

import com.cocinaapp.RecetasMagicas.recipe.model.Recipe;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long id;
    private String alias;
    private String email;
    private String password;
    private String role = "USER"; // Podés usar enum si querés más seguridad

    @ManyToMany
    @JoinTable(
            name = "user_favoritos",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id")
    )
    private Set<Recipe> favoritos = new HashSet<>();

    @ElementCollection
    private List<Long> recetasModificadas = new ArrayList<>();


    private boolean esPago;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role)); // Ej: "USER"
    }

    @Override
    public String getUsername() {
        return email; // Lo que usás para autenticar
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
