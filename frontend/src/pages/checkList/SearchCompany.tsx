import { useEffect, useState } from "react";
import api from "../../services/api";
import { Empresa } from "../../types/Empresa";
import { formatarCNPJ } from "../../utils/formatcnpj";

function SearchCompany() {

    const [termoPesquisa, setTermoPesquisa] = useState('');
    const [dadosEmpresa, setDadosEmpresa] = useState<Empresa[]>([]);
    const [dadosEmpresaFiltrados, setDadosEmpresaFiltrados] = useState<Empresa[]>([]);
    


    useEffect(() => {
        fetchEmpresas();
    }, []);

    

    async function fetchEmpresas() {
        try {
            const response = await api.get('/empresas');
            const empresasData = response.data._embedded.empresas;
            setDadosEmpresa(empresasData);
        } catch (error) {
            console.error('Erro ao buscar empresas:', error);
        }
    }

      const filtrarEmpresas = (termo: string) => {
        const empresasFiltradas = dadosEmpresa.filter(empresa =>
          empresa.nome.toLowerCase().includes(termo.toLowerCase())
        );
        setDadosEmpresaFiltrados(empresasFiltradas);
      };

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTermoPesquisa(e.target.value.toUpperCase());
      };

      const handlePesquisa = () => {
        filtrarEmpresas(termoPesquisa);
      };

      const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            handlePesquisa();
        }
    };

    return (
        <>

            <div className="text-center">
                            <input
                                type="text"
                                value={termoPesquisa}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Digite o nome da empresa"
                                className="text-slate-700 pl-2 mb-4 w-48"
                            />
                            <button onClick={handlePesquisa} className="ml-2">Pesquisar</button>
                            {dadosEmpresaFiltrados.map(empresa => (
                                <div key={empresa.id} className="flex flex-row border border-gray-400 rounded p-2">
                                <h2 className="text-slate-950 text-2xl p-2 w-64">{empresa.nome.toUpperCase()}</h2>
                                <p className="text-slate-950 text-2xl p-2">CNPJ: {formatarCNPJ(empresa.cnpj)}</p>
                                {/* Adicione renderização para outros dados conforme necessário */}
                                </div>
                            ))}
            </div>
        
        </>
    )
}

export default SearchCompany