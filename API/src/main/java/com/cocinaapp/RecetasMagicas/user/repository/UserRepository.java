package com.cocinaapp.RecetasMagicas.user.repository;

import com.cocinaapp.RecetasMagicas.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByAlias(String alias);
    Optional<User> findByEmail(String email);
}
