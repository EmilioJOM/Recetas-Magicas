package com.cocinaapp.RecetasMagicas.card.service;

import com.cocinaapp.RecetasMagicas.card.dto.CardRegisterRequestDto;
import com.cocinaapp.RecetasMagicas.card.dto.CardResponseDto;
import com.cocinaapp.RecetasMagicas.card.model.Card;
import com.cocinaapp.RecetasMagicas.card.repository.CardRepository;
import com.cocinaapp.RecetasMagicas.user.model.User;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
import lombok.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    public Card registrarTarjeta(CardRegisterRequestDto req, String emailUsuario) {
        User user = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Card card = new Card();
        card.setNumero(req.getNumero());
        card.setTitular(req.getTitular());
        card.setVencimiento(req.getVencimiento());
        card.setUser(user);
        card.setCodigo(req.getCodigo());
        return cardRepository.save(card);
    }
    public List<CardResponseDto> getCardsByUser(String emailUsuario) {
        User user = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        List<Card> cards = cardRepository.findAllByUser(user);

        return cards.stream()
                .map(card -> CardResponseDto.builder()
                        .id(card.getId())
                        .numeroEnmascarado(enmascararNumero(card.getNumero()))
                        .titular(card.getTitular())
                        .vencimiento(card.getVencimiento())
                        .build())
                .collect(Collectors.toList());
    }

    // Enmascara el número, muestra solo los últimos 4 dígitos
    private String enmascararNumero(String numero) {
        if (numero == null || numero.length() < 4) return "****";
        String ultimos4 = numero.substring(numero.length() - 4);
        return "**** **** **** " + ultimos4;
    }

    public void eliminarTarjeta(Long cardId, String emailUsuario) {
        // Buscar usuario
        User user = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Buscar tarjeta
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Tarjeta no encontrada"));

        // Validar que pertenezca al usuario
        if (!card.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("No autorizado para eliminar esta tarjeta");
        }

        cardRepository.delete(card);
    }



}
