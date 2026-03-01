package com.hellohappy.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hellohappy.model.Categoria;
import com.hellohappy.repository.CategoriaRepository;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> buscarPorId(Long id) {
        return categoriaRepository.findById(id);
    }

    public Categoria salvar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
}
