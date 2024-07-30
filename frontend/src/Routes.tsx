import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Documento from "./pages/documento/Documento";
import Natureza from "./pages/Naturesa das Despesas/NaturezaDasDespesas";
import Empresa from "./pages/empresa/Empresa";
import Checklist from "./pages/checkList/checklist";
import Processos from "./pages/processo/Process";
import Vinculos from "./pages/EmpresasNaturezas/Vinculos";
import NewProcess from "./pages/processo/NovoProcesso/NewProcess";
import NewCompany from "./pages/empresa/new company/NewCompany";
import NewDocument from "./pages/documento/newdocument/NewDocument";
import NewNatureza from "./pages/Naturesa das Despesas/newnaturezadasdespesas/NewNatureza";
import NewBondEN from "./pages/EmpresasNaturezas/newbond/NewBondEN";
import NewBondPD from "./pages/EmpresasNaturezas/newbond/NewBondPD";
import NewBondPE from "./pages/EmpresasNaturezas/newbond/NewBondPE";
import PesquisaEmpresa from "./pages/checkList/BuscaEmpresa";
import NewBond from "./pages/EmpresasNaturezas/newbond/NewBond";

function Routers () {
    return (
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Home/>} />
            <Route path= '/processos' element={<Processos/>} />
            <Route path= '/processos/new/:processoID' element={<NewProcess/>} />
            <Route path= '/processos/:processoID' element={<NewProcess/>} />
            <Route path='/empresas' element={<Empresa/>} />
            <Route path='/empresas/new/:empresaID' element={<NewCompany/>} />
            <Route path='/empresas/:empresaID' element={<NewCompany/>} />
            <Route path='/documentos' element={<Documento/>} />
            <Route path='/documentos/new/:documentoID' element={<NewDocument/>} />
            <Route path='/documentos/:documentoID' element={<NewDocument/>} />
            <Route path='/naturezadasdespesas' element={<Natureza/>} />
            <Route path='/naturezadasdespesas/new/:naturezaID' element={<NewNatureza/>} />
            <Route path='/naturezadasdespesas/:naturezaID' element={<NewNatureza/>} />
            <Route path='/vinculos' element={<Vinculos/>} />
            <Route path='/empresadespesa/new/:vinculoID' element={<NewBondEN/>} />
            {/*<Route path='/empresadespesa/:vinculoID' element={<NewBondEN/>} />*/}
            <Route path='/empresadespesa/:vinculoID' element={<NewBond/>} />
            <Route path='/processoDocumento/new/:vinculoID' element={<NewBondPD/>} />
            <Route path='/processoDocumento/:vinculoID' element={<NewBondPD/>} />
            <Route path='/processoEmpresa/new/:vinculoID' element={<NewBondPE/>} />
            <Route path='/checklist' element={<Checklist/>} />
            <Route path='/pesquisaEmpresa' element={<PesquisaEmpresa/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;