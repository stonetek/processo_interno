package org.mpcm.backend.repository;

import org.mpcm.backend.model.ProcessoDocumento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProcessoDocumentoRepository extends JpaRepository<ProcessoDocumento, Long> {

    List<ProcessoDocumento> findByProcessoId(Long idProcesso);
}
