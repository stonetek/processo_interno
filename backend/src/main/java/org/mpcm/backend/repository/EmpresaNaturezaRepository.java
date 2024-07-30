package org.mpcm.backend.repository;

import org.mpcm.backend.model.EmpresaNatureza;
import org.mpcm.backend.model.Natureza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmpresaNaturezaRepository extends JpaRepository<EmpresaNatureza, Long> {

    List<EmpresaNatureza> findAllEmpresaNaturezaByOrderByEmpresa();

    Optional<EmpresaNatureza> findByEmpresaIdAndNaturezaId(Long idEmpresa, Long idNatureza);
}
