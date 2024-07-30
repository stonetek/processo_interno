package org.mpcm.backend.exception;

public class ProcessoNotFoundException extends EntityNotFoundException{

    private static final long serialVersionUID = 1L;

    public ProcessoNotFoundException(String message) {
        super(message);
    }

    public ProcessoNotFoundException (Integer id) {
        this(String.format("Não existe registro do processo com id:%d", id));
    }
}
