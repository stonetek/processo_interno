package org.mpcm.backend.controller;

import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.request.ProcessoDocumentoRequest;
import org.mpcm.backend.dto.response.ProcessoDocumentoResponse;
import org.mpcm.backend.service.ProcessoDocumentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/processo_documento")
public class ProcessoDocumentoController {

        private final ProcessoDocumentoService processoDocumentoService;

        @GetMapping
        public ResponseEntity<List<ProcessoDocumentoResponse>> listar() {
            return ResponseEntity.ok().body(processoDocumentoService.listar());
        }

        @GetMapping(path = "/{idProcessoDocumento}")
        public ResponseEntity<ProcessoDocumentoResponse> buscarPorId(@PathVariable Long idProcessoDocumento) {
            ProcessoDocumentoResponse documento = processoDocumentoService.buscarPorId(idProcessoDocumento);
            return ResponseEntity.ok().body(documento);
        }

        @PostMapping
        public ResponseEntity<ProcessoDocumentoResponse> salvar(@Valid @RequestBody ProcessoDocumentoRequest request) {
            ProcessoDocumentoResponse documento = processoDocumentoService.salvar(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(documento);
        }

        @PutMapping(path = "/{idProcessoDocumento}")
        public ResponseEntity<ProcessoDocumentoResponse> editar(@PathVariable Long idProcessoDocumento, @Valid @RequestBody ProcessoDocumentoRequest request) {
            ProcessoDocumentoResponse documento = processoDocumentoService.editar(idProcessoDocumento, request);
            return ResponseEntity.ok().body(documento);
        }

        @DeleteMapping(path = "/{idProcessoDocumento}")
        @ResponseStatus(HttpStatus.NO_CONTENT)
        public void excluir(@PathVariable Integer idProcessoDocumento) {
            processoDocumentoService.excluir(idProcessoDocumento);
        }

        @GetMapping(path = "/por-processo/{idProcesso}")
        public ResponseEntity<List<ProcessoDocumentoResponse>> buscarDocumentosPorIdProcesso(@PathVariable Long idProcesso) {
            List<ProcessoDocumentoResponse> documentos = processoDocumentoService.buscarDocumentosPorIdProcesso(idProcesso);
            return ResponseEntity.ok().body(documentos);
        }
}
