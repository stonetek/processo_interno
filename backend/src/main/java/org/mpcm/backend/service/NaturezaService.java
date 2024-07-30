package org.mpcm.backend.service;


import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.mapper.NaturezaMapper;
import org.mpcm.backend.dto.request.NaturezaRequest;
import org.mpcm.backend.dto.response.NaturezaResponse;
import org.mpcm.backend.exception.NaturezaNotFoundException;
import org.mpcm.backend.model.Natureza;
import org.mpcm.backend.repository.NaturezaRepository;
import org.mpcm.backend.util.ResourceUriUtil;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NaturezaService {

    private final NaturezaRepository naturezaRepository;

    public List<NaturezaResponse> listar() {
        List<Natureza> naturezas = naturezaRepository.findAllNaturezaByOrderByNumero(); // Alterado para corresponder ao método da interface repository de Natureza
        return NaturezaMapper.converter(naturezas); // Alterado para corresponder ao mapeador de Natureza
    }

    public NaturezaResponse salvar(NaturezaRequest request) {
        Natureza natureza = NaturezaMapper.converter(request); // Alterado para corresponder ao mapeador de Natureza
        natureza = naturezaRepository.save(natureza); // Alterado para corresponder ao repositório de Natureza
        ResourceUriUtil.addUriInResponseHeader(natureza.getId()); // Adiciona no header da requisição o recurso que foi criado
        return NaturezaMapper.converter(natureza); // Alterado para corresponder ao mapeador de Natureza
    }

    public NaturezaResponse buscarPorId(Long idNatureza) {
        Optional<Natureza> natureza = naturezaRepository.findById(idNatureza); // Alterado para corresponder ao repositório de Natureza
        if (natureza.isEmpty()) {
            throw new NaturezaNotFoundException(String.valueOf(idNatureza)); // Alterado para corresponder à exceção de Natureza
        }
        return NaturezaMapper.converter(natureza.get()); // Alterado para corresponder ao mapeador de Natureza
    }

    public NaturezaResponse editar(Long idNatureza, NaturezaRequest request) {
        NaturezaResponse naturezaEncontrada = buscarPorId(idNatureza);
        Natureza natureza = NaturezaMapper.converter(naturezaEncontrada); // Alterado para corresponder ao mapeador de Natureza
        NaturezaMapper.copyToProperties(request, natureza); // Alterado para corresponder ao mapeador de Natureza
        natureza = naturezaRepository.save(natureza); // Alterado para corresponder ao repositório de Natureza
        return NaturezaMapper.converter(natureza); // Alterado para corresponder ao mapeador de Natureza
    }

    public void excluir(Long idNatureza) {
        try {
            naturezaRepository.deleteById(idNatureza); // Alterado para corresponder ao repositório de Natureza
        } catch (EmptyResultDataAccessException ex) {
            throw new NaturezaNotFoundException(String.valueOf(idNatureza)); // Alterado para corresponder à exceção de Natureza
        }
    }

    public Long buscarIdPorNumero(Long numero) {
        Natureza natureza = naturezaRepository.findByNumero(numero)
                .orElseThrow(() -> new NaturezaNotFoundException("Natureza não encontrada com número: " + numero));
        return natureza.getId();
    }

    public Long buscarIdPorTipoDeGasto(String tipoDeGasto) {
        Natureza natureza = naturezaRepository.findByTipoDeGasto(tipoDeGasto)
                .orElseThrow(() -> new NaturezaNotFoundException("Natureza não encontrada com tipo de gasto: " + tipoDeGasto));
        return natureza.getId();
    }


}
