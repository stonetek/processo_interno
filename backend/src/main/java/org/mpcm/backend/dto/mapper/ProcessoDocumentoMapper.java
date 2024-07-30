package org.mpcm.backend.dto.mapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.mpcm.backend.dto.request.ProcessoDocumentoRequest;
import org.mpcm.backend.dto.response.ProcessoDocumentoResponse;
import org.mpcm.backend.model.Documento;
import org.mpcm.backend.model.Processo;
import org.mpcm.backend.model.ProcessoDocumento;

import java.util.List;
import java.util.stream.Collectors;

public class ProcessoDocumentoMapper {


        public final static ModelMapper mapper = new ModelMapper();

        public static ProcessoDocumentoResponse converter(ProcessoDocumento processoDocumento) {
            return mapper.map(processoDocumento, ProcessoDocumentoResponse.class);
        }

        public static ProcessoDocumento converter(ProcessoDocumentoRequest request) {
            return mapper.map(request, ProcessoDocumento.class);
        }

        public static ProcessoDocumento converter(ProcessoDocumentoResponse response) {
            return mapper.map(response, ProcessoDocumento.class);
        }

        public static List<ProcessoDocumentoResponse> converter(List<ProcessoDocumento> processoDocumentos) {
            return processoDocumentos.stream().map(ProcessoDocumentoMapper::converter).collect(Collectors.toList());
        }

    public static ProcessoDocumento fromRequest(ProcessoDocumentoRequest request) {
        ProcessoDocumento processoDocumento = new ProcessoDocumento();
        processoDocumento.setId(request.getId());
        processoDocumento.setProcessoNome(request.getProcessoNome());
        processoDocumento.setDocumentoNome(request.getDocumentoNome());
        processoDocumento.setPagina(request.getPagina());
        processoDocumento.setRecebido(request.getRecebido());

        // Aqui você pode setar os IDs e deixar os objetos Processo e Documento como null
        Processo processo = new Processo();
        processo.setId(request.getProcessoId());
        processoDocumento.setProcesso(processo);

        Documento documento = new Documento();
        documento.setId(request.getDocumentoId());
        processoDocumento.setDocumento(documento);

        return processoDocumento;
    }

    public static ProcessoDocumentoResponse toResponse(ProcessoDocumento processoDocumento) {
        ProcessoDocumentoResponse response = new ProcessoDocumentoResponse();
        response.setId(processoDocumento.getId());
        response.setProcessoId(processoDocumento.getProcesso().getId());
        response.setProcessoNome(processoDocumento.getProcessoNome());
        response.setDocumentoId(processoDocumento.getDocumento().getId());
        response.setDocumentoNome(processoDocumento.getDocumentoNome());
        response.setPagina(processoDocumento.getPagina());
        response.setRecebido(processoDocumento.getRecebido());
        return response;
    }

    public static void updateFromRequest(ProcessoDocumento processoDocumento, ProcessoDocumentoRequest request) {
        processoDocumento.setProcessoNome(request.getProcessoNome());
        processoDocumento.setDocumentoNome(request.getDocumentoNome());
        processoDocumento.setPagina(request.getPagina());
        processoDocumento.setRecebido(request.getRecebido());

        // Aqui você pode atualizar apenas os IDs, mantendo os objetos Processo e Documento como estão
        processoDocumento.getProcesso().setId(request.getProcessoId());
        processoDocumento.getDocumento().setId(request.getDocumentoId());
    }

    static {
        mapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setSkipNullEnabled(true);

        mapper.typeMap(ProcessoDocumentoRequest.class, ProcessoDocumento.class)
                .addMapping(ProcessoDocumentoRequest::getRecebido, ProcessoDocumento::setRecebido)
                .addMapping(ProcessoDocumentoRequest::getPagina, ProcessoDocumento::setPagina)
                .addMappings(m -> {
                    m.map(ProcessoDocumentoRequest::getProcessoId, (dest, value) -> dest.getProcesso().setId((Long) value));
                    m.map(ProcessoDocumentoRequest::getDocumentoId, (dest, value) -> dest.getDocumento().setId((Long) value));
                });
        /*mapper.typeMap(ProcessoDocumentoRequest.class, ProcessoDocumento.class)
                .addMappings(m -> {
                    m.map(ProcessoDocumentoRequest::getRecebido, ProcessoDocumento::setRecebido);
                    m.map(ProcessoDocumentoRequest::getPagina, ProcessoDocumento::setPagina);
                    // Mapeamento para o objeto Processo
                    m.map(ProcessoDocumentoRequest::getProcessoId, (dest, value) -> dest.getProcesso().setId((Integer) value));
                    m.map(ProcessoDocumentoRequest::getProcessoNome, (dest, value) -> dest.getProcesso().setNome((String) value));
                    // Mapeamento para o objeto Documento
                    m.map(ProcessoDocumentoRequest::getDocumentoId, (dest, value) -> dest.getDocumento().setId((Integer) value));
                    m.map(ProcessoDocumentoRequest::getDocumentoNome, (dest, value) -> dest.getDocumento().setNome((String) value));
                }); */
    }

}

