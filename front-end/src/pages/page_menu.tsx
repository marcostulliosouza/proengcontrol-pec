// Componentes
import { Sidebar } from '../components/sidebar';
import { BarraPesquisa } from '../components/barra_pesquisa';
import { MenuButton  } from '../components/menu_button';

// Icones
import { BsListColumnsReverse } from "react-icons/bs";

import { Link } from 'react-router-dom';

export function Menu() {
    return (
        <div className="bg-cinza-200 w-screen h-screen">
            <body>
                <div className="bg-cinza-200 fixed inset-y-0 w-screen" />
                <div className="bg-pec fixed inset-y-0 left-0 w-[200px]">
                    <Sidebar />
                </div>
                <main className='absolute inset-y-0 right-0 w-10/12 grid content-start gap-y-5 p-10'>
                    <BarraPesquisa />
                    <div className='w-9/12 text-cinza-500'>
                        <p className='text-sm'>Dashboard Chamados</p>
                        <p className='text-base'>Olá, @usuário</p>
                    </div>
                    <div className="bg-cinza-100 rounded-md drop-shadow grid grid-cols-6 justify-items-center items-center p-10 gap-10">
                        <MenuButton name={"Listar chamados"} link={"/chamados"} icon={BsListColumnsReverse}/>
                        <MenuButton name={"Listar chamados"} link={"/chamados"} icon={BsListColumnsReverse}/>
                    </div>
                </main>
            </body>
        </div>
    )
}