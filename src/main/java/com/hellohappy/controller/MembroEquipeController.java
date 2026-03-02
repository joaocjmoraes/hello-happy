package com.hellohappy.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hellohappy.model.MembroEquipe;
import com.hellohappy.service.MembroEquipeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/equipe")
public class MembroEquipeController {

    private final MembroEquipeService membroEquipeService;

    public MembroEquipeController(MembroEquipeService membroEquipeService) {
        this.membroEquipeService = membroEquipeService;
    }

    @GetMapping
    public List<MembroEquipe> listarTodos() {
        return membroEquipeService.listarTodos();
    }

    @PostMapping
    public ResponseEntity<MembroEquipe> criar(@Valid @RequestBody MembroEquipe membro) {
        MembroEquipe salvo = membroEquipeService.salvar(membro);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MembroEquipe> atualizar(@PathVariable Long id, @Valid @RequestBody MembroEquipe membro) {
        MembroEquipe atualizado = membroEquipeService.atualizar(id, membro);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        membroEquipeService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
