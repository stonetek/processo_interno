import { Link } from "react-router-dom"
import Header from "../../components/header/Header"
import { BsFillPlusCircleFill } from "react-icons/bs";
import DataTableProcess from "../../components/table/TableProcess";
import { TiArrowBack } from "react-icons/ti";



function Processos () {

  return (
    <>
    
      <Header/>

          <div className="mt-8 fixed right-16">
            <Link to={"/processos/new/0"} title='Adicionar Novo Processo'>
              <BsFillPlusCircleFill className="w-20 h-10 text-red-800"/>
              </Link>
          </div>
                    
          <h1 className="text-3xl text-center mt-8">PROCESSOS</h1>

          <div className="text-3xl text-sky-500 w-scree text-center fixed left-6 -mt-10">
                <Link to='/'><TiArrowBack title="VOLTAR" className="w-16 h-16" /></Link>
            </div>
          
          <div className="ml-32">
                <DataTableProcess />
          </div>

    </>
  )
}

export default Processos