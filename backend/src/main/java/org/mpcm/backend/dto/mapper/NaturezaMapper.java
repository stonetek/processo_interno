package org.mpcm.backend.dto.mapper;

import org.modelmapper.ModelMapper;
import org.mpcm.backend.dto.request.NaturezaRequest;
import org.mpcm.backend.dto.response.NaturezaResponse;
import org.mpcm.backend.model.Natureza;

import java.util.List;
import java.util.stream.Collectors;

public class NaturezaMapper {

    private final static ModelMapper mapper = new ModelMapper();

    public static NaturezaResponse converter(Natureza natureza) {
        return mapper.map(natureza, NaturezaResponse.class);
    }

    public static Natureza converter(NaturezaRequest request) {
        return mapper.map(request, Natureza.class);
    }

    public static Natureza converter(NaturezaResponse response) {
        return mapper.map(response, Natureza.class);
    }

    public static List<NaturezaResponse> converter(List<Natureza> naturezas) {
        return naturezas.stream().map(NaturezaMapper::converter).collect(Collectors.toList());
    }

    public static void copyToProperties(NaturezaRequest request, Natureza natureza) {
        mapper.map(request, natureza);
    }

    public static NaturezaResponse toResponse(Natureza natureza) {
        NaturezaResponse response = new NaturezaResponse();
        response.setId(natureza.getId());
        response.setNumero(natureza.getNumero());
        response.setTipoDeGasto(natureza.getTipoDeGasto());
        return response;
    }

}
