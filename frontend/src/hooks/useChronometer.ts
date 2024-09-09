// src/hooks/useChronometer.ts
import { useState, useEffect } from 'react';

interface UseChronometerProps {
    startTime: string; // A data e hora de início no formato ISO
}

export function useChronometer({ startTime }: UseChronometerProps) {
    const [elapsedTime, setElapsedTime] = useState('00:00:00');

    useEffect(() => {
        const calculateElapsedTime = () => {
            const start = new Date(startTime);
            const now = new Date();
            let diff = now.getTime() - start.getTime(); // Diferença em milissegundos

            // Verificar se o tempo é negativo
            const isNegative = diff < 0;
            if (isNegative) {
                diff = Math.abs(diff) + 3600000; // Trabalhe com a diferença positiva para cálculos
                console.log(diff)
            }

            // Calcular horas, minutos e segundos
            const totalSeconds = Math.floor(diff / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            // Formatar os valores
            const format = (value: number) => value.toString().padStart(2, '0');
            const formattedTime = `${format(hours)}:${format(minutes)}:${format(seconds)}`;

            // Adicionar sinal negativo se a diferença for negativa
            setElapsedTime(isNegative ? `-${formattedTime}` : formattedTime);
        };

        // Atualizar a cada segundo
        const interval = setInterval(calculateElapsedTime, 1000);

        // Calcular imediatamente para mostrar o tempo decorrido sem esperar o primeiro intervalo
        calculateElapsedTime();

        return () => clearInterval(interval);
    }, [startTime]);

    return elapsedTime;
}
