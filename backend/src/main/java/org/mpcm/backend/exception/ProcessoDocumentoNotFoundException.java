package org.mpcm.backend.exception;

public class ProcessoDocumentoNotFoundException extends EntityNotFoundException{

    private static final long serialVersionUID = 1L;

    public ProcessoDocumentoNotFoundException(String message) {
        super(message);
    }

    public ProcessoDocumentoNotFoundException (Long id) {
        this(String.format("Não existe registro do processo com id:%d", id));
    }
}
