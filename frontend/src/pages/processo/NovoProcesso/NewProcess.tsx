import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Header from "../../../components/header/Header";
import { BiSend } from "react-icons/bi";

function NewProcess () {

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [instrumento, setInstrumento] = useState('');
    const [protocolo, setProtocolo] = useState('');
    const [numeroDoProcesso, setNumeroDoProcesso] = useState('');
    const [inicio, setInicio] = useState('');
    const [fim, setFim] = useState('');

    const {processoID} = useParams();

    const history = useNavigate();

    async function loadProcesso() {
        try {
            const response = await api.get(`/api/processos/${processoID}`)
            
            let adjustedDate = response.data.inicio.split("T", 10)[0];
            let adjustedDate1 = response.data.fim.split("T", 10)[0];
            setId(response.data.id);
            setNome(response.data.nome);
            setDescricao(response.data.descricao);
            setInstrumento(response.data.instrumento);
            setProtocolo(response.data.protocolo);
            setNumeroDoProcesso(response.data.numeroDoProcesso);
            setInicio(adjustedDate);
            setFim(adjustedDate1);
        } catch (error) {
            alert('Error recovering processo. Try again!')
            history('/processos')
        }
    }

    useEffect(() => {
        if (processoID === '0') return;
        else loadProcesso();
    }, [processoID])

    async function saveOrUpdate(e:{ preventDefault: () => void}) {
        e.preventDefault();

        if (!nome) {
            alert("Por favor, preencha o campo NOME antes de salvar.");
            return;
        }

        if (!descricao) {
            alert("Por favor, preencha o campo DESCRIÇÃO antes de salvar.");
            return;
        }

        if (!instrumento) {
            alert("Por favor, preencha o campo INSTRUMENTO antes de salvar.");
            return;
        }

        if (!protocolo) {
            alert("Por favor, preencha o campo PROTOCOLO antes de salvar.");
            return;
        }

        if (!numeroDoProcesso) {
            alert("Por favor, preencha o campo NÚMERO DO PROCESSO antes de salvar.");
            return;
        }

        if (!inicio) {
            alert("Por favor, preencha o campo INÍCIO antes de salvar.");
            return;
        }

        if (!numeroDoProcesso) {
            alert("Por favor, preencha o campo TÉRMINO antes de salvar.");
            return;
        }
    
        const data = {
            nome,
            descricao,
            instrumento,
            protocolo,
            numeroDoProcesso,
            inicio,
            fim,
        } 

        try {
            if(processoID === '0') {
                await api.post('/api/processos/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });
            } else {
                data.id = id;
                await api.put(`/api/processos/${processoID}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }console.log('DADOS', data)

            history('/processos')
        } catch (error) {
            alert('Erro ao gravar novo Processo Tente Novamente!')
        }       
    }

    return (
        <>
        
            <Header/>
                    <div className="text-3xl text-sky-500 w-scree text-left ml-20 mt-10">
                        <Link to='/processos'>Voltar</Link>
                    </div>
            <div className="w-screen h-screen bg-gradient-to-t from-slate-700 flex flex-col justify-center items-center -mt-40">
                <h1 className="text-5xl">{processoID === '0' ? "'Adicionar' " : "'Editar' "}Processo</h1>

                    <form key= {processoID}
                    onSubmit={saveOrUpdate}
                    className="bg-gradient-to-t from-zinc-300 w-3/6 h-3/4 
                    flex flex-col items-center justify-center gap-3">

                        <label htmlFor="Nome" className="text-2xl text-rose-800" >Nome</label>
                                <input type="text"
                                value={nome.toUpperCase()}
                                onChange={e => setNome(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <label htmlFor="Descricao" className="text-2xl text-rose-800">Descrição</label>
                                <input type="text"
                                value={descricao.toUpperCase()}
                                onChange={e => setDescricao(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <label htmlFor="Instrumento" className="text-2xl text-rose-800">Instrumento</label>
                                <input type="text"
                                value={instrumento.toUpperCase()}
                                onChange={e => setInstrumento(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <label htmlFor="Protocolo" className="text-2xl text-rose-800">Protocolo</label>
                                <input type="text"
                                value={protocolo}
                                onChange={e => setProtocolo(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <label htmlFor="NumeroProc" className="text-2xl text-rose-800">Numero do Processo</label>
                                <input type="text"
                                value={numeroDoProcesso}
                                onChange={e => setNumeroDoProcesso(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <label htmlFor="NumeroProc" className="text-2xl text-rose-800">Incio</label>
                                <input type="date"
                                value={inicio}
                                onChange={e => setInicio(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <label htmlFor="NumeroProc" className="text-2xl text-rose-800">Término</label>
                                <input type="date"
                                value={fim}
                                onChange={e => setFim(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2 mb-5" />                

                        <button type="submit" onClick={saveOrUpdate} className="flex items-center justify-center" >
                                    {processoID === '0' ? "'Adicionar'" : "'Editar'"}
                                    <BiSend title="Adicionar" color="green" className="w-20 h-10 -ml-5" />
                                </button>                                             
                        
                    </form>
            </div>
        
        </>
    )


}

export default NewProcess