// src/pages/Perfil.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';

const Perfil: React.FC = () => {
    const [name, setName] = useState('João da Silva');
    const [email, setEmail] = useState('joao.silva@example.com');

    const handleSave = () => {
        // Lógica para salvar informações do perfil
        console.log('Informações do perfil salvas.');
    };

    return (
        <Layout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Perfil do Usuário</h1>
                <div className="space-y-4">
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                            <label className="w-1/3 font-semibold">Nome:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-2/3 p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                            <label className="w-1/3 font-semibold">E-mail:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-2/3 p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Perfil;