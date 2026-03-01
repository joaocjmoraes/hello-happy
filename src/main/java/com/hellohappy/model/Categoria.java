package com.hellohappy.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "imagem_url")
    private String imagemUrl;

    @OneToMany(mappedBy = "categoria")
    private List<Brinquedo> brinquedos = new ArrayList<>();

    public Categoria() {
    }

    public Categoria(String nome, String imagemUrl) {
        this.nome = nome;
        this.imagemUrl = imagemUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public List<Brinquedo> getBrinquedos() {
        return brinquedos;
    }

    public void setBrinquedos(List<Brinquedo> brinquedos) {
        this.brinquedos = brinquedos;
    }
}
