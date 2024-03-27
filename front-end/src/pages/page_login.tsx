import { Link } from 'react-router-dom';

import logo from '../assets/icon_pec.svg'
import { AiOutlineUser } from "react-icons/ai";
import { GoKey } from "react-icons/go";

export function Login() {

    return (
  
      <div className='grid grid-cols-2 h-screen bg-pec'>
        <div className='bg-cinza max-w-[50vh] w-full h-[70vh] fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md'>
          <div>
            <main className="flex flex-col mt-20 gap-10">
              <header className="flex flex-col items-center text-pec font-semibold">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="PEC" />
                  <h1 className='text-xl'>PEC</h1>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className='text-sm'>ProEngControl</p>
                  <p className='text-cinza-medium_dark'>Bem-Vindo!</p>
                </div>
              </header>
              <form
                className="flex flex-col items-center gap-4 font-normal"
              >
                <div className="flex items-center gap-2">
                  <AiOutlineUser className='w-5 pr-1 opacity-50' />
                  <input className='bg-cinza indent-1'
                    type="text"
                    placeholder='Login'
                  />
                </div>
                <div className="flex items-center gap-2">
                  <GoKey  className='w-5 pr-1 opacity-50' />
                  <input className='bg-cinza indent-1'
                    type="text"
                    placeholder='Senha'
                  />
                </div>
                <div className='flex items-center gap-2 font-normal -translate-x-1/4'>
                  <button
                    id='rememberUser'
                    type='button'
                    className='box-border h-5 w-5 bg-cinza-extra_dark rounded-md focus:bg-pec'
                  >
                  </button>
                  <span className='text-pec'>
                    Lembrar usuário
                  </span>
                </div>
                <footer className="flex flex-col gap-8 pt-10">
                  <Link to="/chamados">
                    <button
                      type="submit"
                      className='fixed left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold border border-pec rounded-md box-border h-10 w-32 bg-pec text-cinza'
                    >
                      Entrar
                    </button>
                  </Link>
                </footer>
              </form>
            </main>
          </div>
        </div>
      </div>
    )
  }