package com.cocinaapp.RecetasMagicas.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(EmailAliasExistException.class)
    public ResponseEntity<String> handleUserAlreadyExists(EmailAliasExistException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
    @ExceptionHandler(AliasAlreadyExistException.class)
    public ResponseEntity<?> handleAliasAlreadyExists(AliasAlreadyExistException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of(
                        "message", ex.getMessage(),
                        "sugerencias", ex.getSugerencias()
                ));
    }
}