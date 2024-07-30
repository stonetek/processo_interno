import { useEffect, useState } from "react"
import { Natureza } from "../../types/Natureza"
import { fetchNatureza } from "../../utils/api";
import './style.css';
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { BiSelection } from "react-icons/bi";
import { formatarValor } from "../../utils/formatValue";
import { FcSearch } from "react-icons/fc";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import 'jspdf-autotable';


function DataTableNat() {
  const [natureza, setNatureza] = useState<Natureza[]>([]);
  const [search, setSearch] = useState('');
  const lowerSearch = search.toUpperCase();
  const naturezaSearch = natureza.filter((natureza) => {
    if (natureza.tipoDeGasto !== null && natureza.tipoDeGasto !== undefined) {
      return natureza.tipoDeGasto.toUpperCase().includes(lowerSearch);
    }
    return false;
  });  
  const [currentPage, setCurrentPage] = useState(1);
  const [docsPerPage, setDocsPerPage] = useState(8);

  useEffect(() => {
    fetchNatureza()
      .then(response => setNatureza(response.data))
      .catch(error => console.log(error));
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = naturezaSearch.slice(indexOfFirstDoc, indexOfLastDoc);

  const totalPages = Math.ceil(natureza.length / docsPerPage);
  const maxPagesToShow = 5;
  let startPage = currentPage - Math.floor(maxPagesToShow / 2);
  startPage = Math.max(startPage, 1);
  let endPage = startPage + maxPagesToShow - 1;
  endPage = Math.min(endPage, totalPages);

  const handleCreatePDF = (data: { numero: number; tipoDeGasto: string; saldoDisponivel: number}[]) => {
    const doc = new jsPDF();
    let yPos = 30;
    const tableColumns = ["CÓDIGO", "TIPO DE GASTO", "SALDO DISPONÍVEL"];
  
    const imgPath = '../../../public/img/mpcm2.JPG';
    doc.addImage(imgPath, 'JPG', 30, 5, 30, 10);
    doc.text("CONTROLE INTERNO - DESPESAS", 65, 10);
  
    doc.autoTable({
      startY: 20,
      head: [tableColumns],
      body: data.map(despesa => [despesa.numero.toString(), despesa.tipoDeGasto.toUpperCase(), formatarValor(despesa.saldoDisponivel)]),
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
  
    doc.save('despesas.pdf');
  };
  

  return (
    <div className='table'>
      <div className="flex flex-row items-center gap-1 ml-2 mb-1">
        <input
          className="bg-cyan-900 border-slate-100 rounded-3xl text-center"
          type="text"
          title="pesquisa por nome" placeholder="digite nome"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{ textTransform: 'uppercase' }}
        />
        <FcSearch className="mt-1 w-9 h-10" />
      </div>

      <table>
        <thead>
          <tr>
            <th className='w-60 text-slate-950'>Código</th>
            <th className='w-80 text-slate-950'>Tipo de Gasto</th>
            <th className='w-80 text-slate-950'>Saldo Disponível</th>
            <th className="show-after576 text-center text-slate-950">Ação</th>
          </tr>
        </thead>

        <tbody>
          {currentDocs.map(nat => (
            <tr key={nat.id}>
              <td className='text-slate-950'>{nat.numero}</td>
              <td className='text-slate-950'>{nat.tipoDeGasto.toUpperCase()}</td>
              <td className='text-slate-950'>{formatarValor(nat.saldoDisponivel)}</td>
              <td className="show-after576">
                <div className="flex items-center flex-row gap-2 w-52 h-12 ml-2">
                  <Link to={`/naturezadasdespesas/${nat.id}`} className="ml-10">
                    <button className="w-14 h-10 flex-col flex items-center" title="EDITAR">
                      <BsPencil className="w-20 h-6 mt-2" color="yellow" />
                    </button>
                  </Link>

                  <Link to={'/vinculos'}>
                  <button className="w-14 h-10 flex-col flex items-center" title="VINCULAR">
                    <BiSelection className="w-20 h-6 mt-2" color="green" />
                  </button>
                  </Link>
                
                </div>
              </td>
            </tr>
          ))}
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
              
      <div className="flex justify-center mt-10">
        <div className="rounded-full bg-sky-500 w-20 h-8 flex justify-center">
          <Button variant="primary" onClick={() => handleCreatePDF(natureza)}>Criar PDF</Button>
        </div>
      </div>

    </div>
  );
}

export default DataTableNat;
