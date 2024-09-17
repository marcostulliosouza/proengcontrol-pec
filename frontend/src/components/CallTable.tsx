import React, { useEffect, useState } from 'react';
import { getAllCalls, lockCall } from '../api/callApi';
import CallModal from '../components/CallModal';

const CallTable: React.FC = () => {
    const [calls, setCalls] = useState<any[]>([]);
    const [selectedCall, setSelectedCall] = useState<any>(null);

    const fetchCalls = async () => {
        const data = await getAllCalls();
        setCalls(data);
    };

    useEffect(() => {
        fetchCalls();
        const interval = setInterval(() => {
            fetchCalls();
        }, 5000); // Atualiza a cada 5 segundos

        return () => clearInterval(interval); // Limpar o intervalo quando o componente desmontar
    }, []);

    const refreshCalls = async () => {
        await fetchCalls();
    }

    const handleRowClick = async (call: any) => {
        if (!call.isLocked) {
            setSelectedCall(call);
            await lockCall(call.cha_id, true); // Bloquear o chamado
        }
    };

    const handleCloseModal = async () => {
        if (selectedCall) {
            await lockCall(selectedCall.cha_id, false);
        }
        setSelectedCall(null);
    };

    return (
        <div className="p-4">
            <table className="w-full bg-white border border-gray-300 rounded-md shadow-md">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Cliente</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {calls.map((call) => (
                        <tr
                            key={call.cha_id}
                            onClick={() => handleRowClick(call)}
                            className={`hover:bg-gray-50 cursor-pointer ${call.isLocked ? 'bg-gray-200' : ''}`}
                        >
                            <td className="px-4 py-2">{call.cha_id}</td>
                            <td className="px-4 py-2">{call.cha_cliente}</td>
                            <td className="px-4 py-2">{call.cha_status}</td>
                            <td className="px-4 py-2">
                                {call.isLocked ? (
                                    <span>Bloqueado</span>
                                ) : (
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        onClick={() => handleRowClick(call)}
                                    >
                                        Detalhes
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedCall && <CallModal call={selectedCall} onClose={handleCloseModal} refreshCalls={refreshCalls} />}
        </div>
    );
};

export default CallTable;