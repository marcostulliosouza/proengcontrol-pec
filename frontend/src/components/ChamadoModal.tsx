// ./components/ChamadoModal.tsx
import React, { useState, useEffect } from 'react';
import { useChronometer } from '../hooks/useChronometer';
import { format, parseISO } from 'date-fns';
import { useChamados } from '../hooks/useChamados';

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

interface ChamadoModalProps {
    userId: number;
    chamado: Chamado;
    isModalOpen: boolean;
    onClose: () => void;
}

const ChamadoModal: React.FC<ChamadoModalProps> = ({ userId, chamado, isModalOpen, onClose }) => {
    const { atenderChamado, desistirChamado } = useChamados(userId);
    const [isBeingAnswered, setIsBeingAnswered] = useState(false);
    const elapsedTime = useChronometer(chamado.cha_data_hora_atendimento);

    useEffect(() => {
        if (chamado.cha_status === 2 && chamado.support_id === userId) {
            setIsBeingAnswered(true);
        } else {
            setIsBeingAnswered(false);
        }
    }, [chamado, userId]);

    const typeClass = () => {
        if (chamado.cha_plano === 1) {
            return 'bg-red-500';
        } else if (chamado.cha_plano === 0) {
            return 'bg-yellow-500';
        }
        return 'bg-blue-500';
    };

    const formattedDate = chamado.cha_data_hora_atendimento
        ? format(parseISO(chamado.cha_data_hora_atendimento), 'dd/MM/yyyy HH:mm:ss')
        : 'Não atendido';

    const findClass = () => {
        if (chamado.cha_plano === 1) {
            return 'Chamado dentro do plano';
        }
        if (chamado.cha_plano === 0) {
            return 'Chamado fora do plano';
        }
        return 'Chamado de Engenharia';
    };
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Detalhes do Chamado - Produto: {chamado.cha_produto}</h2>
                <div className="text-center mb-6">
                    <div className={`text-7xl text-slate-100 font-bold ${typeClass()}`}>{elapsedTime}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {/* Exibir os detalhes do chamado em campos de formulário desabilitados */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Produto</label>
                        <input
                            type="text"
                            value={chamado.cha_produto}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cliente</label>
                        <input
                            type="text"
                            value={chamado.cha_cliente}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea
                            value={chamado.cha_descricao}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            rows={4}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Operador</label>
                        <input
                            type="text"
                            value={chamado.cha_operador}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data de Abertura</label>
                        <input
                            type="text"
                            value={format(parseISO(chamado.cha_data_hora_abertura), 'dd/MM/yyyy HH:mm:ss')}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data e Hora de Atendimento</label>
                        <input
                            type="text"
                            value={formattedDate}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Local</label>
                        <input
                            type="text"
                            value={chamado.cha_local || 'Não definido'}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Classe</label>
                        <input
                            type="text"
                            value={findClass()}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <input
                            type="text"
                            value={chamado.cha_status === 1 ? 'Aberto' : 'Em atendimento'}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Suporte</label>
                        <input
                            type="text"
                            value={chamado.support || ''}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    {(chamado.support_id !== userId && chamado.cha_status === 2) || chamado.cha_status === 1 ? (
                        <button
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Sair
                        </button>
                    ) : null}

                    {chamado.support_id === userId && chamado.cha_status === 2 && (
                        <button
                            onClick={() => desistirChamado(chamado.cha_id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Desistir
                        </button>
                    )}

                    {chamado.cha_status === 1 && !isBeingAnswered && (
                        <button
                            onClick={() => atenderChamado(chamado.cha_id, userId)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Atender Chamado
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChamadoModal;
