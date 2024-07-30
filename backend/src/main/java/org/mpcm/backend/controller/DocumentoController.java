package org.mpcm.backend.controller;


import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.request.DocumentoRequest;
import org.mpcm.backend.dto.response.DocumentoResponse;
import org.mpcm.backend.service.DocumentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/documentos")
public class DocumentoController {

    private final DocumentoService documentoService;

    @GetMapping
    public ResponseEntity<List<DocumentoResponse>> listar() {
        return ResponseEntity.ok().body(documentoService.listar());
    }

    @GetMapping(path = "/{idDocumento}")
    public ResponseEntity<DocumentoResponse> buscarPorId(@PathVariable Long idDocumento) {
        DocumentoResponse documento = documentoService.buscarPorId(idDocumento);
        return ResponseEntity.ok().body(documento);
    }

    @PostMapping
    public ResponseEntity<DocumentoResponse> salvar(@Valid @RequestBody DocumentoRequest request) {
        DocumentoResponse documento = documentoService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(documento);
    }

    @PutMapping(path = "/{idDocumento}")
    public ResponseEntity<DocumentoResponse> editar(@PathVariable Long idDocumento, @Valid @RequestBody DocumentoRequest request) {
        DocumentoResponse documento = documentoService.editar(idDocumento, request);
        return ResponseEntity.ok().body(documento);
    }

    @DeleteMapping(path = "/{idDocumento}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long idDocumento) {
        documentoService.excluir(idDocumento);
    }

}
