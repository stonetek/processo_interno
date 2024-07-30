package org.mpcm.backend.dto;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ProcessoDTO {

    private Long id;

    private String numeroDoProcesso;

    private String nome;

    private String descricao;

    private String instrumento;

    private String protocolo;

    private Date inicio;

    private Date fim;

    private List<DocumentoDTO> documentos;
}
