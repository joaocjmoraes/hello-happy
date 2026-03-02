package com.hellohappy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.hellohappy.service.MembroEquipeService;

@Controller
public class EquipeController {

    private final MembroEquipeService membroEquipeService;

    public EquipeController(MembroEquipeService membroEquipeService) {
        this.membroEquipeService = membroEquipeService;
    }

    @GetMapping("/sobre")
    public String sobre(Model model) {
        model.addAttribute("membros", membroEquipeService.listarTodos());
        return "sobre";
    }
}
