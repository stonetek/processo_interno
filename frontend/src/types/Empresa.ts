//import { Natureza } from "./Natureza"

export type Empresa = {
    [x: string]: any;
    id: number,
    nome: string,
    cnpj: string,
    contratoDesde: string,
    processoVigente: boolean,
    valorDoContrato: number
    
    
    /*_links: {
        self: {
          href: string;
        };
        empresa: {
          href: string;
        };
        processoEmpresas: {
          href: string;
        };
        empresaNaturezas: {
          href: string;
        };
      };
    id: number;*/
}


export type EmpresaPage = {
    content?: Empresa[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}