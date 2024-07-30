package org.mpcm.backend.service;


import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.EmpresaNaturezaDTO;
import org.mpcm.backend.dto.mapper.EmpresaNaturezaMapper;
import org.mpcm.backend.dto.request.EmpresaNaturezaRequest;
import org.mpcm.backend.dto.response.EmpresaNaturezaResponse;
import org.mpcm.backend.exception.EmpresaNaturezaNotFoundException;
import org.mpcm.backend.model.Empresa;
import org.mpcm.backend.model.EmpresaNatureza;
import org.mpcm.backend.model.Natureza;
import org.mpcm.backend.repository.EmpresaNaturezaRepository;
import org.mpcm.backend.repository.EmpresaRepository;
import org.mpcm.backend.repository.NaturezaRepository;
import org.mpcm.backend.service.util.VinculoUtil;
import org.mpcm.backend.util.ResourceUriUtil;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmpresaNaturezaService {

    private final  VinculoUtil vinculoUtil;

    private final EmpresaNaturezaRepository empresaNaturezaRepository;

    private final EmpresaRepository empresaRepository;

    private final NaturezaRepository naturezaRepository;


    public EmpresaNaturezaResponse salvarExistente(Long idEmpresa, Long idNatureza) {
        Empresa empresa = empresaRepository.findById(idEmpresa)
                .orElseThrow(() -> new EntityNotFoundException("Empresa não encontrada com ID: " + idEmpresa));
        Natureza natureza = naturezaRepository.findById(idNatureza)
                .orElseThrow(() -> new EntityNotFoundException("Natureza não encontrada com ID: " + idNatureza));

        EmpresaNatureza empresaNatureza = new EmpresaNatureza();
        empresaNatureza.setEmpresa(empresa);
        empresaNatureza.setNatureza(natureza);

        empresaNatureza = empresaNaturezaRepository.save(empresaNatureza);
        ResourceUriUtil.addUriInResponseHeader(empresaNatureza.getId());

        return EmpresaNaturezaMapper.converter(empresaNatureza);
    }

    public EmpresaNaturezaResponse buscarPorEmpresaENatureza(Long idEmpresa, Long idNatureza) {
        EmpresaNatureza empresaNatureza = empresaNaturezaRepository.findByEmpresaIdAndNaturezaId(idEmpresa, idNatureza)
                .orElseThrow(() -> new EntityNotFoundException("Combinação Empresa-Natureza não encontrada"));

        return EmpresaNaturezaMapper.converter(empresaNatureza);
    }

    public EmpresaNaturezaResponse editarExistente(Long idEmpresaNatureza, Long idEmpresa, Long idNatureza) {
        EmpresaNatureza empresaNatureza = empresaNaturezaRepository.findById(idEmpresaNatureza)
                .orElseThrow(() -> new EntityNotFoundException("Empresa-Natureza não encontrada com ID: " + idEmpresaNatureza));

        Empresa empresa = empresaRepository.findById(idEmpresa)
                .orElseThrow(() -> new EntityNotFoundException("Empresa não encontrada com ID: " + idEmpresa));
        Natureza natureza = naturezaRepository.findById(idNatureza)
                .orElseThrow(() -> new EntityNotFoundException("Natureza não encontrada com ID: " + idNatureza));

        empresaNatureza.setEmpresa(empresa);
        empresaNatureza.setNatureza(natureza);

        empresaNatureza = empresaNaturezaRepository.save(empresaNatureza);

        return EmpresaNaturezaMapper.converter(empresaNatureza);
    }

    public void excluirExistente(Long idEmpresaNatureza) {
        try {
            empresaNaturezaRepository.deleteById(idEmpresaNatureza);
        } catch (EmptyResultDataAccessException ex) {
            throw new EntityNotFoundException("Empresa-Natureza não encontrada com ID: " + idEmpresaNatureza);
        }
    }


    public List<EmpresaNaturezaDTO> listar() {
        List<EmpresaNatureza> empresasNatureza = empresaNaturezaRepository.findAll();
        List<EmpresaNaturezaDTO> empresasNaturezaDTO = new ArrayList<>();

        for (EmpresaNatureza empresaNatureza : empresasNatureza) {
            EmpresaNaturezaDTO dto = new EmpresaNaturezaDTO();
            dto.setId(empresaNatureza.getId());
            dto.setEmpresaId(empresaNatureza.getEmpresa().getId());
            dto.setEmpresaNome(empresaNatureza.getEmpresa().getNome());
            dto.setNaturezaId(empresaNatureza.getNatureza().getId());
            dto.setNaturezaNumero(empresaNatureza.getNatureza().getNumero());
            dto.setEmpresaCnpj(empresaNatureza.getEmpresa().getCnpj());
            dto.setTipoDeGasto(empresaNatureza.getNatureza().getTipoDeGasto());
            dto.setValorDoContrato(empresaNatureza.getValorDoContrato());
            dto.setSaldoDisponivel(empresaNatureza.getNatureza().getSaldoDisponivel());

            empresasNaturezaDTO.add(dto);
        }

        return empresasNaturezaDTO;
    }

    public EmpresaNaturezaResponse salvar(EmpresaNaturezaRequest request) {
        EmpresaNatureza empresaNatureza = EmpresaNaturezaMapper.converter(request);
        Natureza natureza = naturezaRepository.findNaturezaById(request.getNaturezaId());
        vinculoUtil.atualizaSaldoNatureza(request.getValorDoContrato(), natureza);
        empresaNatureza = empresaNaturezaRepository.save(empresaNatureza);
        naturezaRepository.save(natureza);
        ResourceUriUtil.addUriInResponseHeader(empresaNatureza.getId()); // Adiciona no header da requisição o recurso que foi criado
        return EmpresaNaturezaMapper.converter(empresaNatureza);
    }

    public EmpresaNaturezaResponse buscarPorId(Long idEmpresaNatureza) {
        Optional<EmpresaNatureza> empresaNatureza = empresaNaturezaRepository.findById(idEmpresaNatureza);
        if (empresaNatureza.isEmpty()) {
            throw new EmpresaNaturezaNotFoundException(String.valueOf(idEmpresaNatureza));
        }
        return EmpresaNaturezaMapper.converter(empresaNatureza.get());
    }

    public EmpresaNaturezaResponse editar(Long idEmpresaNatureza, EmpresaNaturezaRequest request) {
        EmpresaNatureza empresaNatureza = empresaNaturezaRepository.findById(idEmpresaNatureza)
                .orElseThrow(() -> new ResourceNotFoundException("Vínculo não encontrado com o ID: " + idEmpresaNatureza));
        Natureza natureza = naturezaRepository.findNaturezaById(empresaNatureza.getNatureza().getId());
        BigDecimal valorAntigo = empresaNatureza.getValorDoContrato();
        natureza.setSaldoDisponivel(natureza.getSaldoDisponivel().add(valorAntigo));
        BigDecimal novoValorContrato = request.getValorDoContrato();
        EmpresaNaturezaMapper.copyToProperties(request, empresaNatureza);
        natureza.setSaldoDisponivel(natureza.getSaldoDisponivel().subtract(novoValorContrato));
        naturezaRepository.save(natureza);
        empresaNatureza = empresaNaturezaRepository.save(empresaNatureza);
        return EmpresaNaturezaMapper.converter(empresaNatureza);
    }

    public Natureza atualizaSaldoNatureza(BigDecimal valor, Natureza natureza){
        natureza.setSaldoDisponivel(natureza.getSaldoDisponivel().subtract(valor));
        return natureza;
    }



    public void excluir(Long idEmpresaNatureza) {
        try {
            empresaNaturezaRepository.deleteById(idEmpresaNatureza);
        } catch (EmptyResultDataAccessException ex) {
            throw new EmpresaNaturezaNotFoundException(String.valueOf(idEmpresaNatureza));
        }
    }

}