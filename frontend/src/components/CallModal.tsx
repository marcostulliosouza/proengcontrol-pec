import React, { useEffect, useState } from 'react';
import { CiStopwatch } from "react-icons/ci";
import { attendCall, giveUpCall, isLockedCall, transferCall, getCallById } from '../api/callApi';

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

type CallModalProps = {
  call: Call;
  onClose: () => void;
  onUpdate: () => void;
};

const CallModal: React.FC<CallModalProps> = ({ call: initialCall, onClose, onUpdate }) => {
  const [call, setCall] = useState<Call>(initialCall); // Cria o estado para call
  const [isAttending, setIsAttending] = useState(false);
  const [time, setTime] = useState(0); // Tempo de atendimento em segundos

  useEffect(() => {
    // Recuperar o estado do atendimento armazenado
    const storedCallId = localStorage.getItem('currentCallId');
    const storedIsAttending = JSON.parse(localStorage.getItem('isAttending') || 'null');

    if (storedCallId && storedCallId === call.cha_id && storedIsAttending) {
      setIsAttending(true);
      setTime(parseInt(localStorage.getItem('currentCallTime') || '0')); // Recupera o tempo de atendimento
    }

    let interval: NodeJS.Timeout;
    if (isAttending) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [call.cha_id, isAttending]);

  const userId = String(localStorage.getItem('userId'));

  // Função para atualizar o estado de `call` com os dados mais recentes do banco
  const updateCallState = async () => {
    const updatedCall = await getCallById(call.cha_id); // Obter dados do banco
    setCall(updatedCall); // Atualizar o estado de `call` com o objeto atualizado
  };

  const startAttendance = async () => {
    const response = await isLockedCall(call.cha_id);
    const isLocked = response?.isLocked;

    if (isLocked && (Number(call.support_id) !== Number(userId))) {
      alert('Chamado já está sendo atendido por outro usuário.');
      return;
    }
    else {
      setIsAttending(true);
      await attendCall(call.cha_id.toString(), userId);
      await updateCallState(); // Atualiza o estado de call após atender
      onUpdate();
      localStorage.setItem('currentCallId', call.cha_id); // Salva o ID do chamado
      localStorage.setItem('isAttending', 'true'); // Marca como atendendo
      localStorage.setItem('currentCallTime', String(time)); // Salva o tempo atual
    }
  };

  const resetAttendance = async () => {
    if (Number(call.support_id) !== Number(userId)) {
      alert("Você não pode cancelar um chamado que não é seu.");
      return;
    }
    else {
      setIsAttending(false);
      setTime(0);
      await giveUpCall(call.cha_id.toString(), userId);
      await updateCallState();
      onUpdate();
      localStorage.removeItem('currentCallId');
      localStorage.removeItem('isAttending');
      localStorage.removeItem('currentCallTime');
    }
    // Atualize o estado local do chamado, se necessário
  };

  const handleModalClose = () => {
    if (isAttending) {
      if (window.confirm("Você está em atendimento. Será necessário finalizar o chamado ou desistir.")) {
        return;
      }
    } else {
      onClose();
    }
  };

  const transferCallHandler = (newUser: string) => {
    // Chamar a função da API para transferir o chamado
    transferCall(call.cha_id.toString(), userId, newUser);
    updateCallState();

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
    const segundos = totalSeconds % 60;
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
          onClick={handleModalClose}
          className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800 transition duration-200"
        >
          &times;
        </button>
        <h2 className="text-base font-semibold mb-4 text-left text-gray-800">
          Detalhes do Chamado <strong>#{call.cha_id}</strong>
        </h2>

        <div className={`mb-6 text-center ${getPriorityStyle(call.cha_plano).color} text-white py-2 px-4 rounded`}>
          {!isAttending && (
            <strong>Tempo de Chamada</strong>
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
          {isAttending && (
            <div><strong>Suporte:</strong> {call.support}</div>
          )}
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
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-200"
            >
              Iniciar Atendimento
            </button>
          )}

          {isAttending && (
            <>
              <button
                onClick={resetAttendance}
                className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition duration-200"
              >
                Finalizar
              </button>
              <button
                onClick={() => transferCallHandler("NovoUsuario")} // Exemplo de transferência
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-200"
              >
                Transferir
              </button>
              <button
                onClick={resetAttendance}
                className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition duration-200"
              >
                Desistir
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallModal;