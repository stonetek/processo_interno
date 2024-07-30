import { Link } from "react-router-dom"
import Header from "../../components/header/Header"
import DataTableEmp from "../../components/table/TableEmp"
import { BsFillPlusCircleFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";


function Empresa() {
    return (
        <>
            <Header/>
                
                <div className="mt-8 fixed right-16">
                      <Link to={"/empresas/new/0"} title='Adicionar Nova Empresa'>
                        <BsFillPlusCircleFill className="w-20 h-10 text-gray-500"/>
                      </Link>
                </div>

            <div className="text-3xl text-sky-500 w-scree text-center fixed left-6">
             <Link to='/'><TiArrowBack title="VOLTAR" className="w-16 h-16" /></Link>
            </div>
            
            <h1 className="text-3xl text-center mt-2">EMPRESAS</h1>
            
            <div className="mx-auto mt-10 text-center">
                <div className="inline-block">
                    <DataTableEmp />
                </div>
            </div>
        </>
    )
}

export default Empresa