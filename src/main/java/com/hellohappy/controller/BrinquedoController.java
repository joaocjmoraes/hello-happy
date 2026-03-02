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

import com.hellohappy.model.Brinquedo;
import com.hellohappy.service.BrinquedoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/brinquedos")
public class BrinquedoController {

    private final BrinquedoService brinquedoService;

    public BrinquedoController(BrinquedoService brinquedoService) {
        this.brinquedoService = brinquedoService;
    }

    @GetMapping
    public List<Brinquedo> listarTodos() {
        return brinquedoService.listarTodos();
    }

    @GetMapping("/destaques")
    public List<Brinquedo> listarDestaques() {
        return brinquedoService.listarDestaques();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brinquedo> buscarPorId(@PathVariable Long id) {
        Brinquedo brinquedo = brinquedoService.buscarPorId(id);
        return ResponseEntity.ok(brinquedo);
    }

    @GetMapping("/categoria/{categoriaId}")
    public List<Brinquedo> listarPorCategoria(@PathVariable Long categoriaId) {
        return brinquedoService.listarPorCategoria(categoriaId);
    }

    @PostMapping
    public ResponseEntity<Brinquedo> criar(@Valid @RequestBody Brinquedo brinquedo) {
        Brinquedo salvo = brinquedoService.salvar(brinquedo);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brinquedo> atualizar(@PathVariable Long id, @Valid @RequestBody Brinquedo brinquedo) {
        Brinquedo atualizado = brinquedoService.atualizar(id, brinquedo);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        brinquedoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
