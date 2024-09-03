// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { NotFound } from './pages/page_notfound';
import PrivateRoute from './components/PrivateRoute';
import { MenuEngTestes } from './pages/Engenharia_de_Testes/page_eng_testes_menu';
import { AbrirChamado } from './pages/Engenharia_de_Testes/page_eng_testes_abrir_chamado';
import { VisualizarChamados } from './pages/Engenharia_de_Testes/page_eng_testes_visualizar_chamados';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import { AbrirChamadoEng } from './pages/Engenharia_de_Testes/AbrirChamadoEng.tsx';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute redirectTo="/" />}> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/abrirchamadoengenharia" element={<AbrirChamadoEng />} /> */}
        {/* <Route path="/engenharia_testes" element={<MenuEngTestes />} />
        <Route path="/engenharia_testes/visualizar_chamados" element={<VisualizarChamados />} />
        <Route path="/engenharia_testes/abrir_chamado" element={<AbrirChamado />} /> */}
        {/* Adicione mais rotas conforme necessário */}
        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}