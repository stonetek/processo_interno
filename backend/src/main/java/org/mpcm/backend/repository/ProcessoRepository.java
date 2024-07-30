package org.mpcm.backend.repository;

import org.mpcm.backend.model.Documento;
import org.mpcm.backend.model.Empresa;
import org.mpcm.backend.model.Processo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProcessoRepository extends JpaRepository<Processo, Long> {

    List<Processo> findAllProcessoByOrderByNomeAsc();

    @Query("SELECT DISTINCT p FROM Processo p " +
            "JOIN FETCH p.processoEmpresas pe " +
            "WHERE pe.empresa.id = :empresaId")
    List<Processo> findByEmpresaId(@Param("empresaId") Long empresaId);

    @Query("SELECT d FROM Documento d JOIN d.processoDocumentos p WHERE p.id = :processoId")
    List<Documento> obterDocumentosDoProcesso(Long processoId);
}
