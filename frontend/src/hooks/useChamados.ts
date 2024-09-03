// ./hooks/useChamados.ts
import { useState, useEffect } from 'react';
import { API_URL } from '../config/apiConfig';
import axios from 'axios';

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

interface UseChamadosResponse {
    chamados: Chamado[];
    loading: boolean;
    error: string | null;
    totalPages: number;
}

export function useChamados(page: number = 1, pageSize: number = 10): UseChamadosResponse {
    const [chamados, setChamados] = useState<Chamado[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        async function fetchChamados() {
            setLoading(true);
            setError(null); // Resetando erro ao iniciar nova requisição
            try {
                const response = await axios.get(`${API_URL}/api/chamados/paginados`, {
                    params: { page, pageSize }
                });

                const { data, total } = response.data;
                // Verifica se total é um objeto e extrai a propriedade total
                const totalRecords = total.total || 0;

                // Calcula totalPages baseado no total de registros e pageSize
                const calculatedTotalPages = Math.ceil(totalRecords / pageSize);

                // Atualiza o estado com os dados e a contagem de páginas
                setChamados(data.map((chamado: Chamado) => ({
                    ...chamado,
                    cha_plano: Boolean(chamado.cha_plano),
                })));
                setTotalPages(calculatedTotalPages);
            } catch (error) {
                setError(
                    axios.isAxiosError(error) && error.response
                        ? error.response.data.message || 'Erro ao buscar chamados.'
                        : 'Erro desconhecido.'
                );
            } finally {
                setLoading(false);
            }
        }

        fetchChamados();
    }, [page, pageSize]);

    return { chamados, loading, error, totalPages };
}
