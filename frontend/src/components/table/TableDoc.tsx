import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Documento } from "../../types/Documento";
import { fetchDocumento } from "../../utils/api";
import { BsPencil } from "react-icons/bs";
import './style.css';
import { BiSelection } from "react-icons/bi";
import { FcSearch } from "react-icons/fc";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import 'jspdf-autotable';

function DataTableDoc() {
    
    const [documento, setDocumento] = useState<Documento[]>([]);
    const [search, setSearch] = useState('');
    const lowerSearch = search.toUpperCase();
    const documentoSearch = documento.filter((documento) => documento.
    nome.toUpperCase().includes(lowerSearch));
    const [currentPage, setCurrentPage] = useState(1);
    const [docsPerPage, setDocsPerPage] = useState(10);
    

    useEffect(() => {
      fetchDocumento().then(response => setDocumento(response.data))
      .catch(error => console.log(error))
    }, []);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const indexOfLastDoc = currentPage * docsPerPage;
    const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
    const currentDocs = documentoSearch.slice(indexOfFirstDoc, indexOfLastDoc);

    const handleCreatePDF = (data: { nome: string; descricao: string}[]) => {
      const doc = new jsPDF();
      let yPos = 30;
      const tableColumns = ["NOME", "DESCRIÇÃO"]

      const imgPath = '../../../public/img/mpcm2.JPG';
      doc.addImage(imgPath, 'JPG', 30, 5, 30, 10);      
      doc.text("CONTROLE INTERNO - DOCUMENTOS",65,10)
  
      doc.autoTable({
        startY: 20,
        head: [tableColumns],
        body: data.map(docs => [docs.nome.toUpperCase(), docs.descricao.toUpperCase()]),
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
  
      doc.save('documentos.pdf');
    };

  return (
      <div className='table'>
        <div className="flex flex-row items-center gap-1 ml-2 mb-1">
              <input className="bg-cyan-900 border-slate-100 rounded-3xl text-center" type="text" title="pesquisa por nome" value={search}
              onChange={(event) => setSearch(event.target.value)} style={{ textTransform: 'uppercase' }} placeholder="Digite nome"/>
              <FcSearch className="mt-1 w-9 h-10"/>
          </div>
            <table>
              <thead>
                <tr>
                  <td className='w-auto text-slate-950'>Nome</td>
                  <td className='w-auto text-slate-950'>Descrição</td>          
                  <td className="show-after576 w-auto text-slate-950">Ação</td>
                </tr>
              </thead>

              <tbody>
                {currentDocs.map(dev =>(
                  <tr key={dev.id}> 
                  <td className='pr-10 text-slate-950'>{dev.nome.toUpperCase()}</td>
                  <td className='pr-10 text-slate-950'>{dev.descricao.toUpperCase()}</td>                                
                  <td className="show-after576">
                    <div className="flex items-center flex-row gap-1 w-32 h-12 ml-2">

                      <Link to={`/documentos/${dev.id}`} className="ml-2">
                        <button className="w-14 h-10 flex-col flex items-center" title="EDITAR">
                          <BsPencil className="w-20 h-6 mt-2" color="yellow"/>
                        </button> 
                      </Link>

                      <Link to={'/vinculos'}>
                      <button className="w-14 h-10 flex-col flex items-center" title="Vincular documento a processo">
                        <BiSelection className="w-20 h-6 mt-2" color="green" />
                      </button>
                    </Link> 

                    </div> 
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            <ul className="pagination mt-5 rounded-full">
                {Array.from({length: Math.ceil(documento.length / docsPerPage)}, (_, i) => (
                    <li key={i+1} className={`inline-block mr-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white mt-5 w-6 rounded-md' : 'bg-gray-200 w-6 rounded-md'}`}>
                        <button onClick={() => paginate(i + 1)} className="page-link">
                            {i + 1}
                        </button>
                    </li>
                ))}
            </ul>

              <div className="flex justify-center mt-10"> {/* Adicionando um contêiner flexível para alinhar botões criados*/}
                <div className="rounded-full bg-sky-500 w-20 h-8 flex justify-center">
                  <Button variant="primary" onClick={() => handleCreatePDF(currentDocs)}>Criar PDF</Button>
                </div>
              </div>

          </div>
  )
}

export default DataTableDoc;


