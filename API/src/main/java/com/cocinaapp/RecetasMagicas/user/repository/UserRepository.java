package com.cocinaapp.RecetasMagicas.user.repository;

import com.cocinaapp.RecetasMagicas.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByAlias(String alias);
    Optional<User> findByEmail(String email);
    List<User> findAllByFavoritos_Id(Long recipeId);
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.favoritos WHERE u.email = :email")
    Optional<User> findByEmailWithFavoritos(@Param("email") String email);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.recetasModificadas WHERE u.email = :email")
    Optional<User> findByEmailWithRecetasModificadas(@Param("email") String email);
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.favoritos LEFT JOIN FETCH u.recetasModificadas WHERE u.email = :email")
    Optional<User> findByEmailWithFavoritosAndRecetasModificadas(@Param("email") String email);

}
