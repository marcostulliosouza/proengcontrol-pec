// src/pages/HistoricoAtividades.tsx
import React from 'react';
import Layout from '../components/Layout';
import { AiOutlineHistory, AiOutlineClockCircle } from 'react-icons/ai';

const HistoricoAtividades: React.FC = () => {
    // Simulação de histórico de atividades
    const activities = [
        { description: 'Chamado #123 foi atualizado para "Em Andamento"', date: '01/10/2024 10:00' },
        { description: 'Novo chamado #124 foi criado', date: '30/09/2024 16:30' },
        { description: 'Produto "Produto X" foi adicionado', date: '29/09/2024 14:15' },
    ];

    return (
        <Layout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Histórico de Atividades</h1>
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                            <AiOutlineClockCircle className="text-2xl text-gray-500 mr-3" />
                            <div>
                                <p className="text-sm text-gray-600">{activity.date}</p>
                                <p className="text-lg font-semibold">{activity.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default HistoricoAtividades;