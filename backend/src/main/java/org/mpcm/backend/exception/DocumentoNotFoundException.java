package org.mpcm.backend.exception;

public class DocumentoNotFoundException extends EntityNotFoundException{

    private static final long serialVersionUID = 1L;

    public DocumentoNotFoundException(String message) {
        super(message);
    }

    public DocumentoNotFoundException (Integer id) {
        this(String.format("Não existe registro do documento com id:%d", id));
    }

}
