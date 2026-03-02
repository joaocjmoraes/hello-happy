package com.hellohappy.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
}
