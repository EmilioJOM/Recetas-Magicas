package com.cocinaapp.RecetasMagicas.user.service;

import com.cocinaapp.RecetasMagicas.user.model.Alumno;
import com.cocinaapp.RecetasMagicas.user.model.User;

import com.cocinaapp.RecetasMagicas.user.repository.AlumnoRepository;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
import com.cocinaapp.RecetasMagicas.util.GuardarImagenes;
import com.cocinaapp.RecetasMagicas.util.ValidateDNI;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class AlumnoService {
    private final PasswordEncoder passwordEncoder;
    private final AlumnoRepository alumnoRepository;

    private final UserRepository userRepository;

    public void registrarAlumno(
            String emailUsuario, MultipartFile dniFrente, MultipartFile dniDorso, String numeroTramite, String numeroDNI) {

        User user = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!ValidateDNI.ValidateNroTramite(numeroTramite, alumnoRepository, numeroDNI)){
            throw new IllegalArgumentException("Numero de Tramite o dni ya registrado");
        }

        String pathFrente = GuardarImagenes.guardarArchivo(dniFrente,"dni",user.getId()+"_frente");
        String pathDorso = GuardarImagenes.guardarArchivo(dniDorso,"dni",user.getId()+"_dorso");

        // Crear y guardar el alumno
        Alumno alumno = new Alumno();
        alumno.setUser(user);
        alumno.setNumeroTramite(numeroTramite);
        alumno.setNumeroDNI(numeroDNI);
        alumno.setPathDniFrente(pathFrente);
        alumno.setPathDniDorso(pathDorso);
        user.setRole("ALUMNO");
        user.setEsPago(true);

        alumnoRepository.save(alumno);
        userRepository.save(user);
    }


    public void changePassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
