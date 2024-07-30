package org.mpcm.backend.dto.mapper;

import org.modelmapper.ModelMapper;
import org.mpcm.backend.dto.request.DocumentoRequest;
import org.mpcm.backend.dto.response.DocumentoResponse;
import org.mpcm.backend.model.Documento;

import java.util.List;
import java.util.stream.Collectors;

public class DocumentoMapper {

    private final static ModelMapper mapper = new ModelMapper();

    public static DocumentoResponse converter(Documento documento) {
        return mapper.map(documento, DocumentoResponse.class);
    }

    public static Documento converter(DocumentoRequest request) {
        return mapper.map(request, Documento.class);
    }

    public static Documento converter(DocumentoResponse response) {
        return mapper.map(response, Documento.class);
    }

    public static List<DocumentoResponse> converter(List<Documento> empresas) {
        return empresas.stream().map(DocumentoMapper::converter).collect(Collectors.toList());
    }

    public static void copyToProperties(DocumentoRequest request, Documento documento) {
        mapper.map(request, documento);
    }
}
