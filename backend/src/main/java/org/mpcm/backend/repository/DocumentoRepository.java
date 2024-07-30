package org.mpcm.backend.repository;

import org.mpcm.backend.model.Documento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {

       List<Documento> findDocumentoByOrderByNomeAsc();
       Optional<Documento> findById(Long id);
}
