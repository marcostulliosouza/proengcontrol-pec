import { useState } from 'react';
// Componentes
import { Sidebar } from '../components/sidebar';
import { HelloUser } from '../components/hello_user';
import { MenuButton } from '../components/button_menu';
import { Logo } from '../components/logo';

// Icons
import { FaGears } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { FaHome, FaRegCheckSquare } from "react-icons/fa";

export function Menu() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className='w-screen h-screen'>
            <div className="grid grid-rows-1 bg-cinza-200 h-1/6">
                <div className='inline-flex p-5 gap-4'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200 flex justify-start items-start'>
                        <IoMenu />
                    </button>
                    <Logo />
                    <div className='flex-col-1 ml-8 mt-4'>
                        <div className='inline-flex content font-bold text-pec gap-2 justify-center items-center'>
                            <FaHome className='mobile:w-0' />
                            <p className='mobile:text-[0px]'>Menu</p>
                        </div>
                        <HelloUser />
                    </div>
                </div>
            </div>
            <div className='bg-cinza-200 w-screen h-5/6 px-5'>
                <div className="bg-cinza-100 rounded-md drop-shadow grid mobile:grid-cols-2 sm:grid-cols-5 grid-cols-6 justify-items-center p-10 gap-10">
                    <MenuButton name={"Engenharia de Testes"} link={"/engenharia_testes"} icon={FaGears} />
                    {/* <MenuButton name={"Qualidade"} link={"/qualidade"} icon={FaRegCheckSquare} /> */}
                </div>
            </div>

            {showSidebar && (
                <div className='backdrop-blur-xs fixed inset-y-0 w-screen z-50'>
                    <Sidebar />
                    <button
                        onClick={() => setShowSidebar(false)}
                        className='absolute top-12 left-12 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )}
        </div>
    )
}