package org.mpcm.backend.controller;

import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.EmpresaNaturezaDTO;
import org.mpcm.backend.dto.request.EmpresaNaturezaRequest;
import org.mpcm.backend.dto.request.NaturezaRequest;
import org.mpcm.backend.dto.response.EmpresaNaturezaResponse;
import org.mpcm.backend.service.EmpresaNaturezaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/empresanatureza")
@RequiredArgsConstructor
public class EmpresaNaturezaController {

    private final EmpresaNaturezaService empresaNaturezaService;

    @GetMapping
    public ResponseEntity<List<EmpresaNaturezaDTO>> listar() {
        List<EmpresaNaturezaDTO> empresasNaturezaDTO = empresaNaturezaService.listar();
        return ResponseEntity.ok().body(empresasNaturezaDTO);
    }


    @GetMapping("/{idEmpresaNatureza}")
    public ResponseEntity<EmpresaNaturezaResponse> buscarPorId(@PathVariable Long idEmpresaNatureza) {
        EmpresaNaturezaResponse empresaNatureza = empresaNaturezaService.buscarPorId(idEmpresaNatureza);
        return ResponseEntity.ok().body(empresaNatureza);
    }

    @PostMapping
    public ResponseEntity<EmpresaNaturezaResponse> salvar(@Valid @RequestBody EmpresaNaturezaRequest request) {
        EmpresaNaturezaResponse empresaNatureza = empresaNaturezaService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(empresaNatureza);
    }

    @PutMapping("/{idEmpresaNatureza}")
    public ResponseEntity<EmpresaNaturezaResponse> editar(@PathVariable Long idEmpresaNatureza, @Valid @RequestBody EmpresaNaturezaRequest request) {
        EmpresaNaturezaResponse empresaNatureza = empresaNaturezaService.editar(idEmpresaNatureza, request);
        return ResponseEntity.ok().body(empresaNatureza);
    }

    @DeleteMapping("/{idEmpresaNatureza}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long idEmpresaNatureza) {
        empresaNaturezaService.excluir(idEmpresaNatureza);
    }

//Novos métodos
    @PostMapping("/salvar-existente")
    public ResponseEntity<EmpresaNaturezaResponse> salvarExistente(@RequestParam("empresaId") Long empresaId,
                                                                   @RequestParam("naturezaId") Long naturezaId) {
        EmpresaNaturezaResponse response = empresaNaturezaService.salvarExistente(empresaId, naturezaId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/buscar-por-empresa-natureza")
    public ResponseEntity<EmpresaNaturezaResponse> buscarPorEmpresaENatureza(@RequestParam("empresaId") Long empresaId,
                                                                             @RequestParam("naturezaId") Long naturezaId) {
        EmpresaNaturezaResponse response = empresaNaturezaService.buscarPorEmpresaENatureza(empresaId, naturezaId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/editar-existente/{idEmpresaNatureza}")
    public ResponseEntity<EmpresaNaturezaResponse> editarExistente(@PathVariable Long idEmpresaNatureza,
                                                                   @RequestParam("empresaId") Long empresaId,
                                                                   @RequestParam("naturezaId") Long naturezaId) {
        EmpresaNaturezaResponse response = empresaNaturezaService.editarExistente(idEmpresaNatureza, empresaId, naturezaId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/excluir-existente/{idEmpresaNatureza}")
    public ResponseEntity<Void> excluirExistente(@PathVariable Long idEmpresaNatureza) {
        empresaNaturezaService.excluirExistente(idEmpresaNatureza);
        return ResponseEntity.noContent().build();
    }


}

