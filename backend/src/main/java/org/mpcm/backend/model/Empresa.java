package org.mpcm.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name= "empresa")
@Entity
@NamedEntityGraph(name = "empresaWithNaturezas", attributeNodes = @NamedAttributeNode("empresaNaturezas"))
public class Empresa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(length = 255)
    private String nome;

    @Column(length = 18)
    private String cnpj;


    @Column(name = "contrato_desde")
    private Date contratoDesde;


    @Column(name = "processo_vigente")
    private Boolean processoVigente;

    @Column(name = "valor_do_contrato")
    private BigDecimal valorDoContrato;

    @JsonManagedReference
    @OneToMany(mappedBy = "empresa", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<EmpresaNatureza> empresaNaturezas;

    @JsonIgnore
    @OneToMany(mappedBy = "empresa", fetch = FetchType.EAGER)
    private List<ProcessoEmpresa> processoEmpresas;

}

