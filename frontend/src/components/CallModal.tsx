import React, { useEffect, useState } from 'react';
import { CiStopwatch } from "react-icons/ci";

type Call = {
  cha_id: number;
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
  support_id: number;
  support: string;
  cha_descricao: string;
  cha_plano: number;
  cha_data_hora_abertura: string;
  cha_data_hora_atendimento: string | null;
  cha_data_hora_termino: string | null;
  cha_local: string;
};

type CallModalProps = {
  call: Call;
  onClose: () => void;
};

const CallModal: React.FC<CallModalProps> = ({ call, onClose }) => {
  const [isAttending, setIsAttending] = useState(false);
  const [time, setTime] = useState(0); // Tempo de atendimento em segundos

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAttending) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isAttending]);

  const startAttendance = () => setIsAttending(true);

  const resetAttendance = () => {
    setIsAttending(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const segundos = totalSeconds % 60;;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  };



  const getPriorityStyle = (cha_plano: number) => {
    switch (cha_plano) {
      case 1:
        return { color: 'bg-red-500' };
      case 0:
        return { color: 'bg-yellow-500' };
      case -1:
        return { color: 'bg-blue-500' };
      default:
        return { color: 'bg-gray-400' };
    }
  };

  const abertura = new Date(call.cha_data_hora_abertura).getTime();
  const termino = call.cha_data_hora_termino ? new Date(call.cha_data_hora_termino).getTime() : Date.now();
  const totalDuration = termino - abertura;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800 transition duration-200"
        >
          &times;
        </button>
        <h2 className="text-base font-semibold mb-4 text-left text-gray-800">
          Detalhes do Chamado <strong>#{call.cha_id}</strong>
        </h2>

        <div className={`mb-6 text-center ${getPriorityStyle(call.cha_plano).color} text-white py-2 px-4 rounded`}>
          {!isAttending && (
            <strong>Tempo d Chamada</strong>
          )}
          {isAttending && (
            <strong>Tempo de Atendimento</strong>
          )}
          <div className="flex justify-center items-center space-x-2 mt-2">
            <CiStopwatch size={40} />
            {!isAttending && (
              <span className="text-3xl font-bold">{formatDuration(totalDuration)}</span>
            )}
            {isAttending && (
              <span className="text-3xl font-bold">{formatTime(time)}</span>
            )}
          </div>
        </div>

        <div className="space-y-3 text-gray-700">
          <div><strong>Criado por:</strong> {call.cha_operador.toUpperCase()}</div>
          <div><strong>Tipo de Chamado:</strong> {call.call_type}</div>
          <div><strong>Cliente:</strong> {call.cha_cliente}</div>
          <div><strong>Produto:</strong> {call.cha_produto}</div>
          <div><strong>Dispositivo de Teste:</strong> DT-{call.cha_DT}</div>
          <div><strong>Local:</strong> {call.cha_local}</div>
          <div>
            <strong>Descrição:</strong>
            <div className="description-text max-h-16 overflow-y-auto break-words text-gray-700 mb-6">
              {call.cha_descricao}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6 justify-center">
          {!isAttending && (
            <button
              onClick={startAttendance}
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition duration-200"
            >
              Iniciar Atendimento
            </button>
          )}

          {isAttending && (
            <>
              <button
                onClick={resetAttendance}
                className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition duration-200"
              >
                Desistir
              </button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-200">
                Transferir
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallModal;
