package com.cocinaapp.RecetasMagicas;

import com.cocinaapp.RecetasMagicas.course.model.Sede;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SedeRepository extends JpaRepository<Sede, Long> {}