package org.mpcm.backend.dto.mapper;

import org.modelmapper.ModelMapper;
import org.mpcm.backend.dto.request.ProcessoRequest;
import org.mpcm.backend.dto.response.ProcessoResponse;
import org.mpcm.backend.model.Processo;

import java.util.List;
import java.util.stream.Collectors;

public class ProcessoMapper {

    private final static ModelMapper mapper = new ModelMapper();

    public static ProcessoResponse converter(Processo processo) {
        return mapper.map(processo, ProcessoResponse.class);
    }

    public static Processo converter(ProcessoRequest request) {
        return mapper.map(request, Processo.class);
    }

    public static Processo converter(ProcessoResponse response) {
        return mapper.map(response, Processo.class);
    }

    public static List<ProcessoResponse> converter(List<Processo> processos) {
        return processos.stream().map(ProcessoMapper::converter).collect(Collectors.toList());
    }

    public static void copyToProperties(ProcessoRequest request, Processo processo) {
        mapper.map(request, processo);
    }

}
