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

            const isNegative = diff < 0;
            if (isNegative) {
                diff = Math.abs(diff); // Trabalhe com a diferença positiva
            }

            // Calcular horas, minutos e segundos
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const format = (value: number) => value.toString().padStart(2, '0');

            const formattedTime = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
            setElapsedTime(isNegative ? `-${formattedTime}` : formattedTime);
        };

        // Atualizar a cada segundo
        const interval = setInterval(calculateElapsedTime, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    return elapsedTime;
}
