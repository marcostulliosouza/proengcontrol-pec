import { API_URL } from '../config/apiConfig';
import axios from 'axios';

export const loadDetractors = async () => {
  const response = await axios.get(`${API_URL}/api/detratores`); 3
  console.log(response.data)
  return response.data;
};