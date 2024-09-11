// src/pages/AbrirChamado.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import SelectField from '../components/SelectField';
import { useNavigate } from 'react-router-dom';

const AbrirChamado: React.FC = () => {
    const navigate = useNavigate();

    // States for form inputs
    const [produto, setProduto] = useState<{ value: number; label: string } | null>(null);
    const [cliente, setCliente] = useState<{ value: number; label: string } | null>(null);
    const [descricao, setDescricao] = useState('');

    // Sample data for select options
    const produtos = [
        { value: 1, label: 'Produto A' },
        { value: 2, label: 'Produto B' },
        // Add more options as needed
    ];

    const clientes = [
        { value: 1, label: 'Cliente X' },
        { value: 2, label: 'Cliente Y' },
        // Add more options as needed
    ];

    // Handler for form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement form submission logic here
        console.log({
            produto: produto?.label,
            cliente: cliente?.label,
            descricao,
        });
        // Navigate to another page if needed
        navigate('/home');
    };

    return (
        <Layout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Abrir Chamado</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <SelectField
                            options={produtos}
                            onChange={setProduto}
                            placeholder="Selecione um produto"
                        />
                    </div>
                    <div className="mb-4">
                        <SelectField
                            options={clientes}
                            onChange={setCliente}
                            placeholder="Selecione um cliente"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descrição do chamado"
                            rows={4}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        Abrir Chamado
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AbrirChamado;