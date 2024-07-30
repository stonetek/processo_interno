import MPCM from '../../../public/img/mpcm.jpg';
import LOGO from '../../assets/img/logo.png';
import '../../global.css'

function Header(){
    return ( 
      <div className=''>
        <div className="bg-gradient-to-r from-slate-700 w-screen h-28">
          <div className="-mt-4 flex row-span-1">
                    <img src={MPCM} alt="logo" className='w-28 h-20 rounded-2xl mt-6 ml-5'/>
                <div className='mt-10 ml-6'>
                    <img src={LOGO} alt="logo" className='w-20 h-8'/>
                    <h1 className='text-gray-300 '>Processos Internos</h1>
                </div>
          </div>

        </div>
      </div>
  )
  
  }
  
  export default Header;