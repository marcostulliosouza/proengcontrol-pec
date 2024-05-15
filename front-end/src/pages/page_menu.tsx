import { useState } from 'react';
// Componentes
import { Sidebar } from '../components/sidebar';
import { BarraPesquisa } from '../components/barra_pesquisa';
import { HelloUser } from '../components/hello_user';
import { MenuButton } from '../components/button_menu';
import logo from "../assets/icon_pec.svg"

// Icons
import { FaGears } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { FaHome, FaRegCheckSquare } from "react-icons/fa";

export function Menu() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <header className="grid grid-rows-1 bg-cinza-200">
                <div className='inline-flex p-5 gap-4'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200 flex justify-start items-start'>
                        <IoMenu />
                    </button>

                    <div className="grid justify-items-center items-center text-pec font-semibold">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="PEC" />
                            <h1 className='text-xl'>PEC</h1>
                        </div>
                        <p className='text-sm'>ProEngControl</p>
                    </div>
                    <div className='inline-flex content font-bold text-pec ml-8 gap-2 justify-center items-center'>
                        <FaHome />
                        <p>Menu</p>
                    </div>
                    {/* <BarraPesquisa /> */}
                </div>
            </header>
            <body className='bg-cinza-200 w-screen h-screen p-5'>
                <div className="bg-cinza-100 rounded-md drop-shadow grid mobile:grid-cols-2 sm:grid-cols-5 grid-cols-6 justify-items-center p-10 gap-10">
                    <MenuButton name={"Engenharia de Testes"} link={"/engenharia_testes"} icon={FaGears} />
                    {/* <MenuButton name={"Qualidade"} link={"/qualidade"} icon={FaRegCheckSquare} /> */}
                </div>
            </body>

            {showSidebar && (
                <div className='backdrop-blur-xs fixed inset-y-0 w-screen z-50'>
                    <Sidebar />
                    <button
                        onClick={() => setShowSidebar(false)}
                        className='absolute top-5 left-5 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )}
        </>
    )
}