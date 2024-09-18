import { API_URL } from '../config/apiConfig';
import axios from 'axios';

export const getDetractorList = async (detType: number | null = null) => {
  const response = await axios.get(`${API_URL}/api/detratores`, {
    params: { detType }
  });
  return response.data;
};