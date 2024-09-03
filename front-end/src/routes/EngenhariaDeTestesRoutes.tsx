// src/routes/EngenhariaDeTestesRoutes.tsx
import React from 'react';
import { Route } from 'react-router-dom';
import { MenuEngTestes } from '../pages/Engenharia_de_Testes/page_eng_testes_menu';
import { VisualizarChamados } from '../pages/Engenharia_de_Testes/page_eng_testes_visualizar_chamados';
import { AbrirChamado } from '../pages/Engenharia_de_Testes/page_eng_testes_abrir_chamado';

export const EngenhariaDeTestesRoutes = () => (
    <>
        <Route path="/engenharia_testes" element={<MenuEngTestes />} />
        <Route path="/engenharia_testes/visualizar_chamados" element={<VisualizarChamados />} />
        <Route path="/engenharia_testes/abrir_chamado" element={<AbrirChamado />} />
        {/* Adicione mais rotas conforme necessário */}
    </>
);