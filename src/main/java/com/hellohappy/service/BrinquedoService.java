package com.hellohappy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hellohappy.exception.ResourceNotFoundException;
import com.hellohappy.model.Brinquedo;
import com.hellohappy.repository.BrinquedoRepository;

@Service
public class BrinquedoService {

    private final BrinquedoRepository brinquedoRepository;

    public BrinquedoService(BrinquedoRepository brinquedoRepository) {
        this.brinquedoRepository = brinquedoRepository;
    }

    public List<Brinquedo> listarTodos() {
        return brinquedoRepository.findAll();
    }

    public Brinquedo buscarPorId(Long id) {
        return brinquedoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brinquedo não encontrado com id: " + id));
    }

    public List<Brinquedo> listarDestaques() {
        return brinquedoRepository.findTop6ByOrderByIdDesc();
    }

    public List<Brinquedo> listarPorCategoria(Long categoriaId) {
        return brinquedoRepository.findByCategoriaId(categoriaId);
    }

    public Brinquedo salvar(Brinquedo brinquedo) {
        return brinquedoRepository.save(brinquedo);
    }

    public Brinquedo atualizar(Long id, Brinquedo brinquedoAtualizado) {
        return brinquedoRepository.findById(id).map(brinquedo -> {
            brinquedo.setDescricao(brinquedoAtualizado.getDescricao());
            brinquedo.setDetalhes(brinquedoAtualizado.getDetalhes());
            brinquedo.setMarca(brinquedoAtualizado.getMarca());
            brinquedo.setImagemUrl(brinquedoAtualizado.getImagemUrl());
            brinquedo.setValor(brinquedoAtualizado.getValor());
            brinquedo.setCategoria(brinquedoAtualizado.getCategoria());
            return brinquedoRepository.save(brinquedo);
        }).orElseThrow(() -> new ResourceNotFoundException("Brinquedo não encontrado com id: " + id));
    }

    public void excluir(Long id) {
        if (!brinquedoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Brinquedo não encontrado com id: " + id);
        }
        brinquedoRepository.deleteById(id);
    }
}
