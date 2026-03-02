package com.hellohappy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hellohappy.exception.ResourceNotFoundException;
import com.hellohappy.model.MembroEquipe;
import com.hellohappy.repository.MembroEquipeRepository;

@Service
public class MembroEquipeService {

    private final MembroEquipeRepository membroEquipeRepository;

    public MembroEquipeService(MembroEquipeRepository membroEquipeRepository) {
        this.membroEquipeRepository = membroEquipeRepository;
    }

    public List<MembroEquipe> listarTodos() {
        return membroEquipeRepository.findAll();
    }

    public MembroEquipe salvar(MembroEquipe membro) {
        return membroEquipeRepository.save(membro);
    }

    public MembroEquipe atualizar(Long id, MembroEquipe membroAtualizado) {
        return membroEquipeRepository.findById(id).map(membro -> {
            membro.setNome(membroAtualizado.getNome());
            membro.setRa(membroAtualizado.getRa());
            membro.setFotoUrl(membroAtualizado.getFotoUrl());
            return membroEquipeRepository.save(membro);
        }).orElseThrow(() -> new ResourceNotFoundException("Membro não encontrado com id: " + id));
    }

    public void excluir(Long id) {
        if (!membroEquipeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Membro não encontrado com id: " + id);
        }
        membroEquipeRepository.deleteById(id);
    }
}
