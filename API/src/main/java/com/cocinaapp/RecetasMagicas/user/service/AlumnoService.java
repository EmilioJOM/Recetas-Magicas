package com.cocinaapp.RecetasMagicas.user.service;

import com.cocinaapp.RecetasMagicas.user.model.Alumno;
import com.cocinaapp.RecetasMagicas.user.model.User;

import com.cocinaapp.RecetasMagicas.user.repository.AlumnoRepository;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
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

        // Guardar los archivos (ejemplo simple)
        String baseDir = "uploads/dni/";
        String pathFrente = baseDir + "dni_frente_" + user.getId() + "_" + dniFrente.getOriginalFilename();
        String pathDorso = baseDir + "dni_dorso_" + user.getId() + "_" + dniDorso.getOriginalFilename();

        try {
            Files.createDirectories(Paths.get(baseDir));
            dniFrente.transferTo(new File(pathFrente));
            dniDorso.transferTo(new File(pathDorso));
        } catch (IOException e) {
            throw new RuntimeException("Error guardando las fotos del DNI", e);
        }

        // Crear y guardar el alumno
        Alumno alumno = new Alumno();
        alumno.setUser(user);
        alumno.setNumeroTramite(numeroTramite);
        alumno.setNumeroDNI(numeroDNI);
        alumno.setPathDniFrente(pathFrente);
        alumno.setPathDniDorso(pathDorso);
        // ... otros campos si hacen falta
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
