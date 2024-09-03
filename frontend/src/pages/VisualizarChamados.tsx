import React, { useState } from 'react';
import Layout from '../components/Layout';
import { format } from 'date-fns';
import { useChamados } from '../hooks/useChamados';

const VisualizarChamados: React.FC = () => {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const { chamados, loading, error, totalPages } = useChamados(page, pageSize);

    if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;
    if (error) return <div className="text-red-500 text-center mt-4">Erro: {error}</div>;

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleRowClick = (chamadoId: number) => {
        console.log(`Abrindo detalhes do chamado com ID: ${chamadoId}`);
        // Implementar redirecionamento ou abrir modal com detalhes do chamado
    };

    return (
        <Layout>
            <div className="p-6 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4">Lista de Chamados</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plano</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duração Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atendimento</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado Por</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Chamado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suporte</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {chamados.map((chamado) => (
                                <tr
                                    key={chamado.cha_id}
                                    className="cursor-pointer hover:bg-gray-100"
                                    onDoubleClick={() => handleRowClick(chamado.cha_id)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {chamado.cha_plano ? '✔️' : '❌'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {chamado.duracao_total ? `${chamado.duracao_total} minutos` : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {chamado.cha_data_hora_atendimento ? format(new Date(chamado.cha_data_hora_atendimento), 'dd/MM/yyyy HH:mm') : 'Não informado'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_operador}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_tipo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_local}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_cliente}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_produto}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {chamado.cha_status === 1 ? 'Pendente' : 'Em andamento'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_operador}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chamado.cha_descricao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        >
                            Página Anterior
                        </button>
                        <span>Página {page} de {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className={`px-4 py-2 rounded-lg ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        >
                            Próxima Página
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default VisualizarChamados;
