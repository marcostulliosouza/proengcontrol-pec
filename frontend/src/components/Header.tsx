// ./components/Header.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon_pec_cinza.svg';
import { AiOutlineUser } from 'react-icons/ai';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {

        sessionStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('saveUser');
        navigate('/');
        setMenuOpen(false);
    };

    return (
        <header className="bg-pec text-white p-4 flex items-center justify-between relative pl-16">
            <button className="flex items-center gap-2"
                onClick={() => navigate('/home')}
            >
                <img src={logo} alt="PEC" className="w-6 h-6" />
                <h1 className="text-xl font-semibold">PEC</h1>
            </button>
            <nav className="flex items-center gap-4">
                {/* <button
                    onClick={toggleSidebar}
                    className="text-white hover:text-gray-200"
                >
                    Menu
                </button> */}
                <button
                    onClick={() => navigate('/about')}
                    className="text-white hover:text-gray-200"
                >
                    Sobre
                </button>
                <button
                    onClick={() => navigate('/contact')}
                    className="text-white hover:text-gray-200"
                >
                    Links
                </button>
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
                    >
                        <AiOutlineUser className="text-gray-700" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-lg">
                            <ul className="list-none p-0 m-0">
                                <li>
                                    <button
                                        onClick={() => navigate('/change-password')}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-t-lg"
                                    >
                                        Alterar Senha
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => navigate('/change-profile-pic')}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                    >
                                        Trocar Imagem
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600 rounded-b-lg"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;