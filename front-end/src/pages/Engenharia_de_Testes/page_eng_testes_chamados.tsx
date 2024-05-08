import { useState } from 'react';
import { Link } from 'react-router-dom';
// Componentes
import { Sidebar } from '../../components/sidebar';
import { BarraPesquisa } from '../../components/barra_pesquisa';
import { HelloUser } from '../../components/hello_user';
import { CollapsibleTable } from "../../components/collapsible_table"

// Icones
import logo from "../../assets/icon_pec.svg"
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

export function Chamados() {
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
                            <Link to={"/menu"} className='inline-flex items-center gap-2'>
                                <FaHome />
                                <p>Menu</p>
                            </Link>
                            <IoIosArrowForward />
                            <Link to={"/engenharia_testes"}>
                                <p>Engenharia de Testes</p>
                            </Link>
                            <IoIosArrowForward />
                            <p>Atendimento de chamado</p>
                        </div>
                        <HelloUser user={localStorage.getItem("user")} />
                    </div>
                </div>
            </header>
            <body className='p-10 mt-24'>
                <div className="py-5">
                    <CollapsibleTable />
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