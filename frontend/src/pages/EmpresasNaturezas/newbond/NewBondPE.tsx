import { useEffect, useState } from "react";
import { Processo } from "../../../types/Processo";
import { Empresa } from "../../../types/Empresa";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Header from "../../../components/header/Header";
import { BiSend } from "react-icons/bi";


function NewBondPE() {

    const [processos, setProcessos] = useState<Processo[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [processoSelecionado, setProcessoSelecionado] = useState('');
    const [empresaSelecionada, setEmpresaSelecionada] = useState('');


    const { vinculoID } = useParams();
    const history = useNavigate();

    useEffect(() => {
        fetchProcesso();
        fetchEmpresas();
    }, []);

    async function fetchProcesso() {
        try {
            const response = await api.get('/api/processos');
            setProcessos(response.data);
        } catch (error) {
            console.error('Erro ao buscar processos:', error);
        }
    }

    async function fetchEmpresas() {
        try {
            const response = await api.get('/empresas');
            const empresasData = response.data._embedded.empresas;
            setEmpresas(empresasData);
        } catch (error) {
            console.error('Erro ao buscar empresas:', error);
        }
    }


    async function saveOrUpdate(e: { preventDefault: () => void; }) {
        e.preventDefault();
        // Verifica se uma empresa e uma natureza foram selecionadas
        if (!empresaSelecionada || !processoSelecionado) {
            alert("Por favor, selecione uma empresa e um processo antes de salvar.");
            return;
        }
        try {
             // Encontrar a empresa correspondente ao nome selecionado
            const empresa = empresas.find(empresa => empresa.nome === empresaSelecionada);

            // Verifica se a empresa foi encontrada
            if (!empresa) {
                alert("Empresa selecionada não encontrada nos dados.");
                return;
            }

            // Verifica se a URL da empresa é válida
            const empresaUrl = empresa._links.empresa.href;
                if (!empresaUrl) {
                alert("URL da empresa não encontrada nos dados.");
                return;
            }

            // Extrai o ID da empresa a partir da URL
            const empresaId = empresaUrl.substring(empresaUrl.lastIndexOf('/') + 1);

            // Envia os dados selecionados para a API
            const data = {
                processoId: processoSelecionado,
                empresaId: empresaId
            };
            if (vinculoID === '0') {
                await api.post('/api/processo_empresa/', data);
            } else {
                await api.put(`/api/processo_empresa/${vinculoID}`, data);
            }
            history('/vinculos');
        } catch (error) {
            console.error('Erro ao gravar novo vínculo:', error);
            alert('Erro ao gravar novo processo. Tente novamente!');
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
                        <select id="processo" value={processoSelecionado} 
                        onChange={(e) => setProcessoSelecionado(e.target.value)} 
                        className='text-black bg-red-400 w-3/4 mb-4'>
                            <option value="">Selecione um processo</option>
                            {processos.map(processo => (
                                <option key={processo.id} value={processo.id}>{processo.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-3/4'>
                        <label htmlFor="empresa" className='ml-2 text-gray-900'>Empresa: </label>
                        <select id="empresa" value={empresaSelecionada} 
                        onChange={(e) => setEmpresaSelecionada(e.target.value)} 
                        className='text-black bg-red-400 w-3/4 mb-4'>
                            <option value="">Selecione uma empresa</option>
                            {empresas.map(empresa => (
                                <option key={empresa.id} value={empresa.id}>{empresa.nome}</option>
                            ))}
                        </select>
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

export default NewBondPE