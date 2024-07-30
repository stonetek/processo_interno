package org.mpcm.backend.dto.request;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.mpcm.backend.model.Empresa;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class NaturezaRequest {

    private List<Long> idsNaturezas;

    private Long id;

    private Long numero;

    private String tipoDeGasto;

    private BigDecimal saldoTotal;

    private BigDecimal saldoUsado;

    private BigDecimal saldoDisponivel;

    private BigDecimal valorDoContrato;
}
