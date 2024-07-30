package org.mpcm.backend.service;


import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.mapper.ProcessoEmpresaMapper;
import org.mpcm.backend.dto.request.ProcessoEmpresaRequest;
import org.mpcm.backend.dto.response.ProcessoEmpresaResponse;
import org.mpcm.backend.exception.ProcessoEmpresaNotFoundException;
import org.mpcm.backend.model.Empresa;
import org.mpcm.backend.model.ProcessoEmpresa;
import org.mpcm.backend.repository.EmpresaRepository;
import org.mpcm.backend.repository.ProcessoEmpresaRepository;
import org.mpcm.backend.util.ResourceUriUtil;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProcessoEmpresaService {

    private final ProcessoEmpresaRepository processoEmpresaRepository;

    private final EmpresaRepository empresaRepository;

    /*public List<ProcessoEmpresaResponse> listar() {
        List<ProcessoEmpresa> processoEmpresa = processoEmpresaRepository.findAll();
        return ProcessoEmpresaMapper.converter(processoEmpresa);
    }*/

    public ProcessoEmpresaResponse salvar(ProcessoEmpresaRequest request) {
        ProcessoEmpresa processoEmpresa = ProcessoEmpresaMapper.converter(request);
        processoEmpresa = processoEmpresaRepository.save(processoEmpresa);
        ResourceUriUtil.addUriInResponseHeader(processoEmpresa.getId()); // Adiciona no header da requisição o recurso que foi criado
        return ProcessoEmpresaMapper.converter(processoEmpresa);
    }

    public ProcessoEmpresaResponse buscarPorId(Long idProcessoEmpresa) {
        Optional<ProcessoEmpresa> processoEmpresa = processoEmpresaRepository.findById(idProcessoEmpresa);
        if (processoEmpresa.isEmpty()) {
            throw new ProcessoEmpresaNotFoundException(String.valueOf(idProcessoEmpresa));
        }
        return ProcessoEmpresaMapper.converter(processoEmpresa.get());
    }

    public ProcessoEmpresaResponse editar(Long idProcessoEmpresa, ProcessoEmpresaRequest request) {
        ProcessoEmpresaResponse processoEmpresaEncontrado = buscarPorId(idProcessoEmpresa);
        ProcessoEmpresa processoEmpresa = ProcessoEmpresaMapper.converter(processoEmpresaEncontrado);
        ProcessoEmpresaMapper.copyToProperties(request, processoEmpresa);
        processoEmpresa = (ProcessoEmpresa) processoEmpresaRepository.save(processoEmpresa);
        return ProcessoEmpresaMapper.converter(processoEmpresa);
    }

    public void excluir(Long idProcessoEmpresa) {
        try {
            processoEmpresaRepository.deleteById(idProcessoEmpresa);
        } catch (EmptyResultDataAccessException ex) {
            throw new ProcessoEmpresaNotFoundException(String.valueOf(idProcessoEmpresa));
        }
    }

    //métodos personalizados

    public List<ProcessoEmpresaResponse> listar() {
        List<ProcessoEmpresa> processoEmpresa = processoEmpresaRepository.findAll();
        List<ProcessoEmpresaResponse> responseList = new ArrayList<>();

        for (ProcessoEmpresa pe : processoEmpresa) {
            ProcessoEmpresaResponse response = new ProcessoEmpresaResponse();
            response.setId(pe.getId());
            response.setProcessoId(pe.getProcesso().getId());
            response.setProcessoNome(pe.getProcesso().getNome());
            response.setEmpresaId(pe.getEmpresa().getId());
            response.setEmpresaNome(pe.getEmpresa().getNome());
            response.setProcessoVigente(pe.getEmpresa().getProcessoVigente());

            // Obter o CNPJ da empresa e configurá-lo na resposta
            Empresa empresa = empresaRepository.findById(pe.getEmpresa().getId()).orElse(null);
            if (empresa != null) {
                response.setEmpresacnpj(empresa.getCnpj());
            }

            responseList.add(response);
        }

        return responseList;
    }

}
