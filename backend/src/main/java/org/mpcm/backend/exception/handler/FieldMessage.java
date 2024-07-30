package org.mpcm.backend.exception.handler;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class FieldMessage {

    @Column(name = "fieldName")
    private String fieldName;

    @Column(name = "messageError")
    private String messageError;
}

