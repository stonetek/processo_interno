package org.mpcm.backend.exception;

public class NaturezaNotFoundException extends EntityNotFoundException{

    private static final long serialVersionUID = 1L;

    public NaturezaNotFoundException(String message) {
        super(message);
    }

    public NaturezaNotFoundException(Integer id) {
        this("Não foi possível encontrar a natureza com o ID: " + id);
    }
}
