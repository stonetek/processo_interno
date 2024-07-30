package org.mpcm.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class ErrorDTO {

    private Integer status;
    private String message;
    private Date timestamp;
}
