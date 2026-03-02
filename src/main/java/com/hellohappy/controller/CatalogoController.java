package com.hellohappy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hellohappy.service.BrinquedoService;
import com.hellohappy.service.CategoriaService;

@Controller
@RequestMapping("/catalogo")
public class CatalogoController {

    private final BrinquedoService brinquedoService;
    private final CategoriaService categoriaService;

    public CatalogoController(BrinquedoService brinquedoService, CategoriaService categoriaService) {
        this.brinquedoService = brinquedoService;
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public String categorias(Model model) {
        model.addAttribute("categorias", categoriaService.listarTodas());
        return "catalogo/categorias";
    }

    @GetMapping("/categoria/{id}")
    public String brinquedosPorCategoria(@PathVariable Long id, Model model) {
        model.addAttribute("categoria", categoriaService.buscarPorId(id));
        model.addAttribute("brinquedos", brinquedoService.listarPorCategoria(id));
        return "catalogo/brinquedos";
    }

    @GetMapping("/brinquedo/{id}")
    public String detalheBrinquedo(@PathVariable Long id, Model model) {
        model.addAttribute("brinquedo", brinquedoService.buscarPorId(id));
        return "catalogo/detalhe";
    }
}
