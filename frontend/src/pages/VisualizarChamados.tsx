// src/pages/VisualizarChamados.tsx
import React from 'react';
import { useChamados } from '../hooks/useChamados';
import Layout from '../components/Layout';
import { format } from 'date-fns';

const VisualizarChamados: React.FC = () => {
    const { chamados, loading, error } = useChamados();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Layout>
            <div className="p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Visualizar Chamados</h1>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Lista de Chamados</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ícone no Plano</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duração Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atendimento</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado Por</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Chamado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suporte Responsável</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição do Chamado</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {chamados.map((chamado) => (
                                <tr key={chamado.cha_id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {/* Ícone no Plano */} </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {/* Duração Total */} </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {chamado.cha_data_hora_atendimento ? format(new Date(chamado.cha_data_hora_atendimento), 'dd/MM/yyyy HH:mm') : 'Não informado'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_operador}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_tipo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_local}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_cliente}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_produto}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_status === 1 ? 'Pendente' : 'Em andamento'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_plano}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_descricao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default VisualizarChamados;
