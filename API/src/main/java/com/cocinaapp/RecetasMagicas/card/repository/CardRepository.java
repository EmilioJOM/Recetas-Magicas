package com.cocinaapp.RecetasMagicas.card.repository;

import com.cocinaapp.RecetasMagicas.card.model.Card;
import com.cocinaapp.RecetasMagicas.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findAllByUser(User user);
}
