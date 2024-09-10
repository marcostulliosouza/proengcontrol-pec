// src/hooks/useChamado.ts

import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/apiConfig';

const useChamado = (callId: number) => {
    const [isBeingAnswered, setIsBeingAnswered] = useState(false);

    const atenderChamado = async () => {
        const userId = localStorage.getItem('userId'); // Obtém o col_id do localStorage
        if (!userId) {
            throw new Error('Usuário não está autenticado.');
        }
        setIsBeingAnswered(true);
        try {
            await axios.post(`${API_URL}/api/chamados/${callId}/atender`, {
                idResponsible: userId
            });
            // Lógica adicional após o atendimento
        } catch (error) {
            console.error('Erro ao atender chamado:', error);
        } finally {
            setIsBeingAnswered(false);
        }
    };

    return {
        isBeingAnswered,
        atenderChamado,
    };
};

export default useChamado;
