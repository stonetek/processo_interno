package org.mpcm.backend.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name= "processo")
@Entity
public class Processo implements java.io.Serializable {

    private static final long Serializable = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "instrumento")
    private String instrumento;

    @Column(name = "protocolo")
    private String protocolo;

    @Column(name = "numero_do_processo")
    private String numeroDoProcesso;

    @Column(name = "inicio")
    private Date inicio;

    @Column(name = "fim")
    private Date fim;

    @JsonIgnore
    @OneToMany(mappedBy = "processo", fetch = FetchType.EAGER)
    private Set<ProcessoEmpresa> processoEmpresas;

    @JsonIgnore
    @OneToMany(mappedBy = "processo", fetch = FetchType.EAGER)
    private Set<ProcessoDocumento> processoDocumentos;
}
