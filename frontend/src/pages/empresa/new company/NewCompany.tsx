import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Header from "../../../components/header/Header";
import { BiSend } from "react-icons/bi";
import { formatLocalDate } from "../../../utils/format";


function NewCompany() {

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [contratoDesde, setContratoDesde] = useState('');
    const [processoVigente, setProcessoVigente] = useState ('');

    const {empresaID} = useParams();

    const history = useNavigate();

    const [formattedCnpj, setFormattedCnpj] = useState<string>('');
    

    const formatCnpj = (cnpj: string) => {
        const cleanedCnpj = cnpj.replace(/[^\d]/g, '');
        return cleanedCnpj.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
          '$1.$2.$3/$4-$5'
        );
    };
      
    const handleCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;   
        const formattedValue = formatCnpj(inputValue);
        setFormattedCnpj(formattedValue);
        const numericValue = inputValue.replace(/[^\d]/g, '');
        const formattedNumericValue = formatCnpj(numericValue);
        setCnpj(formattedNumericValue);
    };
    
 
    async function loadEmpresa() {
        try {
            const response = await api.get(`api/empresas/${empresaID}`)
            
            let adjustedDate = response.data.contratoDesde.split("T", 10)[0];
            setId(response.data.id);
            setNome(response.data.nome);
            const formattedCnpj = formatCnpj(response.data.cnpj);
            setCnpj(formattedCnpj);
            setContratoDesde(adjustedDate);
            setProcessoVigente(response.data.processoVigente);
        } catch (error) {
            alert('Erro ao recuperar lista de empresas. Tente de novo!')
            history('/empresas')
        }
    }


    useEffect(() => {
        if (empresaID === '0') return;
        else loadEmpresa();
    }, [empresaID])

    async function saveOrUpdate(e:{ preventDefault: () => void}) {
        e.preventDefault();

        const numericCnpj = cnpj.replace(/[^\d]/g, '');

        if (!nome) {
            alert("Por favor, preencha o campo 'nome' antes de salvar.");
            return;
        }
        
        if (!cnpj) {
            alert("Por favor, preencha o campo 'cnpj' antes de salvar.");
            return;
        }
        
        if (!processoVigente) {
            alert("Por favor, preencha o campo 'processoVigente' antes de salvar.");
            return;
        }
        
        const data = {
            nome,
            cnpj: numericCnpj,
            contratoDesde: formatLocalDate(contratoDesde, 'yyyy-MM-dd'),
            processoVigente: processoVigente === "Sim",
            naturezas: [
                { id: null }
            ]
        }

        try {
            if(empresaID === '0') {
                await api.post('api/empresas/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });
            } else {
                data.id = id;
                await api.put(`/api/empresas/${empresaID}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            history('/empresas')
        } catch (error) {
            alert('Erro ao gravar nova empresa. Tente Novamente!')
        }       
    }



    return (
        <>
            <Header/>
                    <div className="text-3xl text-sky-500 w-scree text-left ml-20 mt-10">
                        <Link to='/empresas'>Voltar</Link>
                    </div>
            <div className="w-screen h-screen bg-gradient-to-t from-slate-700 flex flex-col justify-center items-center">
                <h1 className="text-5xl mb-10">{empresaID === '0' ? "'Adicionar' " : "'Editar' "}Empresa</h1>

                    <form key= {empresaID}
                    onSubmit={saveOrUpdate}
                    className="bg-gradient-to-t from-zinc-300 w-3/6 h-3/4 
                    flex flex-col items-center justify-center gap-3">

                                <label htmlFor="Nome" className="text-2xl text-rose-800" >Nome</label>
                                <input type="text"
                                value={nome}
                                onChange={e => setNome(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                                <label htmlFor="CNPJ" className="text-2xl text-rose-800">CNPJ</label>
                                <input type="text"
                                value={cnpj}
                                onChange={handleCnpjChange} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />

                                <label htmlFor="Contratodesde" className="text-2xl text-rose-800">Contrato desde</label>
                                <input type="date"
                                value={contratoDesde}
                                onChange={e => setContratoDesde(e.target.value)} 
                                className="w-3/4 text-black bg-red-400 text-left pl-2" />        

                                <label htmlFor="Vigente" className="text-2xl text-rose-800">Processo Vigente</label>
                                <div className="w-3/4 text-center bg-black text-rose-800">
                                    {empresaID !== '0' ? (
                                         <input type="text"
                                         id="processoVigente"
                                         name="processoVigente"
                                         value={processoVigente ? "SIM" : "NÃO"}
                                         disabled={true}
                                         className="text-center font-bold text-2xl"
                                     />
                                    ) : (
                                        <>
                                            <input type="radio"
                                                id="vigenteSim"
                                                name="processoVigente"
                                                value="Sim"
                                                checked={processoVigente === "Sim"}
                                                onChange={() => setProcessoVigente("Sim")}
                                                className="mr-2"
                                            />
                                            <label htmlFor="vigenteSim" className="mr-4">Sim</label>
                                            <input type="radio"
                                                id="vigenteNao"
                                                name="processoVigente"
                                                value="Não"
                                                checked={processoVigente === "Não"}
                                                onChange={() => setProcessoVigente("Não")}
                                                className="mr-2 ml-10"
                                            />
                                            <label htmlFor="vigenteNao">Não</label>
                                        </>
                                    )}
                                </div>



                        <button type="submit" onClick={saveOrUpdate} className="flex items-center justify-center" >
                                    {empresaID === '0' ? "'Adicionar'" : "'Editar'"}
                                    <BiSend title="Adicionar" color="green" className="text-3xl h-20" />
                                </button>                                             
                        
                    </form>
            </div>
        
        </>
    )
}

export default NewCompany