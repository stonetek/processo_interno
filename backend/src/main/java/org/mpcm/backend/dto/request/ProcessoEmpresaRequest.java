package org.mpcm.backend.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class ProcessoEmpresaRequest {

    private Long id;

    private Long processoId;

    private String processoNome;

    private Long empresaId;

    private String empresaNome;

    private String empresacnpj;

    private Boolean processoVigente;
}
