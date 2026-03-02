package com.hellohappy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hellohappy.service.BrinquedoService;
import com.hellohappy.service.CategoriaService;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final BrinquedoService brinquedoService;
    private final CategoriaService categoriaService;

    public AdminController(BrinquedoService brinquedoService, CategoriaService categoriaService) {
        this.brinquedoService = brinquedoService;
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public String listar(Model model) {
        model.addAttribute("brinquedos", brinquedoService.listarTodos());
        return "admin/listar";
    }

    @GetMapping("/novo")
    public String formularioNovo(Model model) {
        model.addAttribute("categorias", categoriaService.listarTodas());
        return "admin/formulario";
    }

    @GetMapping("/editar/{id}")
    public String formularioEditar(@PathVariable Long id, Model model) {
        model.addAttribute("brinquedo", brinquedoService.buscarPorId(id));
        model.addAttribute("categorias", categoriaService.listarTodas());
        return "admin/formulario";
    }
}
