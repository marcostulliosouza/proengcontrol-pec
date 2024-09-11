// ./hooks/useChamados.ts
import { useState, useEffect } from 'react';
import { API_URL } from '../config/apiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import io from 'socket.io-client';

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
interface UseChamadosResponse {
    chamados: Chamado[];
    loading: boolean;
    error: string | null;
}

export function useChamados(): UseChamadosResponse {
    const [chamados, setChamados] = useState<Chamado[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const notifyNewCall = (call: Chamado) => {
        toast.info(`Novo chamado criado: ${call.cha_descricao}`);
    };

    useEffect(() => {
        const fetchChamados = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/api/chamados`);
                setChamados(response.data);
            } catch (error) {
                setError(
                    axios.isAxiosError(error) && error.response
                        ? error.response.data.message || 'Erro ao buscar chamados.'
                        : 'Erro desconhecido.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchChamados();

        const socket = io(API_URL);

        socket.on('callUpdated', (updatedCall) => {
            console.log('Recebido evento callUpdated:', updatedCall);
            setChamados((prevChamados) => {
                const index = prevChamados.findIndex((c) => c.cha_id === updatedCall.cha_id);
                if (index !== -1) {
                    const updatedChamados = [...prevChamados];
                    updatedChamados[index] = updatedCall;
                    return updatedChamados;
                }
                notifyNewCall(updatedCall); // Notifica sobre o novo chamado
                return [...prevChamados, updatedCall];
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return { chamados, loading, error };
}


