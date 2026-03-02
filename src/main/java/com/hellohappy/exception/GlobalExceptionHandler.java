package com.hellohappy.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFound(ResourceNotFoundException ex) {
        Map<String, Object> erro = new HashMap<>();
        erro.put("timestamp", LocalDateTime.now());
        erro.put("status", HttpStatus.NOT_FOUND.value());
        erro.put("erro", "Recurso não encontrado");
        erro.put("mensagem", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> campos = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                campos.put(error.getField(), error.getDefaultMessage())
        );

        Map<String, Object> erro = new HashMap<>();
        erro.put("timestamp", LocalDateTime.now());
        erro.put("status", HttpStatus.BAD_REQUEST.value());
        erro.put("erro", "Dados inválidos");
        erro.put("campos", campos);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrity(DataIntegrityViolationException ex) {
        Map<String, Object> erro = new HashMap<>();
        erro.put("timestamp", LocalDateTime.now());
        erro.put("status", HttpStatus.CONFLICT.value());
        erro.put("erro", "Conflito de integridade");
        erro.put("mensagem", "Não é possível realizar a operação pois existem registros vinculados");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(erro);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneral(Exception ex) {
        Map<String, Object> erro = new HashMap<>();
        erro.put("timestamp", LocalDateTime.now());
        erro.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        erro.put("erro", "Erro interno do servidor");
        erro.put("mensagem", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
    }
}
