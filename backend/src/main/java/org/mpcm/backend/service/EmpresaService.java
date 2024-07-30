package org.mpcm.backend.service;


import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.mpcm.backend.dto.*;
import org.mpcm.backend.dto.mapper.EmpresaMapper;
import org.mpcm.backend.dto.mapper.NaturezaMapper;
import org.mpcm.backend.dto.request.EmpresaRequest;
import org.mpcm.backend.dto.response.EmpresaResponse;
import org.mpcm.backend.dto.response.NaturezaResponse;
import org.mpcm.backend.dto.response.ProcessoResponse;
import org.mpcm.backend.exception.EmpresaNotFoundException;
import org.mpcm.backend.model.*;
import org.mpcm.backend.repository.EmpresaRepository;
import org.mpcm.backend.repository.ProcessoRepository;
import org.mpcm.backend.util.ResourceUriUtil;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmpresaService {

    private final EmpresaRepository empresaRepository;

    private final EmpresaMapper empresaMapper;

    private final ProcessoRepository processoRepository;


    @Transactional
    public List<Empresa> getAllEmpresas() {
        return empresaRepository.findAll();
    }


    @Transactional
    public List<Empresa> getAllEmpresasWithNaturezas() {
        List<Empresa> empresas = empresaRepository.findAll();
        for (Empresa empresa : empresas) {
            empresa.getEmpresaNaturezas().size();
            empresa.getProcessoEmpresas().size();
        }
        return empresas;
    }

    public EmpresaResponse salvar(EmpresaRequest request) {
        request.setNome(request.getNome().toLowerCase());
        Empresa empresa = EmpresaMapper.converter(request);
        empresa = empresaRepository.save(empresa);
        ResourceUriUtil.addUriInResponseHeader(empresa.getId()); // Adiciona no header da requisição o recurso que foi criado
        return EmpresaMapper.converter(empresa);
    }

    public EmpresaResponse buscarPorId(Long idEmpresa) {
        Optional<Empresa> empresa = empresaRepository.findById(idEmpresa);
        if (empresa.isEmpty()) {
            throw new EmpresaNotFoundException(String.valueOf(idEmpresa));
        }
        return EmpresaMapper.converter(empresa.get());
    }

    public EmpresaResponse editar(Long idEmpresa, EmpresaRequest request) {
        EmpresaResponse empresaEncontrada = buscarPorId(idEmpresa);
        Empresa empresa = EmpresaMapper.converter(empresaEncontrada);
        EmpresaMapper.copyToProperties(request, empresa);
        empresa = empresaRepository.save(empresa);
        return EmpresaMapper.converter(empresa);
    }

    public void excluir(Long idEmpresa) {
        try {
            empresaRepository.deleteById(idEmpresa);
        } catch (EmptyResultDataAccessException ex) {
            throw new EmpresaNotFoundException(String.valueOf(idEmpresa));
        }
    }

    public Long buscarIdPorNome(String nomeEmpresa) {
        Empresa empresa = empresaRepository.findByNome(nomeEmpresa)
                .orElseThrow(() -> new EmpresaNotFoundException("Não existe a empresa " + nomeEmpresa + " no sistema."  ));
        return empresa.getId();
    }

    public EmpresaDTO obterDadosEmpresaComProcessosENaturezas(String nomeEmpresa) {
        List<Empresa> empresasWithNaturezas = empresaRepository.findByNomeContainingIgnoreCase(nomeEmpresa);

        if (!empresasWithNaturezas.isEmpty()) {
            Empresa empresa = empresasWithNaturezas.get(0);
            Hibernate.initialize(empresa.getEmpresaNaturezas());

            List<Processo> processos = empresaRepository.findByNomeEmpresaIgnoreCaseContaining(nomeEmpresa);
            List<Natureza> naturezas = empresa.getEmpresaNaturezas().stream()
                    .map(EmpresaNatureza::getNatureza)
                    .collect(Collectors.toList());

            EmpresaDTO empresaDTO = new EmpresaDTO();
            empresaDTO.setId(empresa.getId());
            empresaDTO.setNome(empresa.getNome());
            empresaDTO.setCnpj(empresa.getCnpj());
            empresaDTO.setProcessos(processos.stream()
                    .map(processo -> {
                        ProcessoDTO processoDTO = new ProcessoDTO();
                        processoDTO.setId(processo.getId());
                        processoDTO.setNumeroDoProcesso(processo.getNumeroDoProcesso());
                        processoDTO.setNome(processo.getNome());
                        processoDTO.setDescricao(processo.getDescricao());
                        processoDTO.setInstrumento(processo.getInstrumento());
                        processoDTO.setProtocolo(processo.getProtocolo());
                        List<Documento> documentos = processoRepository.obterDocumentosDoProcesso(processo.getId());
                        List<DocumentoDTO> documentoDTOs = documentos.stream()
                                .map(documento -> {
                                    DocumentoDTO documentoDTO = new DocumentoDTO();
                                    documentoDTO.setId(documento.getId());
                                    documentoDTO.setNome(documento.getNome());
                                    documentoDTO.setDescricao(documento.getDescricao());
                                    documentoDTO.setPagina(documento.getPagina());
                                    documentoDTO.setRecebido(documento.getRecebido());
                                    return documentoDTO;
                                })
                                .collect(Collectors.toList());
                        processoDTO.setDocumentos(documentoDTOs);
                        return processoDTO;
                    })
                    .collect(Collectors.toList()));
            empresaDTO.setNaturezas(naturezas.stream()
                    .map(natureza -> {
                        NaturezaDTO naturezaDTO = new NaturezaDTO();
                        naturezaDTO.setId(natureza.getId());
                        naturezaDTO.setNumero(natureza.getNumero());
                        naturezaDTO.setTipoDegasto(natureza.getTipoDeGasto());
                        naturezaDTO.setSaldoDisponivel(natureza.getSaldoDisponivel());
                        return naturezaDTO;
                    })
                    .collect(Collectors.toList()));

            return empresaDTO;
        }
        return null;
    }

    public List<EmpresaResponse> listar() {
        List<Empresa> empresas = empresaRepository.findAllEmpresasWithNaturezasOrderByNomeAsc();

        // Convertendo para EmpresaResponse
        List<EmpresaResponse> empresaResponses = new ArrayList<>();
        for (Empresa empresa : empresas) {
            EmpresaResponse empresaResponse = new EmpresaResponse();
            empresaResponse.setId(empresa.getId());
            empresaResponse.setNome(empresa.getNome());
            empresaResponse.setCnpj(empresa.getCnpj());
            empresaResponse.setContratoDesde(empresa.getContratoDesde());

            Date hoje = new Date();
            boolean processoVigente = false;
            for (ProcessoEmpresa processoEmpresa : empresa.getProcessoEmpresas()) {
                if (processoEmpresa.getProcesso().getFim().after(hoje)) {
                    processoVigente = true;
                    break;
                }
            }
            empresaResponse.setProcessoVigente(processoVigente);

            Set<ProcessoResponse> processosResponse = new HashSet<>();
            for (ProcessoEmpresa processoEmpresa : empresa.getProcessoEmpresas()) {
                Processo processo = processoEmpresa.getProcesso();
                ProcessoResponse processoResponse = new ProcessoResponse();
                processoResponse.setId(processo.getId());
                processoResponse.setNome(processo.getNome());
                processoResponse.setDescricao(processo.getDescricao());
                processoResponse.setInstrumento(processo.getInstrumento());
                processoResponse.setProtocolo(processo.getProtocolo());
                processoResponse.setNumeroDoProcesso(processo.getNumeroDoProcesso());
                processoResponse.setInicio(processo.getInicio());
                processoResponse.setFim(processo.getFim());
                processosResponse.add(processoResponse);
            }
            empresaResponse.setProcessos(processosResponse);


            Set<NaturezaResponse> naturezasResponse = new HashSet<>();
            for (EmpresaNatureza empresaNatureza : empresa.getEmpresaNaturezas()) {
                NaturezaResponse naturezaResponse = new NaturezaResponse();
                naturezaResponse.setId(empresaNatureza.getNatureza().getId());
                naturezaResponse.setNumero(empresaNatureza.getNatureza().getNumero());
                naturezaResponse.setTipoDeGasto(empresaNatureza.getNatureza().getTipoDeGasto());
                naturezaResponse.setSaldoTotal(empresaNatureza.getNatureza().getSaldoTotal());
                naturezaResponse.setSaldoUsado(empresaNatureza.getNatureza().getSaldoUsado());
                naturezaResponse.setSaldoDisponivel(empresaNatureza.getNatureza().getSaldoDisponivel());
                naturezaResponse.setValorDoContrato(empresaNatureza.getValorDoContrato());
                naturezasResponse.add(naturezaResponse);
            }
            empresaResponse.setNaturezas(naturezasResponse);

            empresaResponses.add(empresaResponse);
        }

        return empresaResponses;
    }


}
