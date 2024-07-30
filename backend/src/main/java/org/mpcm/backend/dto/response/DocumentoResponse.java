package org.mpcm.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.mpcm.backend.model.Processo;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class DocumentoResponse {

    private Long id;

    private String nome;

    private String descricao;

    private Boolean recebido;

    private String pagina;

}
