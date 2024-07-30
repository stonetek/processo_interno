package org.mpcm.backend.exception;

public class ProcessoEmpresaNotFoundException extends EntityNotFoundException{

    private static final long serialVersionUID = 1L;

    public ProcessoEmpresaNotFoundException(String message) {
        super(message);
    }

    public ProcessoEmpresaNotFoundException (Long id) {
        this(String.format("Não existe registro do processo com id:%d", id));
    }
}
