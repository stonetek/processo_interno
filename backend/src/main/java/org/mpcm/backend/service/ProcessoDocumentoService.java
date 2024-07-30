package org.mpcm.backend.service;


import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.mapper.ProcessoDocumentoMapper;
import org.mpcm.backend.dto.request.ProcessoDocumentoRequest;
import org.mpcm.backend.dto.response.ProcessoDocumentoResponse;
import org.mpcm.backend.exception.ProcessoDocumentoNotFoundException;
import org.mpcm.backend.model.ProcessoDocumento;
import org.mpcm.backend.repository.DocumentoRepository;
import org.mpcm.backend.repository.ProcessoDocumentoRepository;
import org.mpcm.backend.repository.ProcessoRepository;
import org.mpcm.backend.util.ResourceUriUtil;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class ProcessoDocumentoService {

    private final ProcessoDocumentoRepository processoDocumentoRepository;

    private final ProcessoRepository processoRepository;

    private final DocumentoRepository documentoRepository;

    public List<ProcessoDocumentoResponse> listar() {
        List<ProcessoDocumento> processoDocumentos = processoDocumentoRepository.findAll();

        List<ProcessoDocumentoResponse> responses = new ArrayList<>();
        for (ProcessoDocumento processoDocumento : processoDocumentos) {
            ProcessoDocumentoResponse response = new ProcessoDocumentoResponse();
            response.setId(processoDocumento.getId());
            response.setProcessoId(processoDocumento.getProcesso().getId());
            response.setDocumentoId(processoDocumento.getDocumento().getId());
            response.setProcessoNome(processoDocumento.getProcessoNome());
            response.setDocumentoNome(processoDocumento.getDocumentoNome());
            response.setPagina(processoDocumento.getPagina());
            response.setRecebido(processoDocumento.getRecebido());
            responses.add(response);
        }

        return responses;
    }


    public ProcessoDocumentoResponse salvar(ProcessoDocumentoRequest request) {
        ProcessoDocumento processoDocumento = ProcessoDocumentoMapper.converter(request);
        processoDocumento = (ProcessoDocumento) processoDocumentoRepository.save(processoDocumento);
        ResourceUriUtil.addUriInResponseHeader(processoDocumento.getId()); // Adiciona no header da requisição o recurso que foi criado
        return ProcessoDocumentoMapper.converter(processoDocumento);
    }

    public ProcessoDocumentoResponse buscarPorId(Long idProcessoDocumento) {
        Optional<ProcessoDocumento> processoDocumento = processoDocumentoRepository.findById(idProcessoDocumento);
        if (processoDocumento.isEmpty()) {
            throw new ProcessoDocumentoNotFoundException(idProcessoDocumento);
        }
        return ProcessoDocumentoMapper.converter(processoDocumento.get());
    }

    public ProcessoDocumentoResponse editar(Long idProcessoDocumento, ProcessoDocumentoRequest request) {
        ProcessoDocumento processoDocumentoEncontrado = processoDocumentoRepository.findById(idProcessoDocumento)
                .orElseThrow(() -> new NoSuchElementException("Processo Documento não encontrado com ID: " + idProcessoDocumento));

        ProcessoDocumentoMapper.updateFromRequest(processoDocumentoEncontrado, request);

        processoDocumentoEncontrado = processoDocumentoRepository.save(processoDocumentoEncontrado);
        return ProcessoDocumentoMapper.toResponse(processoDocumentoEncontrado);
    }

    public void excluir(Integer idProcessoDocumento) {
        try {
            processoDocumentoRepository.deleteById(Long.valueOf(idProcessoDocumento));
        } catch (EmptyResultDataAccessException ex) {
            throw new ProcessoDocumentoNotFoundException(String.valueOf(idProcessoDocumento));
        }
    }

    public List<ProcessoDocumentoResponse> buscarDocumentosPorIdProcesso(Long idProcesso) {
        List<ProcessoDocumento> processoDocumentos = processoDocumentoRepository.findByProcessoId(idProcesso);
        List<ProcessoDocumentoResponse> documentosResponse = new ArrayList<>();

        for (ProcessoDocumento processoDocumento : processoDocumentos) {
            ProcessoDocumentoResponse documentoResponse = new ProcessoDocumentoResponse();
            documentoResponse.setId(processoDocumento.getId());
            documentoResponse.setProcessoId(processoDocumento.getProcesso() != null ? processoDocumento.getProcesso().getId() : null);
            documentoResponse.setProcessoNome(processoDocumento.getProcessoNome());
            documentoResponse.setDocumentoId(processoDocumento.getDocumento() != null ? processoDocumento.getDocumento().getId() : null);
            documentoResponse.setDocumentoNome(processoDocumento.getDocumentoNome());
            documentoResponse.setPagina(processoDocumento.getPagina());
            documentoResponse.setRecebido(processoDocumento.getRecebido());
            documentosResponse.add(documentoResponse);
        }

        return documentosResponse;
    }

}