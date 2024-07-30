package org.mpcm.backend.controller;


import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.request.ProcessoRequest;
import org.mpcm.backend.dto.response.ProcessoResponse;
import org.mpcm.backend.model.Processo;
import org.mpcm.backend.service.ProcessoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/processos")
public class ProcessoController {

    private final ProcessoService processoService;

    @GetMapping
    public ResponseEntity<List<ProcessoResponse>> listar() {
        return ResponseEntity.ok().body(processoService.listar());
    }

    @GetMapping(path = "/{idProcesso}")
    public ResponseEntity<ProcessoResponse> buscarPorId(@PathVariable Long idProcesso) {
        ProcessoResponse processo = processoService.buscarPorId(idProcesso);
        return ResponseEntity.ok().body(processo);
    }

    @PostMapping
    public ResponseEntity<ProcessoResponse> salvar(@Valid @RequestBody ProcessoRequest request) {
        ProcessoResponse processo = processoService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(processo);
    }

    @PutMapping(path = "/{idProcesso}")
    public ResponseEntity<ProcessoResponse> editar(@PathVariable Long idProcesso, @Valid @RequestBody ProcessoRequest request) {
        ProcessoResponse processo = processoService.editar(idProcesso, request);
        return ResponseEntity.ok().body(processo);
    }

    @DeleteMapping(path = "/{idProcesso}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long idProcesso) {
        processoService.excluir(idProcesso);
    }

    @GetMapping("/empresas/{id}/processos")
    public ResponseEntity<List<Processo>> getProcessosByEmpresaId(@PathVariable Long id) {
        List<Processo> processos = processoService.getProcessosByEmpresaId(id);
        return ResponseEntity.ok().body(processos);
    }

}
