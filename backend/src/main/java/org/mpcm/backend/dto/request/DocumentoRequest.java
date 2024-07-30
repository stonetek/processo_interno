package org.mpcm.backend.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class DocumentoRequest {

    private Long id;

    private String nome;

    private String descricao;

    private Boolean recebido;

    private String pagina;

}
