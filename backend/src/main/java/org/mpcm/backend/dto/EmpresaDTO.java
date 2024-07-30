package org.mpcm.backend.dto;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class EmpresaDTO {

    private Long id;

    private String nome;

    private String cnpj;

    private BigDecimal valorDoContrato;

    private List<ProcessoDTO> processos;

    private List<NaturezaDTO> naturezas;

}
