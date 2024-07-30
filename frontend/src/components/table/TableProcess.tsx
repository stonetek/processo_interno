import { useEffect, useState } from "react"
import { Processo } from "../../types/Processo"
import { fetchProcesso } from "../../utils/api";
import { BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiSelection } from "react-icons/bi";
import { FcSearch } from "react-icons/fc";
import './style.css';
import { formatLocalDate } from "../../utils/format";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import 'jspdf-autotable';

function DataTableProcess() {
    
    const [processo, setProcesso] = useState<Processo[]>([]);
    const [search, setSearch] = useState('');
    const lowerSearch = search.toUpperCase();
    const processoSearch = processo.filter((processo) => processo.
    nome.toUpperCase().includes(lowerSearch));
    const [currentPage, setCurrentPage] = useState(1);
    const [docsPerPage, setDocsPerPage] = useState(5);

    useEffect(() => {
        fetchProcesso().then(response => setProcesso(response.data))
        .catch(error => console.log(error))
    }, []);


    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const indexOfLastDoc = currentPage * docsPerPage;
    const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
    const currentDocs = processoSearch.slice(indexOfFirstDoc, indexOfLastDoc);

    const handleCreatePDF = (data: {nome: string; numeroDoProcesso: string; descricao: string; protocolo: string; instrumento: string; fim: string }[]) => {
      const doc = new jsPDF();
      let yPos = 20;
      const tableColumns = ["NOME", "NÚMERO", "DESCRIÇÃO", "PROTOCOLO", "INSTRUMENTO", "TÉRMINO CONTRATO"]

      const imgPath = '../../../public/img/mpcm2.JPG';
      doc.addImage(imgPath, 'JPG', 30, 5, 30, 10);      
      doc.text("CONTROLE INTERNO - EMPRESAS",65,10)
      
      doc.autoTable({
        startY: 20,
        head: [tableColumns],
        body: data.map(processos => [processos.nome.toUpperCase(), processos.numeroDoProcesso, processos.descricao.toUpperCase(), processos.protocolo, processos.instrumento.toUpperCase(), formatLocalDate(processos.fim, "dd/MM/yyyy")]),
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
  
      doc.save('processos.pdf');
  };


    return (
        <div className='table'>

                    <div className="flex flex-row items-center gap-1 ml-2 mb-1">
                        <input className="bg-cyan-900 border-slate-100 rounded-3xl text-center" 
                        type="text" title="pesquisa por número do processo" 
                        value={search}
                        onChange={(event) => setSearch(event.target.value)} 
                        style={{ textTransform: 'uppercase' }} 
                        placeholder="digite nome"/>
                        <FcSearch className="mt-1 w-9 h-10" title="pesquisa por número do processo"/>
                    </div>

                  <table>
                    <thead>
                      <tr>
                      <th className='w-60 text-slate-950'>Nome</th>
                            <th className='w-80 text-slate-950'>Número</th>                     
                            <th className='w-80 text-slate-950'>Descrição</th>
                            <th className="show-after576 text-slate-950">Protocolo</th>
                            <th className="show-after576 text-slate-950">Instrumento</th>
                            <th className="show-after576 text-slate-950">Término do Contrato</th>
                            <th className="show-after576 text-slate-950">Ação</th>
                      </tr>
                    </thead>

                    <tbody>
              {currentDocs.map(proc => {
                return (
                  <tr key={proc.id}>
                    <td className='text-slate-950'>{proc.nome.toUpperCase()}</td>
                    <td className='text-slate-950'>{proc.numeroDoProcesso}</td>
                    <td className='text-slate-950'>{proc.descricao.toUpperCase()}</td>
                    <td className="p-8 text-slate-950">{proc.protocolo}</td>
                    <td className='text-slate-950'>{proc.instrumento.toUpperCase()}</td>
                    <td className='text-slate-950'>{formatLocalDate(proc.fim,"dd/MM/yyyy")}</td>
                    <td className="show-after576">
                      <div className="flex items-center flex-row gap-1 w-52 h-12 ml-4">

                        <Link to={`/processos/${proc.id}`} className="ml-10">
                          <button className="w-14 h-10 flex-col flex items-center" title="EDITAR">
                            <BsPencil className="w-20 h-6 mt-2" color="yellow" />
                          </button>
                        </Link>

                        <Link to={'/vinculos'}>
                          <button className="w-14 h-10 flex-col flex items-center" title="Vincular processo a empresa ou documento">
                            <BiSelection className="w-20 h-6 mt-2" color="green" />
                          </button>
                        </Link>  

                        
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <ul className="pagination mt-5 w-3/5 rounded-full text-center ml-80">
                {Array.from({length: Math.ceil(processo.length / docsPerPage)}, (_, i) => (
                    <li key={i+1} className={`inline-block mr-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white w-6 rounded-md text-center' : 'bg-gray-200 w-6 rounded-md text-center'}`}>
                        <button onClick={() => paginate(i + 1)} className="page-link">
                            {i + 1}
                        </button>
                    </li>
                ))}
          </ul>

          <div className="flex justify-center mt-5 -ml-20"> {/* Adicionando um contêiner flexível para alinhar botões criados*/}
            <div className="rounded-full bg-sky-500 w-20 h-8 flex justify-center">
              <Button variant="primary" onClick={() => handleCreatePDF(processo)}>Criar PDF</Button>
            </div>
          </div>

      </div>
    )
}

export default DataTableProcess;