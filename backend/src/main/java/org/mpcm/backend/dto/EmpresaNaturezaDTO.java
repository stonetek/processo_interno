package org.mpcm.backend.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class EmpresaNaturezaDTO {

    private Long id;

    private Long empresaId;

    private String empresaNome;

    private Long naturezaId;

    private Long naturezaNumero;

    private String empresaCnpj;

    private String tipoDeGasto;

    private BigDecimal valorDoContrato;

    private BigDecimal saldoDisponivel;
}
