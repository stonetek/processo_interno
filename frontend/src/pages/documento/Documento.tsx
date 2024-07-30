import { Link } from "react-router-dom"
import DataTable from "../../components/table/TableDoc"
import Header from "../../components/header/Header"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { TiArrowBack } from "react-icons/ti"

function Documento() {

    return (
        <>
            <Header/>

            <div className="mt-8 fixed right-16">
                <Link to={"/documentos/new/0"} title='Adicionar Novo Documento'>
                    <BsFillPlusCircleFill className="w-20 h-10 text-blue-600"/>
                </Link>
            </div>
            <div className="text-3xl text-sky-500 w-scree text-center fixed left-6">
                <Link to='/'><TiArrowBack title="VOLTAR" className="w-16 h-16" /></Link>
            </div>
            <h1 className="mt-10 text-2xl text-center">DOCUMENTOS</h1>

            <div className="mx-auto text-center">
                <div className="inline-block">
                    <DataTable/>
                </div>    
            </div>

        </>
    )
}

export default Documento