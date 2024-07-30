import { Link } from "react-router-dom"
import Header from "../../components/header/Header"
import { useState } from "react";
import { animated, useSpring } from "react-spring";
import SearchCompany from "./SearchCompany";
import PesquisaEmpresa from "./BuscaEmpresa";
import { TiArrowBack } from "react-icons/ti";
import { DataTableCheckListED } from "../../components/table/TableCheckListED";
//import { DataTableLimiteDespesa } from "../../components/table/TableLimiteDespesa";



function Checklist () {

    const [selectedVinculo, setSelectedVinculo] = useState('empresa');

    const [clickedVinculo, setClickedVinculo] = useState<string | null>(null);

    const renderVinculoTable = () => {
        switch(selectedVinculo) {
            case 'empresa':
                return <SearchCompany />;
            case 'processo':
                return <PesquisaEmpresa/>;
            case 'Pequisa Natureza':
                return <DataTableCheckListED/>;
            default:
                return null;
        }
    }

    const [springProps, setSpringProps] = useSpring(() => ({
        transform: 'scale(1)',
    }));

    // Função para controlar a animação ao clicar no texto
    const handleClick = (vinculo: string) => {
        setSelectedVinculo(vinculo);
        setClickedVinculo(vinculo);
        setTimeout(() => setClickedVinculo(null), 200);
    };

    

    return (
        <>
            <Header/>
            
            <div className="fixed left-0 top-17 h-full bg-gray-300 w-1/6">
            
                <ul className="p-4">
                    <h1 className="text-3xl">Menu</h1>
                    <animated.li 
                        style={springProps}
                        className="hover:border hover:border-gray-500 hover:text-red-700 rounded mb-2"
                        onClick={() => handleClick('empresa')}
                    >
                        Empresa
                    </animated.li>
                    <animated.li 
                        style={springProps}
                        className="hover:border hover:border-gray-500 hover:text-red-700 rounded mb-2"
                        onClick={() => handleClick('processo')}
                    >
                        Empresa e Processo
                    </animated.li>
                    <animated.li 
                        style={springProps}
                        className="hover:border hover:border-gray-500 hover:text-red-700 rounded"
                        onClick={() => handleClick('Pequisa Natureza')}
                    >
                        Limite Despeza
                    </animated.li>
                </ul>
            </div>

            <div className="ml-auto mr-4">
                <h1 className="mt-10 text-2xl text-center">CHECK LIST</h1>

                <div className="mx-auto mt-4 text-center">
                    <div className="inline-block">
                        {renderVinculoTable()}
                    </div>
                </div>
                
                <div className="mt-2 text-3xl text-sky-500 w-scree text-center fixed left-80 top-24">
                <Link to='/'><TiArrowBack title="VOLTAR" className="w-16 h-16" /></Link>
                </div>
            </div>


            

        </>
    )
}

export default Checklist