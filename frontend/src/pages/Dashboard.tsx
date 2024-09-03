import React from 'react';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
    return (
        <Layout>
            <div className="p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                {/* Fixed widgets for all users */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Gerenciamento de Chamados</h2>
                        <p>Visualize e gerencie todos os chamados.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Métricas e Relatórios</h2>
                        <p>Acesse relatórios e métricas de desempenho.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Configurações e Ajustes</h2>
                        <p>Configure preferências e ajustes do sistema.</p>
                    </div>
                </div>
                {/* Default widget for all users */}
                <div className="bg-white p-6 rounded-lg shadow mt-6">
                    <h2 className="text-xl font-semibold mb-2">Visão Geral</h2>
                    <p>Visão geral aplicável a todas as funções de usuário.</p>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;