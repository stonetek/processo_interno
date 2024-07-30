import { useState } from "react";
import api from "../../services/api";
import { Empresa } from "../../types/Empresa";
import { Processo } from "../../types/Processo";
import { Natureza } from "../../types/Natureza";
import { formatarCNPJ } from "../../utils/formatcnpj";
import { Documento } from "../../types/Documento";
import { PDFViewer, Document, Page, Text, View, StyleSheet, DocumentProps, Image } from "@react-pdf/renderer";

function PesquisaEmpresa() {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [dadosEmpresa, setDadosEmpresa] = useState<Empresa[]>([]);
  const [dadosProcesso, setDadosProcesso] = useState<Processo[]>([]);
  const [dadosNatureza, setDadosNatureza] = useState<Natureza[]>([]);
  const [mensagemErro, setMensagemErro] = useState<string>('');
  const [dadosDocumentos, setDadosDocumentos] = useState<Documento[]>([]);
  const [processoSelecionado, setProcessoSelecionado] = useState<Processo | null>(null);
  const [pdfData, setPdfData] = useState<React.ReactElement<DocumentProps> | null>(null);
  const [searched, setSearched] = useState(false);
  const [observacoes, setObservacoes] = useState('');


  const handleSelecionarProcesso = async (event: React.ChangeEvent<HTMLInputElement>, processo: Processo) => {
    if (event.target.checked) {
      try {     
        const response = await api.get(`/api/processo_documento/por-processo/${processo.id}`);
        const documentosAssociados = response.data;
        const documentos = documentosAssociados
          .filter((assoc: any) => assoc.processoId === processo.id)
          .map((assoc: any) => ({ id: assoc.documentoId, nome: assoc.documentoNome, pagina: assoc.pagina, recebido: assoc.recebido}));
        setProcessoSelecionado(processo);
        setDadosDocumentos(documentos);
      } catch (error) {
        console.error('Erro ao buscar documentos do processo:', error);
      }
    } else {
      setProcessoSelecionado(null);
    }
  };
  

  const handleNovaPesquisa = () => {
    setTermoPesquisa('');
    setDadosEmpresa([]);
    setDadosProcesso([]);
    setDadosNatureza([]);
    setMensagemErro('');
    setDadosDocumentos([]);
    setProcessoSelecionado(null);
    setPdfData(null);
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNovaPesquisa();
    setTermoPesquisa(e.target.value.toUpperCase());
  };

  const handlePesquisa = async () => {
    if (!termoPesquisa) {      
      setMensagemErro('Por favor, digite o nome da empresa');
      setDadosEmpresa([]);
      setDadosProcesso([]);
      setDadosNatureza([]);
      return;
    }

    try {
      const termoPesquisaLowerCase = termoPesquisa.toLowerCase();
      const response = await api.post(`/api/empresas/dados-com-processos-e-naturezas`, {
        nomeEmpresa: termoPesquisaLowerCase
      });
      const empresa = response.data;

      if (!empresa || !empresa.nome || !empresa.cnpj) {
        setMensagemErro('Nenhuma empresa encontrada com esse nome');
        setDadosEmpresa([]);
        setDadosProcesso([]);
        setDadosNatureza([]);
        return;
      }

      setDadosEmpresa([]);
      setDadosProcesso([]);
      setDadosNatureza([]);

      setDadosEmpresa([empresa]);
      setDadosProcesso(empresa.processos);
      setDadosNatureza(empresa.naturezas);
      setMensagemErro('');
    } catch (error) {
      setMensagemErro(`A empresa "${termoPesquisa}" não está cadastrada no sistema!`);
      setDadosEmpresa([]);
      setDadosProcesso([]);
      setDadosNatureza([]);
      //console.error('Erro ao buscar dados da empresa:', error);
    }
  };


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handlePesquisa();
    }
  };

  const handleObservacoesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setObservacoes(event.target.value);
  };  


  const handleGerarPDF = () => {
    let itemIndex = 1;
    const dataEmissao = new Date().toLocaleDateString('pt-BR');

    const data = (
      <Document>
        <Page style={styles.page}>
        <View style={styles.headerContainer}>
            <Image src="../../../public/img/mpcm2.JPG" style={styles.image}></Image>
            <Text style={styles.headerText}>CONTROLE INTERNO</Text>
          </View>
          
          <Text>Dados da Empresa:</Text>
          <View style={styles.tableRow}>
            {dadosEmpresa.map((empresa, index) => (
              <View key={index} style={styles.tableCell}>
                <Text style={styles.tableCellText}>Nome: {empresa.nome.toUpperCase()}</Text>
                <Text style={styles.tableCellText}>CNPJ: {formatarCNPJ(empresa.cnpj)}</Text>
              </View>
            ))}
          </View>
          <Text>Processos:</Text>
          <View style={styles.tableRow}>
            {dadosProcesso.map((processo, index) => (
              <View key={index} style={styles.tableCell}>
                <Text style={styles.tableCellText}>Instrumento: {processo.instrumento.toUpperCase()}</Text>
                <Text style={styles.tableCellText}>Protocolo: {processo.protocolo}</Text>
                <Text style={styles.tableCellText}>Número do Processo: {processo.numeroDoProcesso}</Text>
              </View>
            ))}
          </View>
          <Text>Documentos do Processo:</Text>
          <View style={styles.tableRow}>
            <Text style={styles.columnHeader}>Item</Text>
            <Text style={styles.columnHeader}>Descrição</Text>
            <Text style={styles.columnHeader}>Recebido</Text>
            <Text style={styles.columnHeader}>Página</Text>
          </View>
          {dadosDocumentos.map((documento, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{itemIndex++}</Text>
              <Text style={styles.tableCell}>{documento.nome.toUpperCase()} - {documento.descricao}</Text>
              <Text style={styles.tableCell}>{documento.recebido ? "SIM" : "NÃO"}</Text>
              <Text style={styles.tableCell}>{documento.pagina}</Text>
            </View>
          ))}
           <View style={{ marginTop: '10px', marginBottom: '10px', fontSize: 10 }}>
            <Text>Observações:</Text>
            <Text>{observacoes}</Text>
          </View>
          <Text style={{marginTop:'10px', fontSize: 10}}>Conforme a documentação listada, este Controle Interno conclui que o referido processo se encontra apto para pagamento.
            Cumpre observar que o procedimento, a partir do presente estágio, não se manifesta sobre as fases anteriores, além de que deve manter a observação plena ao previsto na legislação que rege a matéria, mormente o determinado nos artigos 58 a 70 da Lei 4.320/64 e demais artigos da Lei n.o 8666/93, assim como deverá ser realizado recolhimento das retenções tributárias, caso haja previsão normativa, além de regular divulgação oficial dos termos e atos a serem realizados.
            De ordem superior, encaminha-se ao Diretor Administrativo-Financeiro para providências cabíveis.
          </Text>
          <Text style={{marginTop:'10px', fontSize: 10}}>Comprovante de recebimento</Text>
          <Text style={{marginTop:'15px', fontSize: 10}}>Assinatura: ______________________________________________</Text>
          <Text style={styles.dataEmissao}>{`Data Emissão: ${dataEmissao}`}</Text>
        </Page>
      </Document>
    );

    setPdfData(data);
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-lg">
        <input
          type="text"
          value={termoPesquisa}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Digite o nome da empresa"
          className="text-slate-900 w-48 pl-2 mb-5"
        />
        <button onClick={handlePesquisa} className="ml-2">
          Pesquisar
        </button>

        {mensagemErro && <p>{mensagemErro}</p>}
        {dadosEmpresa.length > 0 && ( 
        <div className="flex flex-row gap-10 text-center">
                {/* Seção de Empresa */}
                <div className="w-3/8">
                  {dadosEmpresa.length > 0 ? (
                    <div className="pl-10 pr-10">
                      <h2 className="text-xl">Empresa</h2>
                      {dadosEmpresa.map((empresa, index) => (
                        <div key={index}>
                          <p><strong>Nome:</strong> {empresa.nome.toUpperCase()}</p>
                          <p><strong>CNPJ:</strong> {formatarCNPJ(empresa.cnpj)}</p>
                        </div>
                      ))}
                    </div>
                  ) : searched ? (
                    <p className="mb-2">Nenhuma empresa encontrada</p>
                  ) : null}
                </div>

          {/* Seção de Processos */}
          {dadosProcesso.length > 0 && (
          <div className="w-1/2">
            <div className="pl-10 pr-10">
              <h2 className="text-xl">Processos:</h2>
              <ul>
                {dadosProcesso.map((processo, index) => (
                  <li key={index} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                  <div style={{ marginBottom: '5px', width: 300 }}>
                    <p><strong>Número do Processo : </strong><span className="ml-2">{processo.numeroDoProcesso}</span>
                    <input type="checkbox" onChange={(event) => handleSelecionarProcesso(event, processo)} 
                    style={{ marginLeft: '5px', width: '20px', height: '20px', verticalAlign: 'middle'}} /></p>
                  </div>
                  <div>
                    <p><strong>Nome:</strong> {processo.nome}</p>
                    <p><strong>Instrumento:</strong> {processo.instrumento}</p>
                  </div>
                </li>                              
                ))}
              </ul>
            </div>
          </div>
          )}
        </div>
        

            )}

        {/* Seção de Documentos */}
        {processoSelecionado && (
          <div className="mt-8">
            <h2>Documentos do Processo: {processoSelecionado.numeroDoProcesso}</h2>
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">Item</th>
                  <th className="border border-gray-400">Descrição</th>
                  <th className="border border-gray-400 p-2">Recebido</th>
                  <th className="border border-gray-400 p-2">Página</th>
                </tr>
              </thead>
              <tbody>
                {dadosDocumentos.map((documentos, index) => (
                  <tr key={index} className="border border-gray-400">
                    <td className="border border-gray-400">{index + 1}</td>
                    <td className="border border-gray-400 p-2">{documentos.nome}</td>
                    <td className="border border-gray-400"> {documentos.recebido ? "Sim" : "Não"} </td>
                    <td className="border border-gray-400"> {documentos.pagina} </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
  <label htmlFor="observacoes">Observações:</label>
  <textarea
    id="observacoes"
    value={observacoes}
    onChange={handleObservacoesChange}
    className="text-slate-900 w-full pl-2"
    placeholder="Digite suas observações"
    rows={5} // Set the number of rows according to your design
    cols={50} // Set the number of columns according to your design
  />
</div>
          </div>
        )}
      </div>
            {processoSelecionado && dadosProcesso.length > 0 && (
            <button onClick={handleGerarPDF} className="mt-5">
              Gerar PDF CheckList
            </button>
          )}

          {pdfData && processoSelecionado && (
                <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
                  <PDFViewer width="100%" height="100%">
                    {pdfData}
                  </PDFViewer>
                </div>
              )}
    </div>
    
  );
}

export default PesquisaEmpresa;

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tableCell: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    fontSize: 7,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
    
  },
  tableCellText: {
    fontSize: 8,
  },
  columnHeader: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  },
  image: {
    width: 100,
    height: 50,
    marginLeft: 20,
    marginRight: 40,
  },
  dataEmissao: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16
  },
});