import { Link, useNavigate, useParams } from "react-router-dom"
import Header from "../../../components/header/Header"
import { useEffect, useState } from "react"
import api from "../../../services/api";
import { BiSend } from "react-icons/bi";

function NewNatureza() {
    const [id, setId] = useState(null);
    const [numero, setNumero] = useState('');
    const [tipoDeGasto, setTipoDeGasto] = useState('');
    const [saldoTotal, setSaldoTotal] = useState('');
    
    const {naturezaID} = useParams();

    const history = useNavigate();

    async function loadNatureza() {
        try {
            const response = await api.get(`/api/naturezadasdespesas/${naturezaID}`)

            setId(response.data.id);
            setNumero(response.data.numero);
            setTipoDeGasto(response.data.tipoDeGasto);
            setSaldoTotal(response.data.saldoTotal);
        } catch (error) {
            alert('Erro ao listar as naturezas de despesa. Tente Novamente!')
            history('/naturezadasdespesas')
        }
    }

    useEffect(() => {
        if (naturezaID === '0') return;
        else loadNatureza();
    }, [naturezaID])


    async function saveOrUpdate(e:{ preventDefault: () => void}) {
        e.preventDefault();

        const saldoTotalNumber = parseFloat(saldoTotal);
        
        if (!numero ) {
            alert("Por favor, preencha o campo Código antes de salvar.");
            return;
        }

        if (!tipoDeGasto ) {
            alert("Por favor, preencha o campo DESCRIÇÂO antes de salvar.");
            return;
        }

        if (!saldoTotal ) {
            alert("Por favor, preencha o campo Limite de Saldo antes de salvar.");
            return;
        }
    
        const data = {
            numero,
            tipoDeGasto,
            saldoTotal: saldoTotalNumber,

            
        }

        try {
            if(naturezaID === '0') {
                await api.post('/api/naturezadasdespesas/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });
            } else {
                data.id = id;
                await api.put(`/api/naturezadasdespesas/${naturezaID}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            history('/naturezadasdespesas')
        } catch (error) {
            alert('Erro ao gravar novo Processo Tente Novamente!')
        }       
    }


    return (
        <>

            <Header/>
            <div className="text-3xl text-sky-500 w-scree text-left ml-20 mt-10">
                <Link to='/naturezadasdespesas'>Voltar</Link>
            </div>

            <div className="w-screen h-screen bg-gradient-to-t from-slate-700 flex flex-col justify-center items-center">
                <h1 className="text-5xl mb-10">{naturezaID === '0' ? "'Adicionar' " : "'Editar' "}NATUREZA DA DESPESA</h1>

                    <form key= {naturezaID}
                    onSubmit={saveOrUpdate}
                    className="bg-gradient-to-t from-zinc-300 w-3/6 h-3/4 
                    flex flex-col items-center justify-center gap-3">

                        <label htmlFor="Codigo" className="text-2xl text-rose-800" >Código</label>
                                <input type="text"
                                value={numero}
                                onChange={e => setNumero(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <label htmlFor="Gasto" className="text-2xl text-rose-800">Descrição</label>
                                <input type="text"
                                value={tipoDeGasto}
                                onChange={e => setTipoDeGasto(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <label htmlFor="Total" className="text-2xl text-rose-800">Teto de Gasto</label>
                                <input type="number"
                                value={saldoTotal}
                                onChange={e => setSaldoTotal(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />
        

                        <button type="submit" onClick={saveOrUpdate} className="w-3/6 h-40 flex items-center justify-center" >
                                    {naturezaID === '0' ? "'Adicionar'" : "'Editar'"}
                                    <BiSend title="Adicionar" color="green" className="w-1/4 h-1/4" />
                                </button>                                             
                        
                    </form>
            </div>


        </>
    )
}

export default NewNatureza