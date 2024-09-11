// ./components/Table.tsx

import React, { useState } from 'react';
import ChamadoModal from '../components/ChamadoModal';
import '../style/Table.css';
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
    cha_tipo: number;
    cha_status: number;
    support_id: number;
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
    if (minutes === null) return 'duration-na';
    if (minutes > 60) return 'duration-slow'; // Mais de 1 hora
    if (minutes > 30) return 'duration-medium'; // Entre 30 e 60 min
    if (minutes > 20) return 'duration-fast'; // Entre 20 e 30 min
    if (minutes < 0) return 'duration-negative'
    return 'duration-very-fast'; // Menos de 20 minutos
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

    const calcDurationLate = (chamadoDuracaoTotal: number | null, chamadoDuracaoAtendimento: number | null) => {
        if (chamadoDuracaoTotal != null && chamadoDuracaoAtendimento != null) {
            const durationLate = chamadoDuracaoTotal - chamadoDuracaoAtendimento;
            return durationLate;
        } else {
            return 0;
        }
    }

    return (
        <>
            <div className="table-container">
                <table className="table">
                    <thead className="table-header">
                        <tr>
                            <th className="table-header-cell">Prioridade</th>
                            <th className="table-header-cell">Duração</th>
                            <th className="table-header-cell">Tipo de Chamado</th>
                            <th className="table-header-cell">Criado Por</th>
                            <th className="table-header-cell">Local</th>
                            <th className="table-header-cell">Cliente</th>
                            <th className="table-header-cell">Produto</th>
                            <th className="table-header-cell">Status</th>
                            <th className="table-header-cell">Suporte</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {chamados.map((chamado) => (
                            <React.Fragment key={chamado.cha_id}>
                                <tr
                                    className={`table-row cursor-pointer ${expandedRow === chamado.cha_id ? 'selected-row' : ''}`}
                                    onClick={() => handleRowClick(chamado.cha_id)}
                                    onDoubleClick={() => handleRowDoubleClick(chamado)}
                                >
                                    <td className="px-3 py-2 text-center">
                                        <span className={`badge badge-${chamado.cha_plano === 1 ? 'high' : (chamado.cha_plano === 0 ? 'medium' : 'low')}`}>
                                            {chamado.cha_plano === 1 ? 'Alta' : (chamado.cha_plano === 0 ? 'Média' : 'Baixa')}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="duration-container">
                                            <div className={getDurationClass(chamado.duracao_total)}>
                                                TT: {formatDuration(chamado.duracao_total)}
                                            </div>
                                            <div className={getDurationClass(chamado.duracao_atendimento)}>
                                                TA: {formatDuration(chamado.duracao_atendimento)}
                                            </div>
                                            <div className={getDurationClass(calcDurationLate(chamado.duracao_total, chamado.duracao_atendimento))}>
                                                TAtr: {formatDuration(calcDurationLate(chamado.duracao_total, chamado.duracao_atendimento))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 text-gray-500">{chamado.call_type}</td>
                                    <td className="px-3 py-2 text-gray-500">{chamado.cha_operador}</td>
                                    <td className="px-3 py-2 text-gray-500">{chamado.cha_local}</td>
                                    <td className="px-3 py-2 text-gray-500">{chamado.cha_cliente}</td>
                                    <td className="px-3 py-2 text-gray-500">{chamado.cha_produto}</td>
                                    <td className={`px-3 py-2 text-center ${chamado.cha_status === 1 ? 'status-open' : 'status-in-progress'}`}>
                                        {chamado.cha_status === 1 ? 'Aberto' : 'Em Atendimento'}
                                    </td>
                                    <td className="px-3 py-2 text-gray-500">{chamado.support}</td>
                                </tr>
                                {expandedRow === chamado.cha_id && (
                                    <tr>
                                        <td colSpan={9} className="description-cell">
                                            <strong>Descrição:</strong> {chamado.cha_descricao}
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
