import { useState, useEffect } from "react";
import { FcSearch } from "react-icons/fc";
import { Empresa } from "../../types/Empresa";
import { EmpresaNatureza } from "../../types/EmpresaNatureza";
import { fetchEmpresa, fetchBond } from "../../utils/api";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import 'jspdf-autotable';
import { formatarValor } from "../../utils/formatValue";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const Popup = ({ empresaSelecionada, empresaNaturezas, onClose }: { empresaSelecionada: Empresa | null, empresaNaturezas: EmpresaNatureza[], onClose: () => void }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-h-full overflow-y-auto w-4/6">
        <h2 className="text-lg font-bold mb-2">EMPRESA SELECIONADA:</h2>
        {empresaSelecionada && (
          <>
            NOME: <p className="font-bold">{empresaSelecionada.nome.toUpperCase()}</p>
            <h3>DESPESAS VINCULADAS:</h3>
            <ul>
              {empresaNaturezas.map((natureza) => (
                <li key={natureza.id}>
                  <div className="fixed left-50 flex gap-1">
                    <span>TIPO DE GASTO:</span>
                    <span className="font-bold mr-10">{natureza.tipoDeGasto.toUpperCase()}</span>
                  </div>

                  <div className="gap-1 ml-48">
                    <span className="mr-1">SALDO DISPONÍVEL:</span>
                    <span className="font-bold">R$ {formatarValor(natureza.saldoDisponivel)}</span>
                  </div>

                  <div className="fixed right-96 flex gap-1 -mt-6">
                    <span>VALOR DO CONTRATO:</span>
                    <span className="font-bold">R$ {formatarValor(natureza.valorDoContrato)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">Fechar</button>
        <button onClick={() => empresaSelecionada && gerarPDF(empresaSelecionada, empresaNaturezas)} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md ml-10">Gerar PDF</button>
      </div>
    </div>
  );
  
};


const gerarPDF = (empresaSelecionada: { nome: string; }, empresaNaturezas: any[]) => {
  const docDefinition = {
    content: [
      { text: 'PROCESSO INTERNO', style: 'header' },
      { text: 'EMPRESA SELECIONADA :', style: 'header1' },
      { text: `${empresaSelecionada.nome.toUpperCase()}`, style: 'subheader' },
      { text: 'DESPESAS VINCULADAS:', style: 'subheader2' },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*'],
          body: [
            [
              { text: 'TIPO DE GASTO', style: 'tableHeader' },
              { text: 'SALDO DISPONÍVEL', style: 'tableHeader' },
              { text: 'VALOR DO CONTRATO', style: 'tableHeader' }
            ],
            ...empresaNaturezas.map(natureza => [
              natureza.tipoDeGasto.toUpperCase(),
              `R$ ${formatarValor(natureza.saldoDisponivel)}`,
              `R$ ${formatarValor(natureza.valorDoContrato)}`
            ])
          ]
        }
      }
    ],
    footer: {
      columns: [
        { text: 'Data de Criação: ' + getDataAtual(), alignment: 'right', fontSize: 10, margin: [0, 10, 40, 0] }
      ]
    },
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        margin: [170, 0, 0, 10] as [number, number, number, number]
      },
      header1: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 10] as [number, number, number, number]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [200, -27.5, 0, 5] as [number, number, number, number]
      },
      subheader2: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 5] as [number, number, number, number],
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: 'black',
        fillColor: '#00BFFF'
      }
    }
  };

  pdfMake.createPdf(docDefinition).download('limitesDespesas.pdf');
};

const getDataAtual = () => {
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const ano = dataAtual.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

export function DataTableCheckListED () {
  const [empresa, setEmpresa] = useState<Empresa[]>([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState<Empresa | null>(null);
  const [empresaNaturezas, setEmpresaNaturezas] = useState<EmpresaNatureza[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [docsPerPage, setDocsPerPage] = useState(7);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  useEffect(() => {
      fetchEmpresa()
        .then(response => setEmpresa(response.data))
        .catch(error => console.log(error));
  }, []);
  
  useEffect(() => {
      fetchBond()
        .then(response => setEmpresaNaturezas(response.data))
        .catch(error => console.log(error));
  }, []);
  
  const lowerSearch = search.toUpperCase();
  const empresaSearch = empresa.filter((emp) => emp.nome.toUpperCase().includes(lowerSearch));
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = empresaSearch.slice(indexOfFirstDoc, indexOfLastDoc);
  
  const handleEmpresaSelecionada = (emp: Empresa) => {
      setEmpresaSelecionada(emp);
      setIsPopupOpen(true); // Abre o popup quando uma empresa é selecionada
  };
  
  const handleClosePopup = () => {
      setIsPopupOpen(false); // Fecha o popup
      setEmpresaSelecionada(null);
  };

  const handleCreatePDF = (data: { empresaNome: string; saldoDisponivel: number, valorDoContrato: number}[]) => {
    const doc = new jsPDF();
    let yPos = 30;
    const tableColumns = ["NOME", "SALDO", "VALOR CONTRATO"]

    const imgPath = '../../../public/img/mpcm2.JPG';
    doc.addImage(imgPath, 'JPG', 30, 5, 30, 10);      
    doc.text("CONTROLE INTERNO - LIMITES",65,10)

    doc.autoTable({
      startY: 20,
      head: [tableColumns],
      body: data.map(nats => [nats.empresaNome.toUpperCase(), formatarValor(nats.saldoDisponivel), formatarValor(nats.valorDoContrato)]),
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

  doc.save('limites&Despesas.pdf');
};

  return (
      <div className='table'>
        <div className="flex flex-row items-center gap-1 ml-2 mb-1">
          <input
            className="bg-cyan-900 border-slate-100 rounded-3xl text-center"
            type="text"
            title="pesquisa por nome"
            value={search}
            placeholder="digite nome"
            onChange={(event) => setSearch(event.target.value)}
            style={{ textTransform: 'uppercase' }}
          />
          <FcSearch className="mt-1 w-9 h-10" />
        </div>
  
        <table>
          <thead>
            <tr>
              <th className='w-60 text-slate-950'>Nome</th>
              <th className='w-60 text-slate-950'>Selecionar</th>
            </tr>
          </thead>
  
          <tbody>
            {currentDocs.map((emp) => {
              return (
                <tr key={emp.id}>
                  <td className='text-slate-950'>{emp.nome.toUpperCase()}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={empresaSelecionada?.id === emp.id}
                      onChange={() => handleEmpresaSelecionada(emp)}
                      className="w-20 h-10"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
  
        {isPopupOpen && (
          <Popup
            empresaSelecionada={empresaSelecionada}
            empresaNaturezas={empresaNaturezas.filter((natureza) => natureza.empresaId === empresaSelecionada?.id)}
            onClose={handleClosePopup}
          />
        )}
  
        <ul className="pagination">
          {Array.from({ length: Math.ceil(empresa.length / docsPerPage) }, (_, i) => (
            <li key={i + 1} className={`inline-block mr-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white mt-5 w-6 rounded-md' : 'bg-gray-200 w-6 rounded-md'}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-5"> {/* Adicionando um contêiner flexível para alinhar botões criados*/}
          <div className="rounded-full bg-sky-500 w-20 h-8 flex justify-center">
            <Button variant="primary" onClick={() => handleCreatePDF(empresaNaturezas)}>Criar PDF</Button>
          </div>
        </div>
      </div>
  );
}