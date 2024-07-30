package org.mpcm.backend.dto.mapper;

import lombok.RequiredArgsConstructor;
import org.hibernate.collection.internal.PersistentBag;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.modelmapper.spi.MappingContext;
import org.mpcm.backend.dto.EmpresaDTO;
import org.mpcm.backend.dto.NaturezaDTO;
import org.mpcm.backend.dto.request.DocumentoRequest;
import org.mpcm.backend.dto.request.EmpresaRequest;
import org.mpcm.backend.dto.response.DocumentoResponse;
import org.mpcm.backend.dto.response.EmpresaResponse;
import org.mpcm.backend.dto.response.NaturezaResponse;
import org.mpcm.backend.model.Documento;
import org.mpcm.backend.model.Empresa;
import org.mpcm.backend.model.EmpresaNatureza;
import org.mpcm.backend.model.Natureza;
import org.mpcm.backend.util.CustomModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Component
public class EmpresaMapper {

    private static final ModelMapper mapper = new ModelMapper();
    private static final CustomModelMapper customModelMapper = new CustomModelMapper();

    private static final ModelMapper modelMapper = new ModelMapper();

    static {
        modelMapper.createTypeMap(org.hibernate.collection.internal.PersistentBag.class, List.class);
    }


    public static EmpresaResponse converter(Empresa empresa) {
        empresa.getEmpresaNaturezas().size();
        return modelMapper.map(empresa, EmpresaResponse.class);
    }

    public static List<EmpresaResponse> converter(List<Empresa> empresas) {
        Type listType = new TypeToken<List<EmpresaResponse>>() {}.getType();
        return modelMapper.map(empresas, listType);
    }

    public static Empresa converter(EmpresaRequest request) {
        return modelMapper.map(request, Empresa.class);
    }

    public static Empresa converter(EmpresaResponse response) {
        return modelMapper.map(response, Empresa.class);
    }

    public static void copyToProperties(EmpresaRequest request, Empresa empresa) {
        modelMapper.map(request, empresa);
    }

    //metodo personalizado
    public static EmpresaDTO converte(Empresa empresa) {
        EmpresaDTO dto = new EmpresaDTO();
        dto.setId(empresa.getId());
        dto.setNome(empresa.getNome());

        Set<NaturezaDTO> naturezasDTO = new HashSet<>();
        for (EmpresaNatureza empresaNatureza : empresa.getEmpresaNaturezas()) {
            NaturezaDTO naturezaDTO = new NaturezaDTO();
            naturezaDTO.setId(empresaNatureza.getNatureza().getId());
            naturezasDTO.add(naturezaDTO);
        }
        // Convert Set to List
        List<NaturezaDTO> naturezasList = new ArrayList<>(naturezasDTO);
        dto.setNaturezas(naturezasList);

        return dto;
    }

    public static List<EmpresaDTO> converte(List<Empresa> empresas) {
        List<EmpresaDTO> dtos = new ArrayList<>();
        for (Empresa empresa : empresas) {
            dtos.add(converte(empresa));
        }
        return dtos;
    }



    //Teste**************

    public static EmpresaResponse convertere(Empresa empresa) {
        return mapper.map(empresa, EmpresaResponse.class);
    }

    public static Empresa convertere(EmpresaRequest request) {
        return mapper.map(request, Empresa.class);
    }

    public static Empresa convertere(EmpresaResponse response) {
        return mapper.map(response, Empresa.class);
    }

    public static List<EmpresaResponse> convertere(List<Empresa> empresas) {
        return empresas.stream().map(EmpresaMapper::converter).collect(Collectors.toList());
    }

    public static void copyToPropertiese(EmpresaRequest request, Empresa empresa) {
        mapper.map(request, empresa);
    }
}
