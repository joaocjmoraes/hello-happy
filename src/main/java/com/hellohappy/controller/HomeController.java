package com.hellohappy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.hellohappy.service.BrinquedoService;
import com.hellohappy.service.CategoriaService;

@Controller
public class HomeController {

    private final BrinquedoService brinquedoService;
    private final CategoriaService categoriaService;

    public HomeController(BrinquedoService brinquedoService, CategoriaService categoriaService) {
        this.brinquedoService = brinquedoService;
        this.categoriaService = categoriaService;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("destaques", brinquedoService.listarDestaques());
        model.addAttribute("categorias", categoriaService.listarTodas());
        return "home";
    }
}
