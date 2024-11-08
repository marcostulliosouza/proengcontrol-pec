import { useEffect, useState } from 'react';
import { getAllCalls } from '../api/callApi';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import CallModal from '../components/CallModal';
import io from 'socket.io-client';
import { API_URL } from '../config/apiConfig';
import React from 'react';

const socket = io(API_URL);

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

const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const CallTable = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);
  const [query, setQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]); // Novo estado para múltiplas prioridades selecionadas
  const [modalCall, setModalCall] = useState<Call | null>(null); // Chamado para exibir no modal

  const fetchData = async () => {
    try {
      const data = await getAllCalls();
      setCalls(data);
      setFilteredCalls(data); // Inicialmente exibe todos os chamados
    } catch (error) {
      console.error('Erro ao carregar chamados:', error);
    }
  };

  useEffect(() => {
    fetchData();

    // socket.on('callsUpdated', (data: Call[]) => {
    //   // Verifique se os dados são diferentes antes de atualizar
    //   setCalls((prevCalls) => {
    //     const newCalls = [...data];
    //     if (JSON.stringify(prevCalls) !== JSON.stringify(newCalls)) {
    //       setFilteredCalls(newCalls);
    //     }
    //     return newCalls;
    //   });
    // });
    const interval = setInterval(() => {
      setCalls((prevCalls) => [...prevCalls]);
    }, 60000);

    return () => {
      clearInterval(interval);
      // socket.off('callsUpdated'); // Limpa o ouvinte quando o componente for desmontado
    }
  }, []);

  const handleDoubleClick = (call: Call) => {
    setModalCall(call);
  };

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

  const userId = String(localStorage.getItem('userId'));

  const toggleExpandRow = (callId: number) => {
    setExpandedRow(expandedRow === callId ? null : callId);
  };

  const getDurationStyle = (duration: number) => {
    if (duration < 0) {
      return 'text-blue-500 font-bold';
    }
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);

    if (hours >= 1) {
      return 'text-red-500 font-bold';
    } else if (minutes > 30) {
      return 'text-yellow-500 font-bold';
    }

    return 'text-black font-bold';
  };

  const getPriorityStyle = (cha_plano: number) => {
    switch (cha_plano) {
      case 1:
        return { color: 'bg-red-500 rounded', height: '100%' };
      case 0:
        return { color: 'bg-yellow-500 rounded', height: '75%' };
      case -1:
        return { color: 'bg-blue-500 rounded', height: '50%' };
      default:
        return { color: 'bg-gray-400 rounded', height: '0%' };
    }
  };

  const handlePriorityChange = (priority: number) => {
    setSelectedPriorities(prevPriorities => {
      if (prevPriorities.includes(priority)) {
        return prevPriorities.filter(p => p !== priority);
      } else {
        return [...prevPriorities, priority];
      }
    });
  };
  return (
    <Layout>
      <div className="flex justify-end mb-1">
        <SearchBar query={query} onSearch={setQuery} placeholder={'Pesquise por chamados...'} />
      </div>
      <div className="container mx-auto p-2">
        <div className="mb-1">
          <h3 className="text-lg font-semibold mb-1">Filtrar por Prioridade:</h3>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedPriorities.includes(1)}
                onChange={() => handlePriorityChange(1)}
                className="mr-2"
              />
              <div className="relative w-4 h-4 bg-red-500 rounded"></div>
              <div className='p-1'>Dentro do Plano</div>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedPriorities.includes(0)}
                onChange={() => handlePriorityChange(0)}
                className="mr-2"
              />
              <div className="relative w-4 h-4 bg-yellow-500 rounded"></div>
              <div className='p-1'>Fora do Plano</div>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedPriorities.includes(-1)}
                onChange={() => handlePriorityChange(-1)}
                className="mr-2"
              />
              <div className="relative w-4 h-4 bg-blue-500 rounded"></div>
              <div className='p-1'>Engenharia</div>
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-pec text-white text-left">
                <th className="py-3 px-6 border-b text-xs text-center">Prioridade</th>
                <th className="py-3 px-6 border-b text-xs text-center">Duração Total</th>
                <th className="py-3 px-2 border-b text-xs text-center">Tipo do Chamado</th>
                <th className="py-3 px-6 border-b text-xs text-center">Cliente</th>
                <th className="py-3 px-6 border-b text-xs text-center">Produto</th>
                <th className="py-3 px-6 border-b text-xs text-center">Local</th>
                <th className="py-3 px-6 border-b text-xs text-center">Status</th>
                <th className="py-3 px-6 border-b text-xs text-center">Suporte</th>
                <th className="py-3 px-6 border-b text-xs text-center">Atendimento</th>
              </tr>
            </thead>
            <tbody>
              {filteredCalls.map((call) => {
                const abertura = new Date(call.cha_data_hora_abertura).getTime();
                const atendimento = call.cha_data_hora_atendimento ? new Date(call.cha_data_hora_atendimento).getTime() : 0;
                const termino = call.cha_data_hora_termino ? new Date(call.cha_data_hora_termino).getTime() : Date.now();
                const totalDuration = termino - abertura;
                const attendanceDuration = atendimento > 0 ? termino - atendimento : 0;
                // Define uma classe diferente se o chamado está sendo visualizado por outro operador
                const isDisabled = call.cha_visualizado === 1
                const rowClass = call.cha_visualizado === 1 && Number(call.support_id) !== Number(userId)
                  ? 'bg-green-200 text-gray-500cursor-not-allowed'
                  : (call.cha_visualizado === 1 && Number(call.support_id) === Number(userId))
                    ? 'bg-amber-200 text-gray-500'
                    : 'hover:bg-gray-100 cursor-pointer transition duration-200';
                return (
                  <React.Fragment key={call.cha_id}>
                    <tr
                      onClick={() => !isDisabled && toggleExpandRow(parseInt(call.cha_id))}
                      onDoubleClick={() => handleDoubleClick(call)}
                      className={rowClass}
                    >
                      <td className="py-2 px-4 border-b flex justify-center items-center">
                        <div className="relative w-8 h-16 bg-gray-300 rounded">
                          <div
                            className={`absolute bottom-0 w-full ${getPriorityStyle(call.cha_plano).color}`}
                            style={{ height: getPriorityStyle(call.cha_plano).height }}
                          />
                        </div>
                      </td>
                      <td className={`py-2 px-4 border-b text-center ${getDurationStyle(totalDuration)}`}>
                        {formatDuration(totalDuration)}
                      </td>
                      <td className="py-2 px-2 border-b text-center">{call.call_type}</td>
                      <td className="py-2 px-4 border-b text-center">{call.cha_cliente}</td>
                      <td className="py-2 px-4 border-b text-center">{call.cha_produto}</td>
                      <td className="py-2 px-4 border-b text-center">{call.cha_local}</td>
                      <td className="py-2 px-4 border-b text-center">{call.status}</td>
                      <td className="py-2 px-4 border-b uppercase text-center">{call.support}</td>
                      <td className={`py-2 px-4 border-b text-center ${getDurationStyle(attendanceDuration)}`}>{formatDuration(attendanceDuration)}</td>
                    </tr>
                    {expandedRow === parseInt(call.cha_id) && (
                      <tr>
                        <td colSpan={9} className="py-2 px-4 border-b bg-gray-50 text-gray-700 uppercase">
                          <div>
                            <strong>Descrição:</strong> {call.cha_descricao}
                          </div>
                          <div>
                            <strong>Operador:</strong> {call.cha_operador}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {modalCall && (
        <CallModal
          call={modalCall}
          onClose={() => setModalCall(null)}
          onUpdate={fetchData}
        />
      )}
    </Layout>
  );
};

export default CallTable;
