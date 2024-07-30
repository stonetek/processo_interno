package org.mpcm.backend.controller;


import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.request.ProcessoDocumentoRequest;
import org.mpcm.backend.dto.request.ProcessoEmpresaRequest;
import org.mpcm.backend.dto.response.ProcessoDocumentoResponse;
import org.mpcm.backend.dto.response.ProcessoEmpresaResponse;
import org.mpcm.backend.service.ProcessoEmpresaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/processo_empresa")
public class ProcessoEmpresaController {

    private final ProcessoEmpresaService processoEmpresaService;

    @GetMapping
    public ResponseEntity<List<ProcessoEmpresaResponse>> listar() {
        return ResponseEntity.ok().body(processoEmpresaService.listar());
    }

    @GetMapping(path = "/{idProcessoEmpresa}")
    public ResponseEntity<ProcessoEmpresaResponse> buscarPorId(@PathVariable Long idProcessoEmpresa) {
        ProcessoEmpresaResponse empresa = processoEmpresaService.buscarPorId(idProcessoEmpresa);
        return ResponseEntity.ok().body(empresa);
    }

    @PostMapping
    public ResponseEntity<ProcessoEmpresaResponse> salvar(@Valid @RequestBody ProcessoEmpresaRequest request) {
        ProcessoEmpresaResponse empresa = processoEmpresaService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(empresa);
    }

    @PutMapping(path = "/{idProcessoEmpresa}")
    public ResponseEntity<ProcessoEmpresaResponse> editar(@PathVariable Long idProcessoEmpresa, @Valid @RequestBody ProcessoEmpresaRequest request) {
        ProcessoEmpresaResponse empresa = processoEmpresaService.editar(idProcessoEmpresa, request);
        return ResponseEntity.ok().body(empresa);
    }

    @DeleteMapping(path = "/{idProcessoEmpresa}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long idProcessoEmpresa) {
        processoEmpresaService.excluir(idProcessoEmpresa);
    }
}
