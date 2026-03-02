package com.hellohappy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hellohappy.exception.ResourceNotFoundException;
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

    public Categoria buscarPorId(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada com id: " + id));
    }

    public Categoria salvar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
}
