import { Empresa } from "./Empresa"
import { Natureza } from "./Natureza"

export type EmpresaNatureza = {
    id: number,
    empresa: Empresa,
    natureza: Natureza,
    empresaNome: string,
    naturezaNumero: number,
    empresaCnpj: number,
    empresaId: number,
    naturezaId: number,
    tipoDeGasto: string,
    saldoDisponivel: number,
    valorDoContrato: number,
}

export type EmpresaNaturezaPage = {
    content?: EmpresaNatureza[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}