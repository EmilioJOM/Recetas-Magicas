package com.cocinaapp.RecetasMagicas.Inscripcion.service;

import com.cocinaapp.RecetasMagicas.Inscripcion.dto.InscripcionResponseDto;
import com.cocinaapp.RecetasMagicas.Inscripcion.model.Inscripcion;
import com.cocinaapp.RecetasMagicas.Inscripcion.repository.InscripcionRepository;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.course.repository.CronogramaCursoRepository;
import com.cocinaapp.RecetasMagicas.pago.service.RegistrarPago;
import com.cocinaapp.RecetasMagicas.user.model.Alumno;
import com.cocinaapp.RecetasMagicas.user.model.User;
import com.cocinaapp.RecetasMagicas.user.repository.AlumnoRepository;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class InscripcionService {

    private final UserRepository userRepository;
    private final AlumnoRepository alumnoRepository;
    private final CronogramaCursoRepository cronogramaCursoRepository;
    private final InscripcionRepository inscripcionRepository;
    private final RegistrarPago registrarPago;

    public InscripcionResponseDto inscribirse(Long idCronograma, String email) {

        User usuario = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Alumno alumno = alumnoRepository.findByUser(usuario)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        CronogramaCurso cronograma = cronogramaCursoRepository.findById(idCronograma)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        if (inscripcionRepository.existsByUsuarioAndCronograma(usuario, cronograma)) {
            System.out.println("Ya existe una inscripción para el usuario " + usuario.getId() + " y catedra " + cronograma.getId());
            throw new RuntimeException("Ya estás inscripto en este curso.");
        }

        Inscripcion inscripcion = Inscripcion.builder()
                .usuario(usuario)
                .cronograma(cronograma)
                .fechaInscripcion(LocalDate.now())
                .estado("INSCRIPTO")
                .build();

        double precioBase = cronograma.getCourse().getPrice();  // o getPrecio()
        Double descuento;
        try {
            descuento = cronograma.getPromotion()+0;
        } catch (Exception e) {
            descuento = 0.0;
        }
        long precioFinal = Math.round(precioBase * (100 - descuento) / 100.0);

        registrarPago.pagoPendiente(
                usuario,
                (double) precioFinal,
                usuario.getEmail()+"#"+cronograma.getId().toString()
        );
        inscripcionRepository.save(inscripcion);
        return new InscripcionResponseDto(
                email+"#"+cronograma.getId(),
                email,
                precioFinal);
    }

    public void darBaja(String email, Long idCronograma){

        User usuario = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        CronogramaCurso cronograma = cronogramaCursoRepository.findById(idCronograma)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        Inscripcion inscripcion = inscripcionRepository.findByUsuarioAndCronograma(usuario, cronograma)
                .orElseThrow(() -> new RuntimeException("inscripcion no encontrado"));

        inscripcion.setEstado("BAJA");
        inscripcionRepository.save(inscripcion);
    }
}
