package org.mpcm.backend.service;


import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.mapper.DocumentoMapper;
import org.mpcm.backend.dto.mapper.NaturezaMapper;
import org.mpcm.backend.dto.mapper.ProcessoMapper;
import org.mpcm.backend.dto.request.DocumentoRequest;
import org.mpcm.backend.dto.request.NaturezaRequest;
import org.mpcm.backend.dto.request.ProcessoRequest;
import org.mpcm.backend.dto.response.NaturezaResponse;
import org.mpcm.backend.dto.response.ProcessoResponse;
import org.mpcm.backend.exception.DocumentoNotFoundException;
import org.mpcm.backend.exception.EmpresaNotFoundException;
import org.mpcm.backend.exception.NaturezaNotFoundException;
import org.mpcm.backend.exception.ProcessoNotFoundException;
import org.mpcm.backend.model.*;
import org.mpcm.backend.repository.*;
import org.mpcm.backend.util.ResourceUriUtil;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.*;
import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class ProcessoService {

    private final ProcessoRepository processoRepository;
    private final EmpresaRepository empresaRepository;
    private final NaturezaRepository naturezaRepository;
    private final DocumentoRepository documentoRepository;
    private final ProcessoDocumentoRepository processoDocumentoRepository;



    public List<ProcessoResponse> listar() {
        List<Processo> processos = processoRepository.findAllProcessoByOrderByNomeAsc();
        return ProcessoMapper.converter(processos);
    }

    public ProcessoResponse salvar(ProcessoRequest request) {
        Processo processo = ProcessoMapper.converter(request);
        processo = processoRepository.save(processo);
        ResourceUriUtil.addUriInResponseHeader(processo.getId());
        return ProcessoMapper.converter(processo);
    }

    public ProcessoResponse buscarPorId(Long idProcesso) {
        Optional<Processo> processo = processoRepository.findById(idProcesso);
        if (processo.isEmpty()) {
            throw new ProcessoNotFoundException(String.valueOf(idProcesso));
        }
        return ProcessoMapper.converter(processo.get());
    }

    public ProcessoResponse editar(Long idProcesso, ProcessoRequest request) {
        ProcessoResponse processoEncontrado = buscarPorId(idProcesso);
        Processo processo = ProcessoMapper.converter(processoEncontrado);
        ProcessoMapper.copyToProperties(request, processo);
        processo = processoRepository.save(processo);
        return ProcessoMapper.converter(processo);
    }

    public void excluir(Long idProcesso) {
        try {
            processoRepository.deleteById(idProcesso);
        } catch (EmptyResultDataAccessException ex) {
            throw new ProcessoNotFoundException(String.valueOf(idProcesso));
        }
    }

    public List<Processo> getProcessosByEmpresaId(Long empresaId) {
        return processoRepository.findByEmpresaId(empresaId);
    }

}
