package org.mpcm.backend.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;


@Getter
@Setter
@NoArgsConstructor
public class EmpresaNaturezaResponse {

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
