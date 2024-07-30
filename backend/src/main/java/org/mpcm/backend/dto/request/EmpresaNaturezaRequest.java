package org.mpcm.backend.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class EmpresaNaturezaRequest {

    private Long id;

    private Long empresaId;

    private String empresaNome;

    private Long naturezaId;

    private Integer naturezaNumero;

    private String empresaCnpj;

    private String tipoDeGasto;

    private BigDecimal valorDoContrato;

    private BigDecimal saldoDisponivel;
}
