import { API_URL } from '../config/apiConfig';
import axios from 'axios';

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/api/usuarios`);
  return response.data;
};