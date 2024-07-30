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
public class NaturezaDTO {
    private Long id;

    private String tipoDegasto;

    private Long numero;

    private BigDecimal saldoDisponivel;

    private BigDecimal saldoTotal;

    private BigDecimal SaldoUsado;
}
