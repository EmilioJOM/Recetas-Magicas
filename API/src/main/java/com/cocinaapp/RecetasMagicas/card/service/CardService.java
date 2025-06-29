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
import java.util.Map;
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
        card.setNumero(req.getCardNumber());
        card.setTitular(req.getCardHolderName());
        card.setVencimiento(req.getExpirationDate());
        card.setUser(user);
        card.setCodigo(req.getSecurityCode());
        card.setTipo(tipoTarjeta(req.getCardNumber()));
        card.setEmailMP(req.getEmailMP());
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

    private String tipoTarjeta(String numeroTarjeta) {
        String numeroSinEspacios = numeroTarjeta.replaceAll("\\s+", "");

        int prefix1 = Integer.parseInt(numeroSinEspacios.substring(0, 1));
        int prefix2 = Integer.parseInt(numeroSinEspacios.substring(0, 2));
        int prefix3 = Integer.parseInt(numeroSinEspacios.substring(0, 3));
        int prefix4 = Integer.parseInt(numeroSinEspacios.substring(0, 4));
        int prefix6 = Integer.parseInt(numeroSinEspacios.substring(0, 6));

        if (prefix1 == 4) {
            return "visa";
        } else if (prefix2 >= 50 && prefix2 <= 55) {
            return "master";
        } else if (prefix4 >= 2221 && prefix4 <= 2720) {
            return "master";
        } else if (prefix2 == 34 || prefix2 == 37) {
            return "amex";
        } else if (prefix4 == 6011 ||
                (prefix6 >= 622126 && prefix6 <= 622925) ||
                (prefix3 >= 644 && prefix3 <= 649) ||
                prefix2 == 65) {
            return "discover";
        } else if (prefix2 == 35) {
            return "jcb";
        } else if (prefix2 == 36 || prefix2 == 38 || prefix2 == 39) {
            return "diners";
        }

        else throw new IllegalArgumentException("Tipo de tarjeta no reconocido: " + prefix4);
    }




}
