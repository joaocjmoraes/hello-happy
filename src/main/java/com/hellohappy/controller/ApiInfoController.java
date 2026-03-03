package com.hellohappy.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiInfoController {

    @GetMapping
    public Map<String, Object> info() {
        Map<String, Object> info = new HashMap<>();
        info.put("nome", "Hello Happy API");
        info.put("versao", "1.0.0");
        info.put("descricao", "API REST do e-commerce de brinquedos Hello Happy");
        info.put("endpoints", List.of(
                "/api/brinquedos",
                "/api/categorias",
                "/api/equipe"
        ));
        return info;
    }
}
