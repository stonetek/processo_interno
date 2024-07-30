import { Documento } from "./Documento";
import { Processo } from "./Processo";

export type ProcessoDocumento = {
    [x: string]: any;
    id: number,
    processo: Processo,
    documento: Documento,
    documentoNome: string,
    processoNome: string, 
}

export type ProcessoDocumentoPage = {
    content?: ProcessoDocumento[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}