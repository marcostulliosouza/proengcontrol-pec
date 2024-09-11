// src/pages/Configuracoes.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { AiOutlineSetting } from 'react-icons/ai';

const Configuracoes: React.FC = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const handleSave = () => {
        // Lógica para salvar configurações
        console.log('Configurações salvas.');
    };

    return (
        <Layout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Configurações</h1>
                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <AiOutlineSetting className="text-2xl text-gray-500 mr-3" />
                            <div>
                                <h2 className="text-lg font-semibold">Notificações por E-mail</h2>
                                <p className="text-sm text-gray-600">Receber notificações por e-mail para novos chamados e atualizações.</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                            className="form-checkbox"
                        />
                    </div>
                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <AiOutlineSetting className="text-2xl text-gray-500 mr-3" />
                            <div>
                                <h2 className="text-lg font-semibold">Modo Escuro</h2>
                                <p className="text-sm text-gray-600">Ativar modo escuro para a interface.</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            className="form-checkbox"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Salvar Configurações
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Configuracoes;