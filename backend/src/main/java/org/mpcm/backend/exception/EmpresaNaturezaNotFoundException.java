package org.mpcm.backend.exception;

public class EmpresaNaturezaNotFoundException extends EntityNotFoundException{

    private static final long serialVersionUID = 1L;

    public EmpresaNaturezaNotFoundException(String message) {
        super(message);
    }

    public EmpresaNaturezaNotFoundException (Integer id) {
        this(String.format("Não existe registro do documento com id:%d", id));
    }
}
