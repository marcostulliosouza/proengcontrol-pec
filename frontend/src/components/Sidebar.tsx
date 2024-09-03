// src/components/Sidebar.tsx
import React from 'react';
import { AiOutlineMenu, AiOutlineDashboard } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-2 bg-pec text-white rounded-full shadow-lg"
            >
                <AiOutlineMenu size={24} />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={toggleSidebar}
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white text-cinza-700 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Menu</h2>
                    <ul>
                        <li>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full text-left px-4 py-2 hover:bg-cinza-200 flex items-center"
                            >
                                <AiOutlineDashboard className="mr-2" /> Dashboard
                            </button>
                        </li>
                        {/* Add more menu items as needed */}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;