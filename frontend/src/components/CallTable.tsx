import React, { useState, useEffect } from 'react';
import { getAllCalls, lockCall, isLockedCall } from '../api/callApi'; // Adicione `isLockedCall`
import CallModal from './CallModal';

interface Call {
    cha_id: string;
    cha_cliente: string;
    cha_tipo: string;
    cha_status: number;
    cha_produto: string;
    cha_dispositivo: string;
    cha_local: string;
    cha_descricao: string;
    cha_criadoPor: string;
    cha_tempoTotal: string;
}

const CallTable: React.FC = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [selectedCall, setSelectedCall] = useState<Call | null>(null);
    const [loading, setLoading] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

    const fetchCalls = async () => {
        setLoading(true);
        try {
            const data = await getAllCalls();
            setCalls(data);
        } catch (error) {
            console.error('Erro ao buscar os chamados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Busca os chamados inicialmente
        fetchCalls();

        // Atualiza a cada 5 segundos
        const interval = setInterval(fetchCalls, 5000);
        setRefreshInterval(interval);

        // Limpa o intervalo ao desmontar o componente
        return () => {
            if (refreshInterval) clearInterval(refreshInterval);
        };
    }, []);

    const handleRowClick = async (call: Call) => {
        try {
            // Verifica se o chamado já está bloqueado
            const lockStatus = await isLockedCall(call.cha_id);

            if (lockStatus.isLocked) {
                alert('Este chamado já está sendo visualizado por outro usuário.');
                return;
            }

            // Tenta bloquear o chamado para visualização
            await lockCall(call.cha_id, true);
            setSelectedCall(call);
        } catch (error) {
            console.error('Erro ao bloquear o chamado:', error);
            alert('Erro ao tentar bloquear o chamado.');
        }
    };

    const handleCloseModal = async () => {
        if (selectedCall) {
            try {
                // Desbloquear o chamado ao fechar o modal
                await lockCall(selectedCall.cha_id, false);
                setSelectedCall(null);
                await fetchCalls();
            } catch (error) {
                console.error('Erro ao desbloquear o chamado:', error);
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Lista de Chamados</h2>
            {loading ? (
                <p>Carregando chamados...</p>
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Cliente</th>
                            <th className="px-4 py-2 border">Tipo</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Produto</th>
                            <th className="px-4 py-2 border">Local</th>
                            <th className="px-4 py-2 border">Descrição</th>
                            <th className="px-4 py-2 border">Criado Por</th>
                            <th className="px-4 py-2 border">Tempo Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calls.map((call) => (
                            <tr
                                key={call.cha_id}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleRowClick(call)}
                            >
                                <td className="border px-4 py-2">{call.cha_id}</td>
                                <td className="border px-4 py-2">{call.cha_cliente}</td>
                                <td className="border px-4 py-2">{call.cha_tipo}</td>
                                <td className="border px-4 py-2">{call.cha_status === 1 ? 'Aberto' : 'Atendido'}</td>
                                <td className="border px-4 py-2">{call.cha_produto}</td>
                                <td className="border px-4 py-2">{call.cha_local}</td>
                                <td className="border px-4 py-2">{call.cha_descricao}</td>
                                <td className="border px-4 py-2">{call.cha_criadoPor}</td>
                                <td className="border px-4 py-2">{call.cha_tempoTotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedCall && (
                <CallModal
                    call={selectedCall}
                    onClose={handleCloseModal}
                    refreshCalls={fetchCalls}
                />
            )}
        </div>
    );
};

export default CallTable;
