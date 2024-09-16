import { useEffect, useState } from 'react';
import { getAllCalls } from '../api/callApi';

export const useCalls = () => {
  const [calls, setCalls] = useState<any[]>([]);

  useEffect(() => {
    const fetchCalls = async () => {
      const data = await getAllCalls();
      setCalls(data);
    };
    fetchCalls();
  }, []);

  return calls;
};