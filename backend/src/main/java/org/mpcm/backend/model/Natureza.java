package org.mpcm.backend.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "natureza")
@Entity
public class Natureza implements java.io.Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private Long numero;

    @Column(name = "tipo_de_gasto")
    private String tipoDeGasto;

    private BigDecimal saldoTotal;

    private BigDecimal saldoUsado;

    private BigDecimal saldoDisponivel;

    @JsonIgnore
    @OneToMany(mappedBy = "natureza", fetch = FetchType.EAGER)
    private List<EmpresaNatureza> empresaNaturezas;

}

