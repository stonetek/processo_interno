import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import FUNDO from '../../public/img/img_mpcm.jpg';


function Home() {

  const [selectedVinculo, setSelectedVinculo] = useState('empresa');
  const [clickedVinculo, setClickedVinculo] = useState<string | null>(null);
  const [springProps, setSpringProps] = useSpring(() => ({
    transform: 'scale(1)',
  }));

  // Função para controlar a animação ao clicar no texto
  const handleClick = (vinculo: string) => {
    setSelectedVinculo(vinculo);
    setClickedVinculo(vinculo);
    setTimeout(() => setClickedVinculo(null), 200);
  };

  const renderVinculoTable = () => {
    switch (selectedVinculo) {
      case 'processos':
        return (
          <div>
            Processos
          </div>
        );
      case 'documentos':
        return (
          <div>
            Documentos
          </div>
        );
      case 'empresas':
        return (
          <div>
            Empresas
          </div>
        );
      case 'naturezaDespesas':
        return (
          <div>
            Natureza das Despesas
          </div>
        );
      case 'vinculos':
        return (
          <div>
            Vínculos
          </div>
        );
      case 'checklist':
        return (
          <div>
            CheckList de Procedimento
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='relative h-screen flex justify-center items-center'>
        <img src={FUNDO} alt='background MPCM' className='absolute inset-0 w-full h-full object-cover' />
        <div className='absolute w-1/6 p-4 text-center'>
          <ul className='p-4'>
            <h1 className='text-3xl mb-6 text-blue-500'>Selecione</h1>
            <animated.li
              style={springProps}
              className='hover:border hover:border-gray-500 hover:text-red-700 rounded mb-2 w-40 bg-slate-300 ml-12'
              onClick={() => handleClick('processos')}
            >
              <NavLink to='/processos'>
                Processos
              </NavLink>
            </animated.li>
            <animated.li
              style={springProps}
              className='hover:border hover:border-gray-500 hover:text-red-700 rounded mb-2 w-40 bg-slate-200 ml-12'
              onClick={() => handleClick('documentos')}
            >
              <NavLink to='/documentos'>
                Documentos
              </NavLink>
            </animated.li>
            <animated.li
              style={springProps}
              className='hover:border hover:border-gray-500 hover:text-red-700 rounded mb-2 w-40 bg-slate-300 ml-12'
              onClick={() => handleClick('empresas')}
            >
              <NavLink to='/empresas'>
                Empresas
              </NavLink>
            </animated.li>
            <animated.li
              style={springProps}
              className='hover:border hover:border-gray-500 hover:text-red-700 rounded mb-2 w-40 bg-slate-200 ml-12'
              onClick={() => handleClick('naturezaDespesas')}
            >
              <NavLink to='/naturezadasdespesas'>
                Natureza das Despesas
              </NavLink>
            </animated.li>
            <animated.li
              style={springProps}
              className='hover:border hover:border-gray-500 hover:text-red-700 rounded mb-2 w-40 bg-slate-300 ml-12'
              onClick={() => handleClick('vinculos')}
            >
              <NavLink to='/vinculos'>
                Vínculos
              </NavLink>
            </animated.li>
            <animated.li
              style={springProps}
              className='hover:border hover:border-gray-500 hover:text-red-700 rounded bg-gray-200 w-40 ml-12'
              onClick={() => handleClick('checklist')}
            >
              <NavLink to='/checklist'>
                CheckLists
              </NavLink>
            </animated.li>
          </ul>
        </div>
      </div>


      <div className='ml-auto mr-4'>

        <div className='mx-auto mt-4 text-center'>
          <div className='inline-block'>{renderVinculoTable()}</div>
        </div>
      </div>
    </>
  );
}

export default Home
