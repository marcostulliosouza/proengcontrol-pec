import { Link } from 'react-router-dom';

import logo from "../assets/icon_pec_cinza.svg"
import { SidebarButton } from "./button_sidebar"

//Icons
import { FaGears } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { FaHome } from "react-icons/fa";

export const Sidebar = (props) => {
    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
    };

    return (
        <div className="bg-pec fixed inset-y-0 left-0 w-[200px] transition duration-200 flex flex-col gap-8 items-center">
            <header className="grid justify-items-center items-center text-cinza-200 font-semibold mt-24">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="PEC" />
                    <h1 className='text-xl'>PEC</h1>
                </div>
                <p className='text-sm'>ProEngControl</p>
            </header>
            <main>
                <body className="grid text-center gap-4 bg-pec">
                    <SidebarButton name={"Menu Principal"} link={"/menu"} icon={FaHome} />
                    <SidebarButton name={"Engenharia de Testes"} link={"/engenharia_testes"} icon={FaGears} />
                </body>
                <footer>
                    <Link to={"/"}>
                        <button
                            onClick={() => handleLogout()}
                            className='absolute bottom-10 left-10 text-cinza-200 text-2xl hover:scale-110 transition duration-200 flex gap-2'
                        >
                            <LuLogOut />
                            <p>Sair</p>
                        </button>
                    </Link>
                    {/* <p className="fixed bottom-2 left-2 text-cinza-200 font-semibold text-[10px]">
                        Desenvolvido por <br></br> Marcos Souza & Samuel Grontoski
                    </p> */}
                </footer>
            </main>
            {props.children}
        </div>
    )
}