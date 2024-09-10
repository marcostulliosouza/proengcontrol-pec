// frontend/hooks/useIndicators.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/apiConfig';

type Period = 'daily' | 'weekly' | 'monthly';

const useIndicators = (period: Period) => {
    const [indicators, setIndicators] = useState<null | {
        totalCalls: number;
        avgAnswering: string;
        avgLate: string;
        upTime: string;
    }>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIndicators = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/indicadores/${period}`);
                setIndicators(response.data);
            } catch (error) {
                setError('Error fetching indicators');
            } finally {
                setLoading(false);
            }
        };

        fetchIndicators();
    }, [period]);

    return { indicators, loading, error };
};

export default useIndicators;
