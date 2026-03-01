package com.hellohappy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hellohappy.model.MembroEquipe;
import com.hellohappy.service.MembroEquipeService;

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
}
