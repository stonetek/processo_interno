import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { BsPencil } from "react-icons/bs";
import { BiSelection } from "react-icons/bi";
import { Empresa } from "../../types/Empresa";
import { formatLocalDate } from "../../utils/format";
import { FcSearch } from "react-icons/fc";
import jsPDF from 'jspdf';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import 'jspdf-autotable';
import { fetchEmpresa } from "../../utils/api";


function DataTableEmp () {

      const [empresa, setEmpresa] = useState<Empresa[]>([]);
      const [search, setSearch] = useState('');
      const lowerSearch = search.toUpperCase();
      const empresaSearch = empresa.filter((empresa) => empresa.
      nome.toUpperCase().includes(lowerSearch));
      const [currentPage, setCurrentPage] = useState(1);
      const [docsPerPage, setDocsPerPage] = useState(7);

      useEffect(() => {
        fetchEmpresa().then(response => setEmpresa(response.data))
          .catch(error => console.log(error))
      }, []);

        
      const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

      const indexOfLastDoc = currentPage * docsPerPage;
      const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
      const currentDocs = empresaSearch.slice(indexOfFirstDoc, indexOfLastDoc);

      const handleCreatePDF = (data: { nome: string; cnpj: string | string[]; contratoDesde: string; processoVigente: any; }[]) => {
        const doc = new jsPDF();
        let yPos = 20;

        const tableColumns = ["NOME", "CNPJ", "CONTRATO DESDE", "PROCESSO VIGENTE"]

        const imgPath = '../../../public/img/mpcm2.JPG';
        doc.addImage(imgPath, 'JPG', 30, 5, 30, 10);      
        doc.text("CONTROLE INTERNO - EMPRESAS",65,10)
    
        doc.autoTable({
          startY: 20,
          head: [tableColumns],
          body: data.map(emp => [emp.nome.toUpperCase(), emp.cnpj, formatLocalDate(emp.contratoDesde, 'dd/MM/yyyy'), emp.processoVigente ? 'SIM' : 'NÃO']),
          createdRow: (row, dataRowIndex) => {
            if (dataRowIndex % 2 === 0) {
              doc.setFillColor(240, 240, 240);
              doc.setTextColor(0);
              doc.setFontSize(8);
            } else {
              doc.setFillColor(255, 255, 255);
              doc.setTextColor(0);
              doc.setFontSize(8);
            }
          }
        });
  
        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const xPosition = 10;
        const yPosition = doc.internal.pageSize.height - 10;
        doc.setFontSize(8);
        doc.text(`Data de criação: ${formattedDate}`, xPosition, yPosition);
    
        doc.save('empresas.pdf');
      };

      return (

        <div>
                <div className="flex flex-row items-center gap-1 ml-2 mb-1">
                  <input className="bg-cyan-900 border-slate-100 rounded-3xl text-center" 
                  type="text" 
                  title="pesquisa por nome" value={search}
                  placeholder="digite nome"
                  onChange={(event) => setSearch(event.target.value)} style={{ textTransform: 'uppercase' }} />
                  <FcSearch className="mt-1 w-9 h-10"/>
                </div>
                
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                  <th className='w-60 text-slate-950'>Nome</th>
                        <th className='w-80 text-slate-950'>CNPJ</th>
                        <th className='w-80 text-slate-950'>Contrato Desde</th>                     
                        <th className='w-80 text-slate-950'>Processo Vigente</th>
                        <th className="show-after576 text-slate-950">Ação</th>
                  </tr>
                </thead>
  
                <tbody>
                  {currentDocs.map(emp => {
                    const isIdDefined = emp.id !== undefined;
                    return (
                      <tr key={emp.id}>
                        <td className='text-slate-950'>{emp.nome.toUpperCase()}</td>
                        <td className='text-slate-950'>{emp.cnpj}</td>
                        <td className='text-slate-950'>{formatLocalDate(emp.contratoDesde, "dd/MM/yyy")}</td>
                        <td className='text-slate-950'>{emp.processoVigente ? 'SIM' : 'NÃO'}</td>
                        <td className="show-after576">
                          <div className="flex items-center flex-row gap-1 w-52 h-12 ml-2">

                            {isIdDefined && (
                            <Link to={`/empresas/${emp.id}`} className="ml-10">
                              <button className="w-14 h-10 flex-col flex items-center" title="EDITAR">
                                <BsPencil className="w-20 h-6 mt-2" color="yellow" />
                              </button>
                            </Link>
                            )}
                            <Link to={'/vinculos'}>
                              <button className="w-14 h-10 flex-col flex items-center" title="Vincular empresa a processo ou despesa">
                                <BiSelection className="w-20 h-6 mt-2" color="green" />
                              </button>
                            </Link>

                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <ul className="pagination">
                {Array.from({length: Math.ceil(empresa.length / docsPerPage)}, (_, i) => (
                    <li key={i+1} className={`inline-block mr-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white mt-5 w-6 rounded-md' : 'bg-gray-200 w-6 rounded-md'}`}>
                        <button onClick={() => paginate(i + 1)} className="page-link">
                            {i + 1}
                        </button>
                    </li>
                ))}
            </ul>
              <div className="flex justify-center mt-10"> {/* Adicionando um contêiner flexível para alinhar botões criados*/}
                <div className="rounded-full bg-sky-500 w-20 h-8 flex justify-center">
                  <Button variant="primary" onClick={() => handleCreatePDF(empresa)}>Criar PDF</Button>
                </div>
              </div>
          </div>
    )
  }

  export default DataTableEmp;