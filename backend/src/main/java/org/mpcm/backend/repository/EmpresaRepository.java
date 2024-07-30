package org.mpcm.backend.repository;

import org.mpcm.backend.dto.EmpresaWithProcessosENaturezasDTO;
import org.mpcm.backend.model.Empresa;
import org.mpcm.backend.model.Processo;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    List<Empresa> findAllEmpresaByOrderByNomeAsc();

    Optional<Empresa> findByNome(String nomeEmpresa);

    @EntityGraph(value = "empresaWithNaturezas", type = EntityGraph.EntityGraphType.FETCH)
    @Query("SELECT e FROM Empresa e LEFT JOIN FETCH e.empresaNaturezas WHERE lower(e.nome) = lower(:nome)")
    Optional<Empresa> findByNomeWithEmpresaNaturezasIgnoreCase(@Param("nome") String nome);

    @EntityGraph(value = "empresaWithProcessos", type = EntityGraph.EntityGraphType.FETCH)
    @Query("SELECT e FROM Empresa e LEFT JOIN FETCH e.processoEmpresas WHERE lower(e.nome) = lower(:nome)")
    Optional<Empresa> findByNomeWithProcessoEmpresasIgnoreCase(@Param("nome") String nome);


   /* @Query("SELECT e FROM Empresa e LEFT JOIN FETCH e.empresaNaturezas WHERE e.nome = :nome")
    Optional<Empresa> findByNomeWithEmpresaNaturezas(@Param("nome") String nome);

    @Query("SELECT e FROM Empresa e LEFT JOIN FETCH e.processoEmpresas WHERE e.nome = :nome")
    Optional<Empresa> findByNomeWithProcessoEmpresas(@Param("nome") String nome);
*/

    @Query("SELECT DISTINCT e FROM Empresa e LEFT JOIN FETCH e.empresaNaturezas WHERE LOWER(e.nome) LIKE %:nome%")
    List<Empresa> findByNomeContainingIgnoreCase(@Param("nome") String nome);

    @Query("SELECT DISTINCT e FROM Empresa e LEFT JOIN FETCH e.processoEmpresas WHERE LOWER(e.nome) LIKE %:nome%")
    List<Empresa> findByNomeContainingIgnoreCaseWithProcessos(@Param("nome") String nome);


    @Query("SELECT p FROM Processo p JOIN p.processoEmpresas pe JOIN pe.empresa e WHERE LOWER(e.nome) LIKE LOWER(CONCAT('%', :nomeEmpresa, '%'))")
    List<Processo> findByNomeEmpresaIgnoreCaseContaining(@Param("nomeEmpresa") String nomeEmpresa);

    @Query("SELECT DISTINCT e FROM Empresa e LEFT JOIN FETCH e.empresaNaturezas ORDER BY e.nome ASC")
    List<Empresa> findAllEmpresasWithNaturezasOrderByNomeAsc();

}
