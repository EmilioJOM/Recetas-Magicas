package com.cocinaapp.RecetasMagicas.course.service;

import com.cocinaapp.RecetasMagicas.course.dto.SedeCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.model.Sede;
import com.cocinaapp.RecetasMagicas.course.repository.SedeRepository;
import com.cocinaapp.RecetasMagicas.util.GuardarImagenes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class SedeService {
    private final SedeRepository sedeRepository;
    private final GuardarImagenes guardarImagenes;


    public Sede crearSede(SedeCreateRequestDto dto, MultipartFile mainPhoto) {
        String mainPhotoPath = null;
        if (mainPhoto != null && !mainPhoto.isEmpty()) {
            mainPhotoPath = guardarImagenes.guardarArchivo(mainPhoto, "sedes", "principal");
        }

        Sede sede = Sede.builder()
                .nombre(dto.getNombre())
                .direccion(dto.getDireccion())
                .coordenadas(dto.getCoordenadas())
                .telefono(dto.getTelefono())
                .mail(dto.getMail())
                .whatsapp(dto.getWhatsapp())
                .tipoBonificacion(dto.getTipoBonificacion())
                .bonificacionCursos(dto.getBonificacionCursos())
                .tipoPromocion(dto.getTipoPromocion())
                .promocionCursos(dto.getPromocionCursos())
                .capacidadAlumnos(dto.getCapacidadAlumnos())
                .mainPhoto(mainPhotoPath)
                .build();
        return sedeRepository.save(sede);
    }
}