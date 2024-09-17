import React, { useState, useEffect } from 'react';
import { attendCall, transferCall, giveUpCall, closeCall, isLockedCall, getActionTaken } from '../api/callApi';
import { getAllUsers } from '../api/userApi';

interface CallModalProps {
  call: any;
  onClose: () => void;
  refreshCalls: () => void;
}

const CallModal: React.FC<CallModalProps> = ({ call, onClose, refreshCalls }) => {
  const userId = localStorage.getItem('userId');
  const [users, setUsers] = useState<any[]>([]);
  const [newUserId, setNewUserId] = useState<string | null>(null);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [isAttended, setIsAttended] = useState(call.cha_status === 2);
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [actionTaken, setActionTaken] = useState<any | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const checkLockStatus = async () => {
      try {
        const response = await isLockedCall(call.cha_id);
        setIsLocked(response);
      } catch (error) {
        console.error('Erro ao verificar bloqueio do chamado:', error);
      }
    };

    checkLockStatus();
  }, [call]);

  useEffect(() => {
    const fetchActionTaken = async () => {
      try {
        const data = await getActionTaken(call.cha_id);
        setActionTaken(data);
      } catch (error) {
        console.error('Erro ao buscar ações realizadas:', error);
      }
    };

    fetchActionTaken();
  }, [call.cha_id]);

  useEffect(() => {
    setIsAttended(call.cha_status === 2);
  }, [call.cha_status]);

  const handleAttend = async () => {
    if (userId) {
      try {
        setLoading(true);
        await attendCall(call.cha_id, userId);
        await refreshCalls();
        setIsAttended(true);
      } catch (error) {
        console.error('Erro ao atender o chamado:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Usuário não encontrado');
    }
  };

  const initiateTransfer = () => {
    setShowUserSelect(true);
  };

  const confirmTransfer = async () => {
    if (userId && newUserId) {
      try {
        setLoading(true);
        await transferCall(call.cha_id, userId, newUserId);
        await refreshCalls();
        onClose();
      } catch (error) {
        console.error('Erro ao transferir o chamado:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Usuário não selecionado para a transferência');
    }
  };

  const handleGiveUp = async () => {
    if (userId) {
      try {
        setLoading(true);
        await giveUpCall(call.cha_id, userId);
        setIsAttended(false);
        await refreshCalls();
      } catch (error) {
        console.error('Erro ao desistir do chamado:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Usuário não encontrado');
    }
  };

  const handleClose = async () => {
    const detractorId = 'detractor_id'; // Substitua com o ID real do detrator se disponível
    const actionTaken = 'action_taken'; // Substitua com a ação real se disponível
    try {
      setLoading(true);
      await closeCall(call.cha_id, detractorId, actionTaken);
      await refreshCalls();
      onClose();
    } catch (error) {
      console.error('Erro ao fechar o chamado:', error);
    } finally {
      setLoading(false);
    }
  };

  const isUserResponsible = userId === String(call.support_id);
  const canAttend = call.cha_status === 1 && !isAttended;
  const canClose = isUserResponsible && isAttended;

  return (
    <div key={call.cha_id} className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Detalhes do Chamado</h2>
        <p>ID: {call.cha_id}</p>
        <p>Cliente: {call.cha_cliente}</p>
        <p>Status: {call.cha_status}</p>

        {/* Exibe ações realizadas */}
        {actionTaken && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Ações Realizadas:</h3>
            <p>Detrator: {actionTaken.detractor}</p>
            <p>Ação: {actionTaken.actionTaken}</p>
          </div>
        )}

        {showUserSelect ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">Selecione um novo usuário para transferir o chamado:</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setNewUserId(e.target.value)}
            >
              <option value="">Selecione um usuário</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.user_name}
                </option>
              ))}
            </select>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={confirmTransfer}
            >
              Confirmar Transferência
            </button>
          </div>
        ) : (
          <div>
            {canAttend && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                onClick={handleAttend}
                disabled={loading}
              >
                {loading ? 'Atendendo...' : 'Atender'}
              </button>
            )}
            {isAttended && isUserResponsible && (
              <>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                  onClick={initiateTransfer}
                >
                  Transferir
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                  onClick={handleGiveUp}
                  disabled={loading}
                >
                  Desistir
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Fechar Chamado
                </button>
              </>
            )}
          </div>
        )}
        <button
          className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default CallModal;