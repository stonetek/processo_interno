package org.mpcm.backend.util;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class CustomModelMapper extends ModelMapper {

    public CustomModelMapper() {
        // Configure o ModelMapper para usar estratégia de correspondência estrita
        super();
        this.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // Registre um conversor personalizado para lidar com a conversão de tipos de coleção
        this.createTypeMap(org.hibernate.collection.internal.PersistentBag.class, Set.class);
        this.addConverter(context -> {
            if (context.getSource() == null) {
                return null;
            }
            return context.getSource();
        });
    }
}
