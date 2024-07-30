package org.mpcm.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name= "documento")
@Entity
public class Documento implements Serializable {

    private static final long Serializable = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String nome;

    private String descricao;

    private Boolean recebido;

    private String pagina;

    @JsonIgnore
    @OneToMany(mappedBy = "documento", fetch = FetchType.EAGER)
    private List<ProcessoDocumento> processoDocumentos;


}
