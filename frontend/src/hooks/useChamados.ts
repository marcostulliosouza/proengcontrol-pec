// src/hooks/useChamados.ts
import { useState, useEffect } from 'react';
import { API_URL } from '../config/apiConfig';

interface Chamado {
    cha_id: number;
    cha_cliente: string;
    cha_data_hora_abertura: string;
    cha_data_hora_atendimento: string;
    cha_data_hora_termino: string;
    cha_descricao: string;
    cha_local: string;
    cha_operador: string;
    cha_plano: string;
    cha_produto: string;
    cha_status: number;
    cha_tipo: string;
    cha_visualizado: boolean;
}

export function useChamados() {
    const [chamados, setChamados] = useState<Chamado[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchChamados() {
            try {
                const response = await fetch(`${API_URL}/chamados`);
                if (!response.ok) throw new Error('Erro ao buscar chamados.');
                const data = await response.json();
                setChamados(data);
            } catch (error) {
                // Verifica se o erro tem a propriedade message
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Erro desconhecido.');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchChamados();
    }, []);

    return { chamados, loading, error };
}
