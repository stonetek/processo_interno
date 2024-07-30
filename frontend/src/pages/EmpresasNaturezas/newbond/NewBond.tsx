import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Header from "../../../components/header/Header";
import { BiSend } from "react-icons/bi";
import { NumericFormat } from "react-number-format";

function NewBondED() {

    const [id, setId] = useState(null);
    const [empresaNome, setEmpresaNome] = useState ('');
    const [valorDoContrato, setValorDoContrato] = useState('');
    const [tipoDeGasto, setTipoDeGasto] = useState('');
    const [empresaId, setEmpresaId] = useState('');
    const [naturezaId, setNaturezaId] = useState('');
    const [naturezaNumero, setNaturezaNumero] = useState('');
    const [empresaCnpj, setEmpresaCnpj] = useState('');


    const {vinculoID} = useParams();

    const history = useNavigate();

    async function loadEmpresaNat() {
        try {
            const response = await api.get(`/api/empresanatureza/${vinculoID}`)

            setId(response.data.id);
            setEmpresaId(response.data.empresaId);
            setEmpresaNome(response.data.empresaNome);
            setNaturezaId(response.data.naturezaId);
            setNaturezaNumero(response.data.naturezaNumero);
            setEmpresaCnpj(response.data.empresaCnpj);
            setTipoDeGasto(response.data.tipoDeGasto);
            setValorDoContrato(response.data.valorDoContrato)
        } catch (error) {
            alert('Erro ao listar os vinculos existentes. Tente Novamente!')
            history('/vinculos')
        }
    }

    useEffect(() => {
        if (vinculoID === '0') return;
        else loadEmpresaNat();
    }, [vinculoID])


    async function saveOrUpdate(e:{ preventDefault: () => void}) {
        e.preventDefault();

        if (!empresaNome ) {
            alert("Por favor, preencha o campo NOME antes de salvar.");
            return;
        }

        if (!tipoDeGasto ) {
            alert("Por favor, preencha o campo DESCRIÇÃO antes de salvar.");
            return;
        }

        const valorDoContratoNumero = parseFloat(valorDoContrato);
    
        const data = {
            empresaId,
            empresaNome,
            naturezaId,
            naturezaNumero,
            empresaCnpj,
            tipoDeGasto,
            valorDoContrato: valorDoContratoNumero
            
        }

        try {
            if(vinculoID === '0') {
                await api.post('/api/empresanatureza/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });
            } else {
                data.id = id;
                await api.put(`/api/empresanatureza/${vinculoID}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            history('/vinculos')
        } catch (error) {
            alert('Erro ao gravar novo vínculo Tente Novamente!')
        }       
    }



    return (
        <>
            <Header/>
            <div className="text-3xl text-sky-500 w-scree text-left ml-20 mt-10">
                <Link to='/vinculos'>Voltar</Link>
            </div>

            <div className="w-screen h-screen bg-gradient-to-t from-slate-700 flex flex-col justify-center items-center -mt-30">
                <h1 className="text-5xl">{vinculoID === '0' ? "'Adicionar' " : "'Editar' "}Vínculo</h1>

                <form key= {vinculoID}
                    onSubmit={saveOrUpdate}
                    className="bg-gradient-to-t from-zinc-300 w-3/6 h-3/4 
                    flex flex-col items-center justify-center gap-3 -mt-36">

                        <label htmlFor="Nome" className="text-2xl text-rose-800" >Nome da Empresa</label>
                                <input type="text"
                                value={empresaNome}
                                onChange={e => setEmpresaNome(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <label htmlFor="Numero" className="text-2xl text-rose-800">Descrição da Despesa</label>
                                <input type="text"
                                value={tipoDeGasto}
                                onChange={e => setTipoDeGasto(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                        <div className='w-3/4 flex flex-col items-center justify-center gap-3'>
                        <label htmlFor="valorContrato" className='text-2xl text-rose-800'>Valor do Contrato</label>
                            <NumericFormat 
                                id='valorContrato'
                                value={valorDoContrato} 
                                onValueChange={(values) => {
                                    if (values.floatValue !== undefined) {
                                        setValorDoContrato(values.floatValue.toString());
                                    }
                                }}
                                allowLeadingZeros={false}
                                allowNegative={false}
                                decimalScale={2}
                                decimalSeparator=','
                                thousandSeparator='.'
                                className='text-black bg-red-400 mb-4 w-3/9'/>                                                                   
                        </div>

                        <button type="submit" onClick={saveOrUpdate} className="flex items-center justify-center" >
                                    {vinculoID === '0' ? "'Adicionar'" : "'Editar'"}
                                    <BiSend title="Adicionar" color="green" className="w-20 h-14" />
                        </button>                                             
                        
                </form>
            </div>
        
        
        </>
    )
}

export default NewBondED