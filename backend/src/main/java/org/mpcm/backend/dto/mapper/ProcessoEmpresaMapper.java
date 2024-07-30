package org.mpcm.backend.dto.mapper;

import org.modelmapper.ModelMapper;
import org.mpcm.backend.dto.request.ProcessoEmpresaRequest;
import org.mpcm.backend.dto.response.ProcessoEmpresaResponse;
import org.mpcm.backend.model.ProcessoEmpresa;

import java.util.List;
import java.util.stream.Collectors;

public class ProcessoEmpresaMapper {

    private final static ModelMapper mapper = new ModelMapper();

    public static ProcessoEmpresaResponse converter(ProcessoEmpresa processoEmpresa) {
        return mapper.map(processoEmpresa, ProcessoEmpresaResponse.class);
    }

    public static ProcessoEmpresa converter(ProcessoEmpresaRequest request) {
        return mapper.map(request, ProcessoEmpresa.class);
    }

    public static ProcessoEmpresa converter(ProcessoEmpresaResponse response) {
        return mapper.map(response, ProcessoEmpresa.class);
    }

    public static List<ProcessoEmpresaResponse> converter(List<ProcessoEmpresa> processoEmpresas) {
        return processoEmpresas.stream().map(ProcessoEmpresaMapper::converter).collect(Collectors.toList());
    }

    public static void copyToProperties(ProcessoEmpresaRequest request, ProcessoEmpresa processoEmpresa) {
        mapper.map(request, processoEmpresa);
    }
}
