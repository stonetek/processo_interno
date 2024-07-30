import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../../../components/header/Header';
import api from '../../../services/api';
import { Empresa } from '../../../types/Empresa';
import { Natureza } from '../../../types/Natureza';
import { BiSend } from 'react-icons/bi';
import { useBond } from '../../../context/BondContext';
import { NumericFormat } from 'react-number-format';


function NewBondEN() {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [naturezas, setNaturezas] = useState<Natureza[]>([]);
    const [empresaSelecionada, setEmpresaSelecionada] = useState('');
    const [naturezaSelecionada, setNaturezaSelecionada] = useState('');
    const [valorDoContrato, setValorDoContrato] = useState('');
    const [saldoDisponivel, setSaldoDisponivel] = useState<number | null>(null);

    const { bondData, setBondData } = useBond();
    const { vinculoID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmpresas();
        fetchNaturezas();
    }, []);

    useEffect(() => {
        if (vinculoID !== '0' && bondData && naturezas.length > 0) {
            const naturezaEncontrada = naturezas.find((nat) => nat.id === bondData.naturezaId);
            if (naturezaEncontrada) {
                setNaturezaSelecionada(String(naturezaEncontrada.id));
                setSaldoDisponivel(naturezaEncontrada.saldoDisponivel);
            } else {
                console.warn('Despesa não encontrada com Id:', bondData.naturezaId);
            }
    
            const empresaEncontrada = empresas.find(empresa => empresa.id === bondData.empresaId);
            if (empresaEncontrada) {
                setEmpresaSelecionada(String(empresaEncontrada.id));
            } else {
                console.warn('Empresa não encontrada com empresaId:', bondData.empresaId);
            }
            setValorDoContrato(bondData.valorDoContrato.toString());
        }
    }, [vinculoID, bondData, empresas, naturezas]);
    

    async function fetchEmpresas() {
        try {
            const response = await api.get('api/empresas');
            setEmpresas(response.data);
        } catch (error) {
            console.error('Erro ao buscar empresas:', error);
        }
    }

    async function fetchNaturezas() {
        try {
            const response = await api.get('/api/naturezadasdespesas');
            setNaturezas(response.data);
        } catch (error) {
            console.error('Erro ao buscar naturezas:', error);
        }
    }

    async function saveOrUpdate(e: { preventDefault: () => void; }) {
        e.preventDefault();
        if (!empresaSelecionada) {
            alert("Por favor, preencha o campo EMPRESA antes de salvar.");
            return;
        }
        if (!naturezaSelecionada) {
            alert("Por favor, preencha o campo NATUREZA antes de salvar.");
            return;
        }
        if (!valorDoContrato) {
            alert("Por favor, preencha o campo VALOR antes de salvar.");
            return;
        }
        try {
            const empresa = empresas.find((empresa) => String(empresa.id) === empresaSelecionada);
            if (!empresa) {
                alert("Empresa selecionada não encontrada nos dados.");
                return;
            }
    
            const empresaId = empresa.id;
    
            const natureza = naturezas.find((nat) => String(nat.id) === naturezaSelecionada);
            if (!natureza) {
                alert("Despesa selecionada não encontrada nos dados.");
                return;
            }
    
            const saldoDisponivelNumero = natureza.saldoDisponivel || 0;
    
            let valorDoContratoAnterior = 0;
            if (vinculoID !== '0') {
                const response = await api.get(`/api/empresanatureza/${vinculoID}`);
                valorDoContratoAnterior = response.data.valorDoContrato || 0;
    
                // Somar o valor do contrato anterior ao saldo disponível da natureza
                natureza.saldoDisponivel += valorDoContratoAnterior;
            }
    
            const valorDoContratoSemPontos = valorDoContrato.replace('.', '');
            const valorDoContratoNumero = parseFloat(valorDoContratoSemPontos.replace(',', '.'));

            const saldoAtualizado = saldoDisponivelNumero + valorDoContratoAnterior - valorDoContratoNumero;
            if (saldoAtualizado < 0) {
                alert("Saldo disponível é insuficiente para cobrir o valor do contrato.");
                return;
            }
    
            const data = {
                empresaId: empresaId,
                naturezaId: naturezaSelecionada,
                valorDoContrato: valorDoContratoNumero
            };
    
            // Atualizar o saldo disponível da natureza antes de salvar o contrato editado
            await api.put(`/api/naturezadasdespesas/${natureza.id}`, { saldoDisponivel: saldoAtualizado });
    
            // Salvar o contrato editado
            if (vinculoID === '0') {
                await api.post('/api/empresanatureza/', data);
            } else {
                await api.put(`/api/empresanatureza/${vinculoID}`, data);
            }
    
            navigate('/vinculos');
        } catch (error) {
            console.error('Erro ao gravar novo vínculo:', error);
            alert('Erro ao gravar novo processo. Tente novamente!');
        }
    }
    

    return (
        <>
            <Header />
            <div className="text-3xl text-sky-500 w-scree text-left ml-20 mt-5">
                <Link to='/vinculos'>Voltar</Link>
            </div>

            <div className="w-screen h-screen bg-gradient-to-t from-slate-700 flex flex-col justify-center items-center -mt-20">
                <h1 className="text-5xl">{vinculoID === '0' ? "'Adicionar' " : "'Editar' "}Vínculo</h1>

                <form onSubmit={saveOrUpdate} className="bg-gradient-to-t from-zinc-300 w-3/6 h-3/4 flex flex-col items-center justify-center gap-3 -mt-48">
                    <div className='w-3/4'>
                        <label htmlFor="empresa" className='ml-3 text-gray-900'>Empresa: </label>
                        <select id="empresa" value={empresaSelecionada} 
                        onChange={(e) => setEmpresaSelecionada(e.target.value)} 
                        className='text-black bg-red-400 w-3/4 mb-4'
                        disabled={vinculoID !== '0'}>
                            <option value="">Selecione uma empresa</option>
                            {empresas.map(empresa => (
                                <option key={empresa.id} value={String(empresa.id)}>{empresa.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-3/4'>
                        <label htmlFor="natureza" className='ml-3 text-gray-900'>Despesa: </label>
                        <select id="natureza" value={naturezaSelecionada} 
                        onChange={(e) => setNaturezaSelecionada(e.target.value)} 
                        className='text-black bg-red-400 w-3/4'
                        disabled={vinculoID !== '0'}>
                            <option value="">Selecione uma despesa</option>
                            {naturezas.map(natureza => (
                                <option key={natureza.id} value={String(natureza.id)}>{natureza.numero}</option>
                            ))}
                        </select>
                    </div>

                    <div className='w-3/4'>
                        <label htmlFor="valorContrato" className='-ml-12 text-gray-900'>Valor do Contrato: </label>
                            <NumericFormat 
                                id='valorContrato'
                                value={valorDoContrato} 
                                onValueChange={(values) => setValorDoContrato(values.formattedValue)}
                                allowLeadingZeros={false}
                                allowNegative={false}
                                decimalScale={2}
                                decimalSeparator=','
                                className='text-black bg-red-400 mb-4 w-3/4'/>                                                                   
                    </div>

                    <button type="submit" onClick={saveOrUpdate} className="flex items-center justify-center">
                        {vinculoID === '0' ? "'Adicionar'" : "'Editar'"}
                        <BiSend title="Adicionar" color="green" className="w-20 h-16" />
                    </button>
                </form>
            </div>
        </>
    );
}

export default NewBondEN;

