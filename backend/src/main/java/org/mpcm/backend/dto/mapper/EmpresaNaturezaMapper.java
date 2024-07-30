package org.mpcm.backend.dto.mapper;

import org.modelmapper.ModelMapper;
import org.mpcm.backend.dto.request.EmpresaNaturezaRequest;
import org.mpcm.backend.dto.response.EmpresaNaturezaResponse;
import org.mpcm.backend.model.EmpresaNatureza;

import java.util.List;
import java.util.stream.Collectors;

public class EmpresaNaturezaMapper {

    private final static ModelMapper mapper = new ModelMapper();

    public static EmpresaNaturezaResponse converter(EmpresaNatureza empresaNatureza) {
        EmpresaNaturezaResponse response = mapper.map(empresaNatureza, EmpresaNaturezaResponse.class);
        response.setTipoDeGasto(empresaNatureza.getNatureza().getTipoDeGasto());
        response.setValorDoContrato(empresaNatureza.getEmpresa().getValorDoContrato());
        response.setSaldoDisponivel(empresaNatureza.getNatureza().getSaldoDisponivel());
        response.setValorDoContrato(empresaNatureza.getValorDoContrato());

        return response;
    }


    public static EmpresaNatureza converter(EmpresaNaturezaRequest request) {
        return mapper.map(request, EmpresaNatureza.class);
    }

    public static EmpresaNatureza converter(EmpresaNaturezaResponse response) {
        return mapper.map(response, EmpresaNatureza.class);
    }

    public static List<EmpresaNaturezaResponse> converter(List<EmpresaNatureza> empresasNatureza) {
        return empresasNatureza.stream().map(EmpresaNaturezaMapper::converter).collect(Collectors.toList());
    }

    public static void copyToProperties(EmpresaNaturezaRequest request, EmpresaNatureza empresaNatureza) {
        mapper.map(request, empresaNatureza);
        empresaNatureza.setValorDoContrato(request.getValorDoContrato());
    }

}
