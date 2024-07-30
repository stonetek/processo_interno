import { Processo } from "./Processo";

export type Documento = {
    id: number,
    nome: string,
    descricao: string,
    processo: Processo,
    pagina: string,
    recebido: boolean
}

export type DocumentoPage = {
    content?: Documento[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}