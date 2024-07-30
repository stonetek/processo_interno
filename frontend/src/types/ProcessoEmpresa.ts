import { Empresa } from "./Empresa"
import { Processo } from "./Processo"

export type ProcessoEmpresa = {
    id: number,
    processo: Processo,
    empresa: Empresa,
    empresaNome: string,
    processoNome: string, 
    processoVigente: boolean
}

export type ProcessoEmpresaPage = {
    content?: ProcessoEmpresa[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}