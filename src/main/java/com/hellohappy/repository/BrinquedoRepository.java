package com.hellohappy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hellohappy.model.Brinquedo;

public interface BrinquedoRepository extends JpaRepository<Brinquedo, Long> {

    List<Brinquedo> findByCategoriaId(Long categoriaId);

    List<Brinquedo> findTop6ByOrderByIdDesc();

    List<Brinquedo> findByDescricaoContainingIgnoreCaseOrMarcaContainingIgnoreCase(String descricao, String marca);

}
