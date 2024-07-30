import { useState, useEffect } from "react";
import { EmpresaNatureza } from "../../../types/EmpresaNatureza";
import { fetchBond } from "../../../utils/api";
import { BsFillPlusCircleFill, BsPencil } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import Table from 'react-bootstrap/Table';
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import 'jspdf-autotable';

function DataTableBondED () {
    
  const [empresaNaturezas, setEmpresaNaturezas] = useState<EmpresaNatureza[]>([]);
  const [search, setSearch] = useState('');
  const lowerSearch = search.toUpperCase();
  const empresaNaturezasSearch = empresaNaturezas.filter((empresa) => empresa.
  empresaNome.toUpperCase().includes(lowerSearch));
  const [currentPage, setCurrentPage] = useState(1);
  const [docsPerPage, setDocsPerPage] = useState(8);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBond().then(response => {setEmpresaNaturezas(response.data)})
      .catch(error => console.log(error))
  }, []);


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = empresaNaturezasSearch.slice(indexOfFirstDoc, indexOfLastDoc);

  const totalPages = Math.ceil(empresaNaturezas.length / docsPerPage);
  const maxPagesToShow = 5;
  let startPage = currentPage - Math.floor(maxPagesToShow / 2);
  startPage = Math.max(startPage, 1);
  let endPage = startPage + maxPagesToShow - 1;
  endPage = Math.min(endPage, totalPages);

  const handleCreatePDF = (data: { empresaNome: string; tipoDeGasto: string}[]) => {
    const doc = new jsPDF();
    let yPos = 30;
    const tableColumns = ["NOME EMPRESA", "DESPESA"]

    const imgPath = '../../../public/img/mpcm2.JPG';
    doc.addImage(imgPath, 'JPG', 30, 5, 30, 10);      
    doc.text("CONTROLE INTERNO - DOCUMENTOS",65,10)

    doc.autoTable({
      startY: 20,
      head: [tableColumns],
      body: data.map(bond => [bond.empresaNome.toUpperCase(), bond.tipoDeGasto.toUpperCase()]),
      createdRow: (row, dataRowIndex) => {
        if (dataRowIndex % 2 === 0) { // Exemplo: aplicando estilo a cada segunda linha
          doc.setFillColor(240, 240, 240); // Define a cor de fundo da linha
          doc.setTextColor(0); // Define a cor do texto para preto
          doc.setFontSize(8); // Define o tamanho da fonte
        } else {
          doc.setFillColor(255, 255, 255); // Define a cor de fundo padrão da linha
          doc.setTextColor(0); // Define a cor do texto para preto
          doc.setFontSize(8); // Define o tamanho da fonte padrão
        }
      }
    });

    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const xPosition = 10;
    const yPosition = doc.internal.pageSize.height - 10;
    doc.setFontSize(8);
    doc.text(`Data de criação: ${formattedDate}`, xPosition, yPosition);

    doc.save('empresas&despesas.pdf');
  };

    
  return (
   <>
      <div>
        <div className="flex flex-row items-center gap-1 ml-2 mb-1">
          <input className="bg-cyan-900 border-slate-100 rounded-3xl text-center" type="text" title="pesquisa por nome" value={search}
                  onChange={(event) => setSearch(event.target.value)} 
                  style={{ textTransform: 'uppercase' }} 
          placeholder="digite nome"/>
            <FcSearch className="mt-1 w-9 h-10"/>

            <button className="w-10 h-14 flex-col flex items-center fixed right-16" title="NOVO">
                      
              <Link to={"/empresadespesa/new/0"} title='NOVO'>
                <BsFillPlusCircleFill className="w-20 h-10 mt-2" color="green" />
              </Link>
                      
            </button>
                  
        </div>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className='w-60 text-slate-950'>Nome da Empresa</th>
              <th className='w-80 text-slate-950'>Despesa</th>                      
              <th className="show-after576 text-slate-950 text-center">Ação</th>
            </tr>
          </thead>
  
          <tbody>
            {currentDocs.map(emp => {
              return (
                <tr key={emp.id}>
                  <td className="text-left text-slate-950">{emp.empresaNome.toUpperCase()}</td>
                  <td className="text-slate-950">{emp.tipoDeGasto.toUpperCase()}</td>
                  <td className="show-after576">
                    <div className="w-52 h-12">       
                      <Link to={`/empresadespesa/${emp.id}`} className="ml-5">
                        <button className="w-14 h-10 " title="EDITAR">
                          <BsPencil className="w-20 h-6 -ml-3" color="yellow"/>
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
          <li className={`inline-block mr-2 ${currentPage === 1 ? 'bg-blue-500 text-white mt-5 w-6 rounded-md' : 'bg-gray-200 w-6 rounded-md'}`}>
            <button onClick={() => paginate(1)} className="page-link">
              1
            </button>
          </li>
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i;
            if (page !== 1 && page <= totalPages) {
              return (
                <li key={page} className={`inline-block mr-2 ${currentPage === page ? 'bg-blue-500 text-white mt-5 w-6 rounded-md' : 'bg-gray-200 w-6 rounded-md'}`}>
                  <button onClick={() => paginate(page)} className="page-link">
                    {page}
                  </button>
                </li>
              );
            } else {
             return null;
            }
          })}
        </ul>
        <div className="flex justify-center mt-10"> {/* Adicionando um contêiner flexível para alinhar botões criados*/}
          <div className="rounded-full bg-sky-500 w-20 h-8 flex justify-center">
            <Button variant="primary" onClick={() => handleCreatePDF(empresaNaturezas)}>Criar PDF</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DataTableBondED