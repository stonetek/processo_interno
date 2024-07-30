package org.mpcm.backend.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class EmpresaRequest {

    private Long id;

    private String nome;

    private String cnpj;

    private Date contratoDesde;

    private Boolean processoVigente;

    private BigDecimal valorDoContrato;

    private Set<NaturezaRequest> naturezas;
}
