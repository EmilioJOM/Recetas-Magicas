package com.cocinaapp.RecetasMagicas.auth.service;

import com.cocinaapp.RecetasMagicas.auth.dto.*;
import com.cocinaapp.RecetasMagicas.config.JwtService;
import com.cocinaapp.RecetasMagicas.exception.*;
import com.cocinaapp.RecetasMagicas.user.dto.UserInfoResponseDTO;
import com.cocinaapp.RecetasMagicas.util.EmailService;
import com.cocinaapp.RecetasMagicas.user.model.User;
import com.cocinaapp.RecetasMagicas.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    public LoginResponseDTO register(RegisterRequestDTO request) {
        // 1. Validar si el email o alias ya están en uso
        if (userRepository.existsByEmail(request.getEmail()) || userRepository.existsByAlias(request.getAlias())) {
            throw new EmailAliasExistException("Alias o email ya están registrados");
        }

        // 2. Encriptar contraseña
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // 3. Crear objeto User
        User user = new User();
        user.setAlias(request.getAlias());
        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setRole("USER"); // o un enum si lo preferís
        user.setEsPago(false);

        // 4. Guardar en la base de datos
        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());
        UserInfoResponseDTO userDto = new UserInfoResponseDTO(
                user.getId(),
                user.getAlias(),
                user.getEmail(),
                user.getRole(),
                user.isEsPago());
        return new LoginResponseDTO(token, userDto);
    }

    public LoginResponseDTO login(LoginRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        long expiration = request.isRememberMe()
                ? (1000L * 60 * 60 * 24 * 30) // 30 días
                : (1000L * 60 * 60);          // 1 hora

        String token = jwtService.generateToken(user.getEmail(), expiration);

        UserInfoResponseDTO userDto = new UserInfoResponseDTO(
                user.getId(),
                user.getAlias(),
                user.getEmail(),
                user.getRole(),
                user.isEsPago());
        return new LoginResponseDTO(token, userDto);
    }


    public void validate(ValidationRequestDTO request) {
        boolean aliasTaken = userRepository.existsByAlias(request.getAlias());
        boolean emailTaken = userRepository.existsByEmail(request.getEmail());

        if (emailTaken) {
            String mensaje = "email ya esta en uso";
            throw new EmailAliasExistException(mensaje);
        }
        if (aliasTaken){
            String mensaje = "Alias ya está en uso.";
            List<String> sugerencias;
            sugerencias = generarSugerenciasAlias(request.getAlias());
            throw new AliasAlreadyExistException(mensaje,sugerencias);
        }

        String code = String.format("%06d", new Random().nextInt(999999));
        storeValidationCode(request.getEmail(), code);
        emailService.sendValidationCode(request.getEmail(), code);
    }

    private List<String> generarSugerenciasAlias(String aliasBase) {
        List<String> sugerencias = new ArrayList<>();
        Random rand = new Random();
        int intentos = 0;
        while (sugerencias.size() < 3 && intentos < 10) {
            String aliasSugerido = aliasBase + (rand.nextInt(900) + 100); // ejemplo: alias123
            if (!userRepository.existsByAlias(aliasSugerido)) {
                sugerencias.add(aliasSugerido);
            }
            intentos++;
        }
        return sugerencias;
    }



    private final Map<String, String> codeStorage = new ConcurrentHashMap<>();

    public void storeValidationCode(String email, String code) {
        codeStorage.put(email, code);
    }

    public void validateCode(CodeValidationRequestDTO request) {
        String expectedCode = codeStorage.get(request.getEmail());

        if (expectedCode == null || !expectedCode.equals(request.getCode())) {
            throw new RuntimeException("Código inválido");
        }

        // Opcional: eliminar el código una vez validado
        codeStorage.remove(request.getEmail());
    }

    public void sendRecoveryCode(PasswordRecoveryRequest1DTO request) {
        // Validar existencia del email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("El email no está registrado"));


        String code = String.format("%06d", new Random().nextInt(999999));
        storeValidationCode(request.getEmail(), code);
        emailService.sendValidationCode(request.getEmail(), code);

        // Guardarlo en el Map para validación por si hace falta
        storeValidationCode(request.getEmail(), code);

        // Enviar por correo
        emailService.sendValidationCode(request.getEmail(), code);
    }


    public String validateCodeRecoveryPassword(CodeValidationRequestDTO request){
        String expectedCode = codeStorage.get(request.getEmail());

        if (expectedCode == null || !expectedCode.equals(request.getCode())) {
            throw new RuntimeException("Código inválido");
        }

        // Opcional: eliminar el código una vez validado
        codeStorage.remove(request.getEmail());
        return jwtService.generateToken(request.getEmail(), 60*60*1000);//una hora de token
    }

}
