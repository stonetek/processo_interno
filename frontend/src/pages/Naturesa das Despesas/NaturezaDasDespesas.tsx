import { Link } from "react-router-dom"
import Header from "../../components/header/Header"
import DataTableNat from "../../components/table/TableDespesa"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { TiArrowBack } from "react-icons/ti"


function Natureza() {
    return (
       <>
            <Header/>

            <div className="mt-8 fixed right-16">
                      <Link to={"/naturezadasdespesas/new/0"} title='Adicionar Nova Empresa'>
                        <BsFillPlusCircleFill className="w-24 h-14 text-orange-800"/>
                      </Link>
            </div>


            <h1 className="text-3xl text-center mt-8">DESPESAS</h1>

            <div className="mt-2 text-3xl text-sky-500 w-scree text-center fixed left-20">
                <Link to='/'><TiArrowBack title="VOLTAR" className="w-16 h-16" /></Link>
            </div>

            <div className="mx-auto mt-10 text-center">
                <div className="inline-block">

                    <DataTableNat/>
                
                </div>    
            </div>

       </>
    )
}

export default Natureza