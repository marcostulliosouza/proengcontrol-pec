import { BsSearch } from "react-icons/bs";
import { HiLogout } from "react-icons/hi";
import { BiSolidUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    IconButton,
    Typography,
} from "@material-tailwind/react";

// Função para limpar o localStorage, isso garante que o navegador não armazene o token de autenticação quando o usuário da logout
const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
};

export const BarraPesquisa = (props: any) => {
    return (
        <div className="flex items-center h-10 rounded-md bg-cinza-300 drop-shadow">
            <BsSearch className="mx-4 opacity-70" />
            <input className='bg-cinza-300 indent-1 w-11/12 outline-none align-middle'
                type="text"
                placeholder='Pesquisar'
            />
            <div className="fixed right-0 border-0">
                <Menu>
                    <MenuHandler>
                        <IconButton variant="text">
                            <BiSolidUserCircle className="text-2xl text-pec hover:scale-110 transition duration-200" />
                        </IconButton>
                    </MenuHandler> 
                    <MenuList className="bg-cinza-300 p-2">
                        <MenuItem className="gap-2 border-0">
                            <Link to="/">
                                <button onClick={handleLogout} className="flex items-center gap-2 p-1">
                                    <HiLogout className="text-cinza-500 text-xl"/>
                                    <Typography variant="small" className="font-semibold text-cinza-500">
                                        Sair
                                    </Typography>
                                </button>
                            </Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
            {props.children}
        </div>
    )
}