// src/hooks/useCalls.ts
import { useEffect, useState } from 'react';
import { getAllCalls } from '../api/callApi';

type Call = {
  cha_id: string;
  cha_operador: string;
  duracao_total: number;
  duracao_atendimento: number;
  cha_tipo: number;
  call_type: string;
  cha_cliente: string;
  cha_produto: string;
  cha_DT: string;
  cha_status: number;
  status: string;
  support_id: string;
  support: string;
  cha_descricao: string;
  cha_plano: number;
  cha_data_hora_abertura: string;
  cha_data_hora_atendimento: string | null;
  cha_data_hora_termino: string | null;
  cha_local: string;
  cha_visualizado: number;
};

const useCalls = (query: string, selectedPriorities: number[]) => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCalls();
        setCalls(data);
        setFilteredCalls(data); // Inicialmente exibe todos os chamados
      } catch (error) {
        console.error('Erro ao carregar chamados:', error);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      setCalls((prevCalls) => [...prevCalls]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Filtra com base na busca e nas prioridades selecionadas
    const results = calls.filter(call => {
      const matchesQuery = call.cha_cliente.toLowerCase().includes(query.toLowerCase()) ||
        call.cha_produto.toLowerCase().includes(query.toLowerCase()) ||
        call.call_type.toLowerCase().includes(query.toLowerCase());

      const matchesPriority = selectedPriorities.length > 0 ? selectedPriorities.includes(call.cha_plano) : true;
      return matchesQuery && matchesPriority;
    });
    setFilteredCalls(results);
  }, [query, selectedPriorities, calls]);

  return { filteredCalls, setCalls };
};

export default useCalls;
