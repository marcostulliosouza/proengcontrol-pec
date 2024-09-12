// src/hooks/useChamado.ts

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/apiConfig';

const useChamado = (callId: number) => {
    const [isBeingAnswered, setIsBeingAnswered] = useState(() => {
        return localStorage.getItem(`isBeingAnswered_${callId}`) === 'true';
    });

    const atenderChamado = async () => {
        const userId = localStorage.getItem('userId'); // Obtém o col_id do localStorage
        if (!userId) {
            throw new Error('Usuário não está autenticado.');
        }

        try {
            await axios.post(`${API_URL}/api/chamados/${callId}/atender`, {
                idResponsible: userId
            });

            // Atualiza o estado do chamado para atendido e persiste no localStorage
            setIsBeingAnswered(true);
            localStorage.setItem(`isBeingAnswered_${callId}`, 'true');
            localStorage.setItem('currentCallId', String(callId)); // Salva o ID do chamado atual
        } catch (error) {
            console.error('Erro ao atender chamado:', error);
            throw error;
        }
    };

    const desistirChamado = () => {
        setIsBeingAnswered(false);
        localStorage.removeItem(`isBeingAnswered_${callId}`);
        localStorage.removeItem('currentCallId');
    };

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isBeingAnswered) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            localStorage.removeItem(`isBeingAnswered_${callId}`);
            localStorage.removeItem('currentCallId');
        };
    }, [callId, isBeingAnswered]);

    return {
        isBeingAnswered,
        atenderChamado,
        desistirChamado,
    };
};

export default useChamado;

