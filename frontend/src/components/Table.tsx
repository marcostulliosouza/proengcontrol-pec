// /components/Table.tsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import ChamadoModal from '../components/ChamadoModal'; // Componente do Modal

interface Chamado {
    cha_id: number;
    cha_cliente: string;
    cha_data_hora_abertura: string;
    cha_data_hora_atendimento: string | null;
    cha_data_hora_termino: string | null;
    cha_descricao: string;
    cha_local: string;
    cha_operador: string;
    cha_plano: boolean;
    cha_produto: string;
    cha_status: number;
    cha_tipo: string;
    cha_visualizado: boolean;
    duracao_total: number | null;
    duracao_atendimento: number | null;
}

interface TableProps {
    chamados: Chamado[];
}

const Table: React.FC<TableProps> = ({ chamados }) => {
    const [selectedChamado, setSelectedChamado] = useState<Chamado | null>(null);

    const handleRowClick = (chamado: Chamado) => {
        setSelectedChamado(chamado);
    };

    const handleCloseModal = () => {
        setSelectedChamado(null);
    };

    const handleAtenderChamado = () => {
        if (selectedChamado) {
            // Lógica para atender o chamado
            console.log('Atender chamado:', selectedChamado.cha_id);
            handleCloseModal();
        }
    };

    return (
        <>
            <div className="overflow-x-auto max-w-full max-h-[calc(100vh-50px)]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plano</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duração Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atendimento</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado Por</th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Chamado</th>
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
                                onDoubleClick={() => handleRowClick(chamado)}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {chamado.cha_plano ? '🔴' : '🟡'}
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate w-64">{chamado.cha_descricao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedChamado && (
                <ChamadoModal
                    chamado={selectedChamado}
                    onClose={handleCloseModal}
                    onAtender={handleAtenderChamado}
                />
            )}
        </>
    );
};

export default Table;
