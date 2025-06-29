package com.cocinaapp.RecetasMagicas.Inscripcion.service;

import com.cocinaapp.RecetasMagicas.Inscripcion.model.Inscripcion;
import com.cocinaapp.RecetasMagicas.Inscripcion.repository.InscripcionRepository;
import com.cocinaapp.RecetasMagicas.course.model.CronogramaCurso;
import com.cocinaapp.RecetasMagicas.course.repository.CronogramaCursoRepository;
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

    public void inscribirse(Long idCronograma, String email) {

        User usuario = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Alumno alumno = alumnoRepository.findByUser(usuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        CronogramaCurso cronograma = cronogramaCursoRepository.findById(idCronograma)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        if (inscripcionRepository.existsByUsuarioAndCronograma(usuario, cronograma)) {
            throw new RuntimeException("Ya estás inscripto en este curso.");
        }

        Inscripcion inscripcion = Inscripcion.builder()
                .usuario(usuario)
                .cronograma(cronograma)
                .fechaInscripcion(LocalDate.now())
                .build();

        inscripcionRepository.save(inscripcion);
    }
}
