package com.hellohappy.config;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.hellohappy.model.Brinquedo;
import com.hellohappy.model.Categoria;
import com.hellohappy.model.MembroEquipe;
import com.hellohappy.repository.BrinquedoRepository;
import com.hellohappy.repository.CategoriaRepository;
import com.hellohappy.repository.MembroEquipeRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final CategoriaRepository categoriaRepository;
    private final BrinquedoRepository brinquedoRepository;
    private final MembroEquipeRepository membroEquipeRepository;

    public DataLoader(CategoriaRepository categoriaRepository,
                      BrinquedoRepository brinquedoRepository,
                      MembroEquipeRepository membroEquipeRepository) {
        this.categoriaRepository = categoriaRepository;
        this.brinquedoRepository = brinquedoRepository;
        this.membroEquipeRepository = membroEquipeRepository;
    }

    @Override
    public void run(String... args) {
        if (categoriaRepository.count() > 0) {
            return;
        }

        Categoria bonecas = categoriaRepository.save(new Categoria("Bonecas", "/images/categorias/bonecas.jpg"));
        Categoria jogos = categoriaRepository.save(new Categoria("Jogos de Tabuleiro", "/images/categorias/jogos.jpg"));
        Categoria educativos = categoriaRepository.save(new Categoria("Educativos", "/images/categorias/educativos.jpg"));
        Categoria veiculos = categoriaRepository.save(new Categoria("Veículos", "/images/categorias/veiculos.jpg"));

        brinquedoRepository.save(new Brinquedo("BNK-001", "Boneca Feliz", "Boneca articulada com acessórios", "Happy Toys", "/images/brinquedos/boneca-feliz.jpg", new BigDecimal("89.90"), bonecas));
        brinquedoRepository.save(new Brinquedo("BNK-002", "Boneca Princesa", "Boneca com vestido de princesa", "Happy Toys", "/images/brinquedos/boneca-princesa.jpg", new BigDecimal("79.90"), bonecas));
        brinquedoRepository.save(new Brinquedo("JGO-001", "Detetive Jr.", "Jogo de investigação para crianças", "Estrela", "/images/brinquedos/detetive-jr.jpg", new BigDecimal("59.90"), jogos));
        brinquedoRepository.save(new Brinquedo("JGO-002", "Banco Imobiliário Kids", "Versão infantil do clássico", "Estrela", "/images/brinquedos/banco-imobiliario.jpg", new BigDecimal("69.90"), jogos));
        brinquedoRepository.save(new Brinquedo("EDU-001", "Blocos de Montar 100 peças", "Blocos coloridos para montar", "Lego", "/images/brinquedos/blocos-montar.jpg", new BigDecimal("129.90"), educativos));
        brinquedoRepository.save(new Brinquedo("EDU-002", "Quebra-Cabeça Mapa do Brasil", "Quebra-cabeça educativo de 200 peças", "Grow", "/images/brinquedos/quebra-cabeca.jpg", new BigDecimal("39.90"), educativos));
        brinquedoRepository.save(new Brinquedo("VCL-001", "Carrinho de Corrida", "Carrinho esportivo em miniatura", "Hot Wheels", "/images/brinquedos/carrinho-corrida.jpg", new BigDecimal("29.90"), veiculos));
        brinquedoRepository.save(new Brinquedo("VCL-002", "Caminhão Caçamba", "Caminhão com caçamba articulada", "Brinquedos Bandeirante", "/images/brinquedos/caminhao-cacamba.jpg", new BigDecimal("49.90"), veiculos));

        membroEquipeRepository.save(new MembroEquipe("João Moraes", "123456", "/images/equipe/joao.jpg"));
        membroEquipeRepository.save(new MembroEquipe("Maria Silva", "654321", "/images/equipe/maria.jpg"));
    }
}
