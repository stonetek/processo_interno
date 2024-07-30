package org.mpcm.backend.exception;

public class EmpresaNotFoundException extends EntityNotFoundException{

    private static final long serialVersionUID = 1L;

    public EmpresaNotFoundException(String message) {
        super(message);
    }

    public EmpresaNotFoundException(Integer id) {
        this(String.format("Não existe registro da empresa com id:%d", id));
    }
}
