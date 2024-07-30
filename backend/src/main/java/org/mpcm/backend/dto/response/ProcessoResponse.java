package org.mpcm.backend.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class ProcessoResponse {
    
    private Long id;

    private String nome;

    private String descricao;

    private String instrumento;

    private String protocolo;

    private String numeroDoProcesso;

    private String empresaNome;

    private Date inicio;

    private Date fim;

}

