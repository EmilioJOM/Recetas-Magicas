package com.cocinaapp.RecetasMagicas.user.model;

import com.cocinaapp.RecetasMagicas.recipe.model.Recipe;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

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
    private List<Recipe> favoritos;

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
