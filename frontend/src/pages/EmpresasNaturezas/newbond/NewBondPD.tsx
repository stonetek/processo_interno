import { useEffect, useState } from "react"
import { Processo } from "../../../types/Processo"
import { Documento } from "../../../types/Documento";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Header from "../../../components/header/Header";
import { BiSend } from "react-icons/bi";
import { useBond } from "../../../context/BondContext";

function NewBondPD() {

    const [processos, setProcessos] = useState<Processo[]>([]);
    const [documentos, setDocumentos] = useState<Documento[]>([]);
    const [processoSelecionado, setProcessoSelecionado] = useState('');
    const [documentoSelecionado, setDocumentoSelecionado] = useState('');
    const [recebido, setRecebido] = useState('');
    const [pagina, setPagina] = useState('');

    const { bondData } = useBond();

    const { vinculoID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProcesso();
        fetchDocumento();
    
        if (bondData) {
          setProcessoSelecionado(bondData.processoId.toString());
          setDocumentoSelecionado(bondData.documentoId.toString());
          setRecebido(bondData.recebido);
          setPagina(bondData.pagina || '');
        } else if (vinculoID && vinculoID !== '0') {
          fetchBond(vinculoID).then((data) => {
            setProcessoSelecionado(data.processoId.toString());
            setDocumentoSelecionado(data.documentoId.toString());
            setRecebido(data.recebido ? 'true' : 'false');
            setPagina(data.pagina || '');
          });
        }
      }, [vinculoID, bondData]);
    
    
    
    
    async function fetchProcesso() {
        try {
            const response = await api.get('/api/processos');
            setProcessos(response.data);
        } catch (error) {
            console.error('Erro ao buscar processos:', error);
        }
    }

    async function fetchDocumento() {
        try {
            const response = await api.get('/api/documentos');
            setDocumentos(response.data);
        } catch (error) {
            console.error('Erro ao buscar documentos:', error);
        }
    }

    async function fetchBond(vinculoID: string) {
        try {
            const response = await api.get(`/api/processo_documento/${vinculoID}`);
            console.log("Response from fetchBond:", response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar vínculo:', error);
            return null;
        }
    }


    async function saveOrUpdate(e: React.FormEvent) {
        e.preventDefault();
    
        if (!processoSelecionado || !documentoSelecionado) {
            alert("Por favor, selecione um processo e um documento antes de salvar.");
            return;
        }
    
        const processoSelecionadoObj = processos.find(processo => processo.id === parseInt(processoSelecionado));
        const documentoSelecionadoObj = documentos.find(documento => documento.id === parseInt(documentoSelecionado));
    
        const data = {
            processoId: processoSelecionado,
            processoNome: processoSelecionadoObj ? processoSelecionadoObj.nome : '',
            documentoId: documentoSelecionado,
            documentoNome: documentoSelecionadoObj ? documentoSelecionadoObj.nome : '',
            recebido: recebido === 'true',
            pagina: pagina
        };
    
        try {
            if (vinculoID === '0') {
                await api.post('/api/processo_documento', data);
            } else {
                await api.put(`/api/processo_documento/${vinculoID}`, data);
            }
    
            navigate('/vinculos');
        } catch (error) {
            alert('Erro ao gravar novo vínculo. Tente novamente!');
        }
    }
    

    return (
        <>
            <Header />

            <div className="text-3xl text-sky-500 w-scree text-left ml-20 mt-10">
                <Link to='/vinculos'>Voltar</Link>
            </div>

            <div className="w-screen h-screen bg-gradient-to-t from-slate-700 flex flex-col justify-center items-center">
                <h1 className="text-5xl mb-10">{vinculoID === '0' ? "'Adicionar' " : "'Editar' "}Vínculo</h1>

                <form onSubmit={saveOrUpdate} className="bg-gradient-to-t from-zinc-300 w-3/6 h-3/4 flex flex-col items-center justify-center gap-3">
                    <div className='w-3/4'>
                        <label htmlFor="processo" className='ml-2 text-gray-900'>Processo: </label>
                        <select
                            id="processo"
                            value={processoSelecionado}
                            onChange={(e) => setProcessoSelecionado(e.target.value)}
                            className="text-black bg-red-400 w-3/4 mb-4 ml-5"
                            disabled={vinculoID !== '0'} // Desativa o campo se estiver editando
                            >
                            <option value="">Selecione um processo</option>
                            {processos.map((processo) => (
                                <option key={processo.id} value={processo.id.toString()}>
                                {processo.nome}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className='w-3/4'>
                        <label htmlFor="documento" className='ml-2 text-gray-900'>Documento: </label>
                        <select
                            id="documento"
                            value={documentoSelecionado}
                            onChange={(e) => setDocumentoSelecionado(e.target.value)}
                            className="text-black bg-red-400 w-3/4 ml-1"
                            disabled={vinculoID !== '0'} // Desativa o campo se estiver editando
                            >
                            <option value="">Selecione um documento</option>
                            {documentos.map((documento) => (
                                <option key={documento.id} value={documento.id.toString()}>
                                {documento.nome}
                                </option>
                            ))}
                        </select>

                    </div>              

                    <div className='w-3/4'>
                        <label htmlFor="pagina" className='ml-2 text-gray-900'>Página: </label>
                        <input type="text" id="pagina" value={pagina} onChange={(e) => setPagina(e.target.value)} 
                            className='text-black bg-red-400 w-3/4 mb-4 ml-9'/>
                    </div>

                    <div className='w-3/4 flex items-center'>
                        <label htmlFor="recebido" className='ml-2 text-gray-900'>Recebido: </label>
                        <div className="ml-4">
                            <label htmlFor="recebido_sim" className='mr-2 ml-20'>Sim</label>
                            <input type="radio" id="recebido_sim" name="recebido" value="true" 
                                checked={recebido === 'true'} onChange={(e) => setRecebido(e.target.value)} />
                        </div>
                        <div className="ml-4">
                            <label htmlFor="recebido_nao" className='mr-2 ml-20'>Não</label>
                            <input type="radio" id="recebido_nao" name="recebido" value="false" 
                                checked={recebido === 'false'} onChange={(e) => setRecebido(e.target.value)} />
                        </div>
                    </div>


                    <button type="submit" onClick={saveOrUpdate} className="w-3/6 h-40 flex items-center justify-center">
                        {vinculoID === '0' ? "'Adicionar'" : "'Editar'"}
                        <BiSend title="Adicionar" color="green" className="w-1/4 h-1/4" />
                    </button>
                </form>
            </div>
        
        
        </>
    )

}

export default NewBondPD