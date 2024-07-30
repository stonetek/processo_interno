package org.mpcm.backend.service.util;

import org.mpcm.backend.model.Natureza;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class VinculoUtil {
    public Natureza atualizaSaldoNatureza(BigDecimal valor, Natureza natureza){
        natureza.setSaldoDisponivel(natureza.getSaldoDisponivel().subtract(valor));
        return natureza;
    }
}
