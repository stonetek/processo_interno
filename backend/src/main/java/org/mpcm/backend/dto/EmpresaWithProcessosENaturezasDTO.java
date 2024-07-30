package org.mpcm.backend.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.mpcm.backend.model.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class EmpresaWithProcessosENaturezasDTO {

    private Integer id;
    private Empresa empresa;
    private List<Processo> processos;
    private List<Natureza> naturezas;

    public void setProcessos(List<Processo> processos) {
        this.processos = processos;
    }

    public List<Processo> getProcessos() {
        return processos;
    }

    public void setNaturezas(List<Natureza> naturezas) {
        this.naturezas = naturezas;
    }

    public List<Natureza> getNaturezas() {
        return naturezas;
    }
}
