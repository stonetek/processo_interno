import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Header from "../../../components/header/Header";
import { BiSend } from "react-icons/bi";

function NewDocument() {

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const {documentoID} = useParams();

    const history = useNavigate();

    async function loadDocumento() {
        try {
            const response = await api.get(`/api/documentos/${documentoID}`)

            setId(response.data.id);
            setNome(response.data.nome);
            setDescricao(response.data.descricao);
        } catch (error) {
            alert('Erro ao listar documentos. Tente Novamente!')
            history('/processos')
        }
    }

    useEffect(() => {
        if (documentoID === '0') return;
        else loadDocumento();
    }, [documentoID])


    async function saveOrUpdate(e:{ preventDefault: () => void}) {
        e.preventDefault();

        if (!nome ) {
            alert("Por favor, preencha o campo NOME antes de salvar.");
            return;
        }

        if (!descricao ) {
            alert("Por favor, preencha o campo DESCRIÇÂO antes de salvar.");
            return;
        }
    
        const data = {
            nome,
            descricao,
            
        }

        try {
            if(documentoID === '0') {
                await api.post('/api/documentos/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });
            } else {
                data.id = id;
                await api.put(`/api/documentos/${documentoID}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            history('/documentos')
        } catch (error) {
            alert('Erro ao gravar novo Processo Tente Novamente!')
        }       
    }



    return (
        <>
            <Header/>
            <div className="text-3xl text-sky-500 w-scree text-left ml-20 mt-10">
                <Link to='/documentos'>Voltar</Link>
            </div>

            <div className="w-screen h-screen bg-gradient-to-t from-slate-700 flex flex-col justify-center items-center">
                <h1 className="text-5xl mb-10">{documentoID === '0' ? "'Adicionar' " : "'Editar' "}Documento</h1>

                <form key= {documentoID}
                    onSubmit={saveOrUpdate}
                    className="bg-gradient-to-t from-zinc-300 w-3/6 h-3/4 
                    flex flex-col items-center justify-center gap-3">

                        <label htmlFor="Nome" className="text-2xl text-rose-800" >Nome</label>
                                <input type="text"
                                value={nome}
                                onChange={e => setNome(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <label htmlFor="Descricao" className="text-2xl text-rose-800">Descrição</label>
                                <input type="text"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <button type="submit" onClick={saveOrUpdate} className="w-3/6 h-40 flex items-center justify-center" >
                                    {documentoID === '0' ? "'Adicionar'" : "'Editar'"}
                                    <BiSend title="Adicionar" color="green" className="w-1/4 h-1/4" />
                        </button>                                             
                        
                </form>
            </div>
        </>
    )
}

export default NewDocument