package org.mpcm.backend.exception.handler;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ValidationError extends StandardError {
    private List<FieldMessage> erros = new ArrayList<>();

    public ValidationError(Long timestamp, Integer statusCode, String error) {
        super(timestamp, statusCode, error);
    }

    public void addError(String fieldName, String messageError) {
        this.erros.add(new FieldMessage(fieldName, messageError));
    }
}
