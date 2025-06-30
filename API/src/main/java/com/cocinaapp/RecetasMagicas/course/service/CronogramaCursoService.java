package com.cocinaapp.RecetasMagicas.course.service;

import com.cocinaapp.RecetasMagicas.card.repository.CardRepository;
import com.cocinaapp.RecetasMagicas.card.service.CardService;
import com.cocinaapp.RecetasMagicas.course.dto.CardItemDto;
import com.cocinaapp.RecetasMagicas.course.dto.CheckInDto;
import com.cocinaapp.RecetasMagicas.course.dto.CronogramaCursoConSedeDto;
import com.cocinaapp.RecetasMagicas.course.dto.CronogramaCursoCreateRequestDto;
import com.cocinaapp.RecetasMagicas.course.model.Course;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.course.model.Sede;
import com.cocinaapp.RecetasMagicas.course.repository.CourseRepository;
import com.cocinaapp.RecetasMagicas.course.repository.CronogramaCursoRepository;
import com.cocinaapp.RecetasMagicas.course.repository.SedeRepository;
import com.cocinaapp.RecetasMagicas.user.model.User;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.Arrays.stream;

@Service
@RequiredArgsConstructor
public class CronogramaCursoService {
    private final CourseRepository courseRepository;
    private final SedeRepository sedeRepository;
    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final CronogramaCursoRepository cronogramaCursoRepository;

    public CronogramaCurso crearCronogramaCurso(CronogramaCursoCreateRequestDto dto) {
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        Sede sede = sedeRepository.findById(dto.getSedeId())
                .orElseThrow(() -> new RuntimeException("Sede no encontrada"));

        CronogramaCurso cronograma = CronogramaCurso.builder()
                .course(course)
                .sede(sede)
                .ubicacion(dto.getUbicacion())
                .promotion(dto.getPromotion())
                .fechaInicio(dto.getFechaInicio())
                .fechaFin(dto.getFechaFin())
                .vacantes(dto.getVacantes())
                .build();

        return cronogramaCursoRepository.save(cronograma);
    }

    public List<CronogramaCursoConSedeDto> getCronogramasPorCurso(Long courseId) {
        List<CronogramaCurso> cronogramas = cronogramaCursoRepository.findByCourseId(courseId);
        return cronogramas.stream().map(c -> CronogramaCursoConSedeDto.builder()
                .id(c.getId())
                .fechaInicio(c.getFechaInicio())
                .fechaFin(c.getFechaFin())
                .vacantes(c.getVacantes())
                .ubicacion(c.getUbicacion())
                .promotion(c.getPromotion())
                .sedeId(c.getSede().getId())
                .sedeNombre(c.getSede().getNombre())
                .sedeDireccion(c.getSede().getDireccion())
                .sedeCoordenadas(c.getSede().getCoordenadas())
                .sedeMainPhoto(c.getSede().getMainPhoto())
                .build()).toList();
    }

    public CheckInDto ordenCompra(Long idCatedra, String email) {
        // 1. Recuperar usuario y tarjetas
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<CardItemDto> mediosPago = cardRepository.findAllByUser(user).stream()
                .map(card -> CardItemDto.builder()
                        .id(card.getId())
                        .numero(card.getNumero())
                        .tipo(card.getTipo())
                        .build())
                .toList();

        // 2. Recuperar cátedra y sus datos asociados
        CronogramaCurso catedra = cronogramaCursoRepository.findById(idCatedra)
                .orElseThrow(() -> new RuntimeException("Cátedra no encontrada"));

        Course curso = catedra.getCourse();
        Sede sede = catedra.getSede();

        // 3. Calcular precio final con descuento
        double precioBase = curso.getPrice();  // o getPrecio()
        Double descuento = catedra.getPromotion() == null ? catedra.getPromotion() : 0;  // en porcentaje

        long precioFinal = Math.round(precioBase * (100 - descuento) / 100.0);

        // 4. Armar y devolver DTO
        return CheckInDto.builder()
                .MediosPago(mediosPago)
                .precio(precioFinal)
                .sede(sede.getNombre())
                .promocionSede(sede.getTipoPromocion())  // o cualquier campo de promoción aplicable
                .descuentoCatedra(descuento)
                .curso(curso.getTitle())
                .fotoCurso(curso.getMainPhoto())
                .catedraID(catedra.getId())
                .build();
    }


}
