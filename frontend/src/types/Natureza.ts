import { Empresa } from "./Empresa"

export type Natureza = {
    [x: string]: any;
    id: number,
    numero: number,
    tipoDeGasto: string,
    saldoTotal: number,
    saldoUsado: number,
    saldoDisponivel: number,
    empresas: Empresa[]
}

export type NaturezaPage = {
    content?: Natureza[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}