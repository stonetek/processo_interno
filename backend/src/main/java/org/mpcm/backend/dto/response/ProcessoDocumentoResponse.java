package org.mpcm.backend.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;


@Getter
@Setter
@NoArgsConstructor
public class ProcessoDocumentoResponse {

    private Long id;
    private Long processoId;
    private String processoNome;
    private Long documentoId;
    private String documentoNome;
    private String pagina;
    private Boolean recebido;
}
