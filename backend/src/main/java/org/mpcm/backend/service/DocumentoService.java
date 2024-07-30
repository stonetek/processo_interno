package org.mpcm.backend.service;

import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.mapper.DocumentoMapper;
import org.mpcm.backend.dto.request.DocumentoRequest;
import org.mpcm.backend.dto.response.DocumentoResponse;
import org.mpcm.backend.exception.DocumentoNotFoundException;
import org.mpcm.backend.model.Documento;
import org.mpcm.backend.repository.DocumentoRepository;
import org.mpcm.backend.util.ResourceUriUtil;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class DocumentoService {

    private final DocumentoRepository documentoRepository;

    public List<DocumentoResponse> listar() {
        List<Documento> documentos = documentoRepository.findDocumentoByOrderByNomeAsc();
        return DocumentoMapper.converter(documentos);
    }

    public DocumentoResponse salvar(DocumentoRequest request) {
        Documento documento = DocumentoMapper.converter(request);
        documento = documentoRepository.save(documento);
        ResourceUriUtil.addUriInResponseHeader(documento.getId()); // Adiciona no header da requisição o recurso que foi criado
        return DocumentoMapper.converter(documento);
    }

    public DocumentoResponse buscarPorId(Long idDocumento) {
        Optional<Documento> documento = documentoRepository.findById(idDocumento);
        if (documento.isEmpty()) {
            throw new DocumentoNotFoundException(String.valueOf(idDocumento));
        }
        return DocumentoMapper.converter(documento.get());
    }

    public DocumentoResponse editar(Long idDocumento, DocumentoRequest request) {
        DocumentoResponse documentoEncontrado = buscarPorId(idDocumento);
        Documento documento = DocumentoMapper.converter(documentoEncontrado);
        DocumentoMapper.copyToProperties(request, documento);
        documento = documentoRepository.save(documento);
        return DocumentoMapper.converter(documento);
    }

    public void excluir(Long idDocumento) {
        try {
            documentoRepository.deleteById(idDocumento);
        } catch (EmptyResultDataAccessException ex) {
            throw new DocumentoNotFoundException(String.valueOf(idDocumento));
        }
    }

}
