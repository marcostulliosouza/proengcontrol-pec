import { useState } from 'react';
import { Link } from 'react-router-dom';
// Componentes
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { CollapsibleTable } from "../../components/collapsible_table"
import { Logo } from '../../components/logo';

// Icones
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

export function Chamados() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className='w-screen h-screen'>
            <header className="grid grid-rows-1 bg-cinza-200 h-1/6">
                <div className='inline-flex p-5 gap-4'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200 flex justify-start items-start'>
                        <IoMenu />
                    </button>
                    <Logo />
                    <div className='flex-col-1 ml-8 mt-4'>
                        <div className='inline-flex content font-bold text-pec gap-2 justify-center items-center'>
                            <Link to={"/menu"} className='inline-flex items-center gap-2'>
                                <FaHome className='mobile:w-0' />
                                <p className='mobile:text-[0px]'>Menu</p>
                            </Link>
                            <IoIosArrowForward className='mobile:w-0' />
                            <Link to={"/engenharia_testes"}>
                                <p className='mobile:text-[0px]'>Engenharia de Testes</p>
                            </Link>
                            <IoIosArrowForward className='mobile:w-0' />
                            <p>Atendimento de chamado</p>
                        </div>
                        <HelloUser />
                    </div>
                </div>
            </header>
            <body>
                <CollapsibleTable />
            </body>

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