import { useEffect, useState } from "react"
import { ProcessoEmpresa } from "../../../types/ProcessoEmpresa"
import { fetchBondPE } from "../../../utils/api";
import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FcSearch } from "react-icons/fc";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import 'jspdf-autotable';

function DataTableProcessoEmpresa () {


    const [processoEmpresa, setProcessoEmpresa] = useState<ProcessoEmpresa[]>([]);
    const [search, setSearch] = useState('');
    const lowerSearch = search.toUpperCase();
    const processoEmpresaSearch = processoEmpresa.filter((empresa) => empresa.
    empresaNome.toUpperCase().includes(lowerSearch));
    const [currentPage, setCurrentPage] = useState(1);
    const [docsPerPage, setDocsPerPage] = useState(10);

    useEffect(() => {
        fetchBondPE().then(response => setProcessoEmpresa(response.data))
        .catch(error => console.log(error))
    }, []);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const indexOfLastDoc = currentPage * docsPerPage;
    const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
    const currentDocs = processoEmpresaSearch.slice(indexOfFirstDoc, indexOfLastDoc);

    const totalPages = Math.ceil(processoEmpresa.length / docsPerPage);
    const maxPagesToShow = 5;
    let startPage = currentPage - Math.floor(maxPagesToShow / 2);
    startPage = Math.max(startPage, 1);
    let endPage = startPage + maxPagesToShow - 1;
    endPage = Math.min(endPage, totalPages);

    const handleCreatePDF = (data: { processoNome: string; empresaNome: string; processoVigente: boolean}[]) => {
        const doc = new jsPDF();
        let yPos = 30;
        const tableColumns = ["PROCESSO", "EMPRESA", "VIGENTE"]
  
        const imgPath = '../../../public/img/mpcm2.JPG';
        doc.addImage(imgPath, 'JPG', 30, 5, 30, 10);      
        doc.text("CONTROLE INTERNO - DOCUMENTOS",65,10)
    
        doc.autoTable({
          startY: 20,
          head: [tableColumns],
          body: data.map(bond => [bond.processoNome.toUpperCase(), bond.empresaNome.toUpperCase(), bond.processoVigente ? 'SIM' : 'NÃO'.toUpperCase()]),
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
    
        doc.save('processos&empresas.pdf');
      };

    return (
        <>
        
            <div className='table'>

                <div className="flex flex-row items-center gap-1 ml-2 mb-1">
                  <input className="bg-cyan-900 border-slate-100 rounded-3xl text-center" type="text" title="pesquisa por nome" value={search}
                  onChange={(event) => setSearch(event.target.value)} 
                  style={{ textTransform: 'uppercase' }} 
                  placeholder="digite nome emp"/>
                  <FcSearch className="mt-1 w-9 h-10"/>

                    <button className="w-14 h-10 flex-col flex items-center fixed right-16" title="NOVO">
                      
                        <Link to={"/processoEmpresa/new/0"} title='NOVO'>
                            <BsFillPlusCircleFill className="w-20 h-10 mt-2" color="green" />
                        </Link>
                                    
                    </button>

                </div>


                <table>
                    <thead>
                    <tr>
                    <th className='w-80 text-slate-950'>Processo Associado</th>                     
                    <th className='w-60 text-slate-950'>Nome da Empresa</th>
                    <th className='w-60 text-slate-950'>Processo Vigente</th>
                    </tr>
                    </thead>
    
                    <tbody>
                        {currentDocs.map(emp => {
                            return (
                            <tr key={emp.id}>
                                <td className='text-slate-950 text-left'>{emp.processoNome.toUpperCase()}</td>
                                <td className="text-left text-slate-950">{emp.empresaNome.toUpperCase()}</td>                                
                                <td className="text-center text-slate-950">{emp.processoVigente? 'SIM' : 'NÃO'.toUpperCase()}</td>
                            </tr>
                            )
                        })}
                </tbody>
                </table>
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

                <div className="flex justify-center mt-6"> {/* Adicionando um contêiner flexível para alinhar botões criados*/}
                    <div className="rounded-full bg-sky-500 w-20 h-8 flex justify-center">
                        <Button variant="primary" onClick={() => handleCreatePDF(processoEmpresa)}>Criar PDF</Button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default DataTableProcessoEmpresa