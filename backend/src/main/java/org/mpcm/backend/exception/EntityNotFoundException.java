package org.mpcm.backend.exception;

public class EntityNotFoundException extends BusinessException {

    private static final long serialVersionUID = 1L;

    public EntityNotFoundException(String message) {
        super(message);
    }

    public EntityNotFoundException(String entityName, Integer id) {
        this(String.format("Não foi possível encontrar %s com o ID: %d", entityName, id));
    }

    public EntityNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
