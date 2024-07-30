import { Link } from "react-router-dom"
import Header from "../../components/header/Header"
import DataTableBond from "../../components/table/tableVinculo/TableEmpresaDespesa"
import { useState } from "react";
import DataTableProcessoEmpresa from "../../components/table/tableVinculo/TableProcessoEmpresa";
import DataTableProcessoDocumento from "../../components/table/tableVinculo/TableProcessoDocumento";
import { animated, useSpring } from "react-spring";
import { TiArrowBack } from "react-icons/ti";


function Vinculos () {

    const [selectedVinculo, setSelectedVinculo] = useState('empresaNatureza');

    const [clickedVinculo, setClickedVinculo] = useState<string | null>(null);

    const renderVinculoTable = () => {
        switch(selectedVinculo) {
            case 'empresaNatureza':
                return <DataTableBond />;
            case 'processoDocumento':
                return <DataTableProcessoDocumento />;
            case 'processoEmpresa':
                return <DataTableProcessoEmpresa />;
            default:
                return null;
        }
    }

    const [springProps, setSpringProps] = useSpring(() => ({
        transform: 'scale(1)',
    }));

    const handleClick = (vinculo: string) => {
        setSelectedVinculo(vinculo);
        setClickedVinculo(vinculo);
        setTimeout(() => setClickedVinculo(null), 200);
    };


    return (
        <>
            <Header/>

            <div className="fixed left-0 top-22 h-full bg-gray-300 w-1/6">
            
                <ul className="p-4">
                    <h1 className="text-4xl mb-5">Escolha um Vinculo</h1>
                    <animated.li 
                        style={springProps}
                        className="hover:border hover:border-gray-500 hover:text-red-700 rounded mb-2"
                        onClick={() => handleClick('empresaNatureza')}
                    >
                        Empresa e Despesa
                    </animated.li>
                    <animated.li 
                        style={springProps}
                        className="hover:border hover:border-gray-500 hover:text-red-700 rounded mb-2"
                        onClick={() => handleClick('processoDocumento')}
                    >
                        Processo e Documento
                    </animated.li>
                    <animated.li 
                        style={springProps}
                        className="hover:border hover:border-gray-500 hover:text-red-700 rounded"
                        onClick={() => handleClick('processoEmpresa')}
                    >
                        Processo e Empresa
                    </animated.li>
                </ul>
            </div>

            <div className="ml-auto mr-4">
                <div className="mt-2 text-3xl text-sky-500 w-scree text-center fixed left-80">
                    <Link to='/'><TiArrowBack title="VOLTAR" className="w-16 h-16" /></Link>
                </div>

                <h1 className="mt-10 text-2xl text-center">VÍNCULOS</h1>

                <div className="mx-auto mt-10 text-center">
                    <div className="inline-block">
                        {renderVinculoTable()}
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Vinculos

