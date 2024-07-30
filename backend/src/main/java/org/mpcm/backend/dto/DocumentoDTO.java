package org.mpcm.backend.dto;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class DocumentoDTO {

    private Long id;

    private String nome;

    private String descricao;

    private Boolean recebido;

    private String pagina;

}
