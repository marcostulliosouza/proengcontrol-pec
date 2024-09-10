// /components/Table.tsx
import React, { useState } from 'react';
import ChamadoModal from '../components/ChamadoModal';

interface Chamado {
    cha_id: number;
    cha_cliente: string;
    cha_data_hora_abertura: string;
    cha_data_hora_atendimento: string | null;
    cha_data_hora_termino: string | null;
    cha_descricao: string;
    cha_local: string;
    cha_operador: string;
    cha_plano: number;
    cha_produto: string;
    cha_status: number;
    cha_tipo: number;
    cha_visualizado: boolean;
    duracao_total: number | null;
    duracao_atendimento: number | null;
    cha_DT: string | null;
    support: string | null;
    call_type: string | null;
}

interface TableProps {
    chamados: Chamado[];
}

const formatDuration = (minutes: number | null): string => {
    if (minutes === null) return 'N/A';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
};

const getDurationClass = (minutes: number | null): string => {
    if (minutes === null) return '';
    if (minutes < 0) return 'text-blue-500';
    if (minutes > 60) return 'text-red-500'; // Mais de 1 hora
    if (minutes > 30) return 'text-orange-500'; // Entre 20 e 30 min
    if (minutes > 20) return 'text-yellow-500'; // Entre 0 e 20 min
    return 'text-gray-500'; // Menos de 30 minutos
};

const Table: React.FC<TableProps> = ({ chamados }) => {
    const [selectedChamado, setSelectedChamado] = useState<Chamado | null>(null);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const handleRowClick = (chamadoId: number) => {
        setExpandedRow(expandedRow === chamadoId ? null : chamadoId);
    };

    const handleRowDoubleClick = (chamado: Chamado) => {
        setSelectedChamado(chamado);
    };

    const handleCloseModal = () => {
        setSelectedChamado(null);
    };

    const handleAtenderChamado = () => {
        if (selectedChamado) {
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
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classe</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duração Total</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duração Atendimento</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Chamado</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado Por</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suporte</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {chamados.map((chamado) => (
                            <React.Fragment key={chamado.cha_id}>
                                <tr
                                    className="cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleRowClick(chamado.cha_id)}
                                    onDoubleClick={() => handleRowDoubleClick(chamado)}
                                >
                                    <td className="px-3 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                                        {chamado.cha_plano === 1 && <span>🔴</span>}
                                        {chamado.cha_plano === 0 && <span>🟡</span>}
                                        {chamado.cha_plano === -1 && <span>🔵</span>}
                                    </td>
                                    <td className={`px-3 py-2 whitespace-nowrap text-sm ${getDurationClass(chamado.duracao_total)} font-bold`}>
                                        {formatDuration(chamado.duracao_total)}
                                    </td>
                                    <td className={`px-3 py-2 whitespace-nowrap text-sm ${getDurationClass(chamado.duracao_atendimento)}`}>
                                        {formatDuration(chamado.duracao_atendimento)}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{chamado.call_type}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{chamado.cha_operador}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{chamado.cha_local}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{chamado.cha_cliente}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{chamado.cha_produto}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{chamado.cha_status === 1 ? 'Aberto' : 'Em atendimento'}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{chamado.support}</td>
                                </tr>
                                {expandedRow === chamado.cha_id && (
                                    <tr>
                                        {/* <td className="px-3 py-2 text-left text-sm font-medium bg-gray-100 text-gray-700 uppercase tracking-wider">Descrição:</td> */}
                                        <td colSpan={10} className="px-3 py-5 bg-gray-100 text-sm text-gray-700 font-medium">
                                            DESCRIÇÃO: {chamado.cha_descricao}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
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
