package org.mpcm.backend.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;


@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "processo_documento")
public class ProcessoDocumento implements Serializable {

    private static final long Serializable = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "processo_id")
    @JsonManagedReference
    private Processo processo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "documento_id")

    private Documento documento;

    private String processoNome;

    private String documentoNome;

    private String pagina;

    private Boolean recebido;
}
