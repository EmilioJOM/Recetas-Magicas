package com.cocinaapp.RecetasMagicas.course.service;

import com.cocinaapp.RecetasMagicas.course.dto.SedeCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.model.Sede;
import com.cocinaapp.RecetasMagicas.course.repository.SedeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SedeService {
    private final SedeRepository sedeRepository;

    public Sede crearSede(SedeCreateRequestDto dto) {
        Sede sede = Sede.builder()
                .nombre(dto.getNombre())
                .direccion(dto.getDireccion())
                .telefono(dto.getTelefono())
                .mail(dto.getMail())
                .whatsapp(dto.getWhatsapp())
                .tipoBonificacion(dto.getTipoBonificacion())
                .bonificacionCursos(dto.getBonificacionCursos())
                .tipoPromocion(dto.getTipoPromocion())
                .promocionCursos(dto.getPromocionCursos())
                .capacidadAlumnos(dto.getCapacidadAlumnos())
                .build();
        return sedeRepository.save(sede);
    }
}