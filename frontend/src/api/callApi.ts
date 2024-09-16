import { API_URL } from '../config/apiConfig';
import axios from 'axios';

export const getAllCalls = async () => {
  const response = await axios.get(`${API_URL}/api/chamados`);
  return response.data;
};

export const attendCall = async (callID: string, idResponsible: string) => {
  await axios.post(`${API_URL}/api/chamados/${callID}/atender`, { idResponsible });
};

export const transferCall = async (callID: string, oldUser: string, newUser: string) => {
  await axios.post(`${API_URL}/api/chamados/${callID}/transferir`, { oldUser, newUser });
};

export const giveUpCall = async (callID: string, idResponsible: string) => {
  await axios.post(`${API_URL}/api/chamados/${callID}/desistir`, { idResponsible });
};

export const closeCall = async (callID: string, detractorID: string, actionTaken: string) => {
  await axios.post(`${API_URL}/api/chamados/${callID}/fechar`, { detractorID, actionTaken });
};