import axios from "axios";
import { Documento } from "../types/Documento";
import { Empresa } from "../types/Empresa";
import { Natureza } from "../types/Natureza";
import { Processo } from "../types/Processo";
import { BASE_URL } from "./requests";
import { EmpresaNatureza } from "../types/EmpresaNatureza";

const id = document.getElementById('id')?.ariaValueText;

const API_URL = BASE_URL;

/*Chamada para documento inicio */
export function fetchDocumento() {
    return axios.get(`${API_URL}/api/documentos`)
}

export async function fetchNewDocumento(Documento: Documento) {
    const response = await axios.post(`${API_URL}/api/documentos/{idDocumento}`)
}

export function fetchEditDocumento() {
    return axios.put(`${API_URL}/api/documentos/${id}`)
}

export function fetchDelDoc() {
    return axios.delete(`${API_URL}/api/documentos/`)
}

/*Chamada para documento fim */


/*Chamada para empresa inicio */
export function fetchEmpresa() {
    return axios.get(`${API_URL}/api/empresas`)
}

export function fetchListarEmpresa() {
    return axios.get(`${API_URL}/empresas`)
}

export async function fetchNewEmpresa(Empresa: Empresa) {
    const response = await axios.post(`${API_URL}/api/empresas/{idEmpresa}`)
}

export function fetchEditEmpresa() {
    return axios.put(`${API_URL}/api/empresas/${id}`)
}

export function fetchDelEmp() {
    return axios.delete(`${API_URL}/api/empresas/`)
}

export function fetchEmpresaProcesso() {
    return axios.get(`${API_URL}/api/empresas/dados-com-processos-e-naturezas`)
}

/*Chamada para empresa fim */


/*Chamada para natureza inicio */

export function fetchNatureza() {
    return axios.get(`${API_URL}/api/naturezadasdespesas`)
}

export async function fetchNewNatureza(Natureza: Natureza) {
    const response = await axios.post(`${API_URL}/api/naturezadasdespesas/{idNatureza}`)
}

export function fetchEditNatureza() {
    return axios.put(`${API_URL}/api/naturezadasdespesas/${id}`)
}

export function fetchDelNat() {
    return axios.delete(`${API_URL}/api/naturezadasdespesas/`)
}

/*Chamada para natureza fim */


/*Chamada para processo inicio */

export function fetchProcesso() {
    return axios.get(`${API_URL}/api/processos`)
}

export async function fetchNewProcesso(Processo: Processo) {
    const response = await axios.post(`${API_URL}/api/processos/{idProcesso}`)
}

export function fetchEditProcesso() {
    return axios.put(`${API_URL}/api/processos/${id}`)
}

export function fetchDelProc() {
    return axios.delete(`${API_URL}/api/processos/`)
}

/*Chamada para processo fim */




/*Chamada para EmpresaNatureza inicio */

export function fetchBond() {
    return axios.get(`${API_URL}/api/empresanatureza`)
}

export async function fetchNewBond(EmpresaNatureza: EmpresaNatureza) {
    const response = await axios.post(`${API_URL}/api/empresanatureza/{idEmpresaNatureza}`)
}

export function fetchEditBond() {
    return axios.put(`${API_URL}/api/empresanatureza/${id}`)
}

export function fetchDelBond() {
    return axios.delete(`${API_URL}/api/empresanatureza`)
}

/*Chamada para EmpresaNatureza fim */


/*Chamada para ProcessoEmpresa inicio */

export function fetchBondPE() {
    return axios.get(`${API_URL}/api/processo_empresa`)
}


/*Chamada para ProcessoEmpresa fim */



/*Chamada para ProcessoDcumento inicio */

export function fetchBondPD() {
    return axios.get(`${API_URL}/api/processo_documento`)
}


/*Chamada para ProcessoDocumento inicio */