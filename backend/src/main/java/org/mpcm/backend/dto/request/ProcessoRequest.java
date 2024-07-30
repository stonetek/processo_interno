package org.mpcm.backend.dto.request;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.mpcm.backend.model.Documento;
import org.mpcm.backend.model.Empresa;
import org.mpcm.backend.model.EmpresaNatureza;
import org.mpcm.backend.model.Natureza;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class ProcessoRequest {

    private Long id;

    private String nome;

    private String descricao;

    private String instrumento;

    private String protocolo;

    private String numeroDoProcesso;

    private Empresa empresa;

    private Date inicio;

    private Date fim;

    private Set<DocumentoRequest> documentos = new HashSet<>();
}
