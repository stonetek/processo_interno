package org.mpcm.backend.dto.response;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class NaturezaResponse {

    private Long id;

    private Long numero;

    private String tipoDeGasto;

    private BigDecimal saldoTotal;

    private BigDecimal saldoUsado;
    
    private BigDecimal saldoDisponivel;

    private BigDecimal valorDoContrato;
}