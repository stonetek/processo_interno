import { Documento } from "./Documento"
import { Empresa } from "./Empresa"
import { Natureza } from "./Natureza"

export type Processo = {
    id: number,
    nome: string,
    descricao: string,
    instrumento: string,
    protocolo: string,
    numeroDoProcesso: string,
    inicio: string,
    fim: string,
    empresa: Empresa,
    natureza: Natureza,
    documentos: Documento[]
}

export type ProcessoPage = {
    content?: Processo[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}