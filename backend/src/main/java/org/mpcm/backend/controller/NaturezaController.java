package org.mpcm.backend.controller;


import lombok.RequiredArgsConstructor;

import org.mpcm.backend.dto.request.NaturezaRequest;
import org.mpcm.backend.dto.response.NaturezaResponse;
import org.mpcm.backend.service.NaturezaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/naturezadasdespesas")
public class NaturezaController {

    private final NaturezaService naturezaService;

    @GetMapping
    public ResponseEntity<List<NaturezaResponse>> listar() {
        List<NaturezaResponse> naturezas = naturezaService.listar();
        return ResponseEntity.ok().body(naturezas);
    }

    @GetMapping("/{idNatureza}")
    public ResponseEntity<NaturezaResponse> buscarPorId(@PathVariable Long idNatureza) {
        NaturezaResponse natureza = naturezaService.buscarPorId(idNatureza);
        return ResponseEntity.ok().body(natureza);
    }

    @PostMapping
    public ResponseEntity<NaturezaResponse> salvar(@Valid @RequestBody NaturezaRequest request) {
        NaturezaResponse natureza = naturezaService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(natureza);
    }

    @PutMapping("/{idNatureza}")
    public ResponseEntity<NaturezaResponse> editar(@PathVariable Long idNatureza, @Valid @RequestBody NaturezaRequest request) {
        NaturezaResponse natureza = naturezaService.editar(idNatureza, request);
        return ResponseEntity.ok().body(natureza);
    }

    @DeleteMapping("/{idNatureza}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluirNatureza(@PathVariable Long idNatureza) {
        naturezaService.excluir(idNatureza);
    }

    @GetMapping("/buscarPorNumero")
    public ResponseEntity<Long> buscarIdPorNumero(@RequestBody Map<String, Long> requestBody) {
        Long numero = requestBody.get("numero");
        Long idNatureza = naturezaService.buscarIdPorNumero(numero);
        return ResponseEntity.ok(idNatureza);
    }

    @GetMapping("/buscarPorTipoDeGasto")
    public ResponseEntity<Long> buscarIdPorTipoDeGasto(@RequestBody Map<String, String> requestBody) {
        String tipoDeGasto = requestBody.get("tipoDeGasto");
        Long idNatureza = naturezaService.buscarIdPorTipoDeGasto(tipoDeGasto);
        return ResponseEntity.ok(idNatureza);
    }



}
