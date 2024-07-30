package org.mpcm.backend.controller;


import lombok.RequiredArgsConstructor;
import org.mpcm.backend.dto.EmpresaDTO;
import org.mpcm.backend.dto.EmpresaWithProcessosENaturezasDTO;
import org.mpcm.backend.dto.mapper.EmpresaMapper;
import org.mpcm.backend.dto.request.EmpresaRequest;
import org.mpcm.backend.dto.response.EmpresaResponse;
import org.mpcm.backend.dto.response.NaturezaResponse;
import org.mpcm.backend.model.Empresa;
import org.mpcm.backend.repository.EmpresaRepository;
import org.mpcm.backend.service.EmpresaService;
import org.mpcm.backend.service.EmpresaServiceFacade;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/empresas")
public class EmpresaController {

    private final EmpresaService empresaService;
    private EmpresaServiceFacade empresaServiceFacade;

    private final EmpresaRepository empresaRepository;


    @GetMapping("/empresas")
    public List<Empresa> getAllEmpresas(@RequestParam(name = "includeNaturezas", defaultValue = "false") boolean includeNaturezas) {
        return empresaServiceFacade.getAllEmpresas(includeNaturezas);
    }

    @GetMapping
    public ResponseEntity<List<EmpresaResponse>> listar() {
        return ResponseEntity.ok().body(empresaService.listar());
    }

    @GetMapping("/{idEmpresa}")
    public ResponseEntity<EmpresaResponse> buscarPorId(@PathVariable Long idEmpresa) {
        EmpresaResponse empresa = empresaService.buscarPorId(idEmpresa);
        return ResponseEntity.ok().body(empresa);
    }

    @PostMapping
    public ResponseEntity<EmpresaResponse> salvar(@Valid @RequestBody EmpresaRequest request) {
        EmpresaResponse empresa = empresaService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(empresa);
    }

    @PutMapping("{idEmpresa}")
    @Transactional
    public EmpresaResponse editar(@PathVariable Long idEmpresa, @Valid @RequestBody EmpresaRequest request) {
        Empresa empresa = empresaRepository.findById(idEmpresa)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa not found with id: " + idEmpresa));
        empresa.setNome(request.getNome());
        empresa.setCnpj(request.getCnpj());
        if (request.getProcessoVigente() != null) {
            empresa.setProcessoVigente(request.getProcessoVigente());
        }
        if (request.getContratoDesde() != null) {
            empresa.setContratoDesde(request.getContratoDesde());
        }
        empresa = empresaRepository.save(empresa);
        EmpresaResponse empresaResponse = EmpresaMapper.converter(empresa);
        return EmpresaMapper.converter(empresa);
    }

    @DeleteMapping("{idEmpresa}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluirEmpresa(@PathVariable Long idEmpresa) {
        empresaService.excluir(idEmpresa);
    }

    @GetMapping("/empresaPorNome")
    public ResponseEntity<Long> buscarIdEmpresaPorNome( @Valid @RequestBody Map<String, String> requestBody) {
        String nomeEmpresa = requestBody.get("nomeEmpresa");
        Long idEmpresa = empresaService.buscarIdPorNome(nomeEmpresa);
        return ResponseEntity.ok(idEmpresa);
    }

    @PostMapping("/dados-com-processos-e-naturezas")
    public ResponseEntity<?> obterDadosEmpresaComProcessosENaturezas(@RequestBody Map<String, String> requestBody) {
        String nomeEmpresa = requestBody.get("nomeEmpresa");
        System.out.println(nomeEmpresa);
        EmpresaDTO empresaDTO = empresaService.obterDadosEmpresaComProcessosENaturezas(nomeEmpresa);
        if (empresaDTO != null) {
            return ResponseEntity.ok(empresaDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Este nome de empresa não está cadastrado no sistema");
        }
    }

}
