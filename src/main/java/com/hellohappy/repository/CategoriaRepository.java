package com.hellohappy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hellohappy.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
