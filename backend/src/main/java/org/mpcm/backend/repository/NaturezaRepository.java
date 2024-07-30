package org.mpcm.backend.repository;

import org.mpcm.backend.model.Natureza;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NaturezaRepository extends JpaRepository<Natureza, Long> {

    List<Natureza> findAllNaturezaByOrderByNumero();

    Optional<Natureza> findByNumero(Long numero);

    Optional<Natureza> findByTipoDeGasto(String tipoDeGasto);

    Natureza findNaturezaById(Long id);

}
