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
import { FaHome } from "react-icons/fa";

export function Menu() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div className="bg-cinza-200 fixed inset-y-0 w-screen" />
            <header className='absolute top-0 left-0 p-10 flex justify-between gap-4 items-start w-screen'>
                <div className='inline-flex items-start gap-4'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                    <div className="grid justify-items-center items-center text-pec font-semibold">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="PEC" />
                            <h1 className='text-xl'>PEC</h1>
                        </div>
                        <p className='text-sm'>ProEngControl</p>
                    </div>
                    <div className='flex flex-col ml-8 mt-3 gap-3'>
                        <div className='inline-flex items-center gap-2 content font-bold text-pec'>
                            <FaHome />
                            <p>Menu</p>
                        </div>
                        <HelloUser user={localStorage.getItem("user")} />
                    </div>
                </div>
                <BarraPesquisa />
            </header>
            <body className='w-screen grid content-start gap-y-5 p-10 mt-24'>
                <div className="bg-cinza-100 rounded-md drop-shadow grid grid-cols-6 justify-items-center items-start p-10 gap-10">
                    <MenuButton name={"Engenharia de Testes"} link={"/engenharia_testes"} icon={FaGears} />
                    {/* <MenuButton name={"Qualidade"} link={"/qualidade"} icon={FaRegCheckSquare} /> */}
                </div>
            </body>

            {showSidebar && (
                <div className='backdrop-blur-xs fixed inset-y-0 w-screen z-50'>
                    <Sidebar />
                    <button
                        onClick={() => setShowSidebar(false)}
                        className='absolute top-10 left-10 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )}
        </>
    )
}