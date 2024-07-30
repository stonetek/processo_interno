package org.mpcm.backend.exception.handler;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@AllArgsConstructor
@Setter
@Getter
public class StandardError {

    @Column(name = "timestamp")
    private Long timestamp;

    @Column(name = "statuscode")
    private Integer statusCode;

    @Column(name = "error")
    private String error;
}

