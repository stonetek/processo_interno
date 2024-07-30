package org.mpcm.backend.service;

import lombok.RequiredArgsConstructor;
import org.mpcm.backend.model.Empresa;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;




@Service
@RequiredArgsConstructor
public class EmpresaServiceFacade {

    private EmpresaService empresaService;

    @Transactional
    public List<Empresa> getAllEmpresas(boolean includeNaturezas) {
        if (includeNaturezas) {
            return empresaService.getAllEmpresasWithNaturezas();
        } else {
            return empresaService.getAllEmpresas();
        }
    }
}
