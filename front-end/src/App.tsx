import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/page_login';
import { Menu } from './pages/page_menu';
import { NotFound } from './pages/page_notfound';
// Rotas Engenharia de Testes
import { MenuEngTestes } from './pages/Engenharia_de_Testes/page_eng_testes_menu';
import { Chamados } from './pages/Engenharia_de_Testes/page_eng_testes_chamados';
import { ChamadoEng } from './pages/Engenharia_de_Testes/page_eng_testes_chamado_eng';
import { RelatorioChamados } from './pages/Engenharia_de_Testes/page_eng_testes_relatorio_chamadas';
import { EnviarPlano } from './pages/Engenharia_de_Testes/page_eng_testes_enviar_plano';
import { PesquisaIndicadores } from './pages/Engenharia_de_Testes/page_eng_testes_pesquisa_indicadores';
import { VincularEquipamentoProduto } from './pages/Engenharia_de_Testes/page_eng_testes_vincular_equipamento_produto';
import { ListarProdutos } from './pages/Engenharia_de_Testes/page_eng_testes_listar_produtos';
import { ReceberEquipamento } from './pages/Engenharia_de_Testes/page_eng_testes_receber_equipamento';
import { DevolverEquipamento } from './pages/Engenharia_de_Testes/page_eng_testes_devolver_equipamento';
import { ManutencaoPreventiva } from './pages/Engenharia_de_Testes/page_eng_testes_manutencao_preventiva';
import { FormulariosManutencao } from './pages/Engenharia_de_Testes/page_eng_testes_formularios_matuncao';
import { ListarNotasFiscais } from './pages/Engenharia_de_Testes/page_eng_testes_listar_notas_fiscais';
import { AdicionarNota } from './pages/Engenharia_de_Testes/page_eng_testes_adicionar_nota';
// Rotas Qualidade
import { Qualidade } from './pages/Qualidade/page_qualidade';

const PrivateRoute = ({ children, redirectTo }: { children: React.ReactNode, redirectTo: string }) => {
  const isAuthenticated = sessionStorage.getItem("token") !== null;
  console.log("isAuth: ", isAuthenticated);
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<PrivateRoute redirectTo="/">
          <Menu />
        </PrivateRoute>} />
        <Route path="/engenharia_testes" element={<PrivateRoute redirectTo="/">
          <MenuEngTestes />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/chamados" element={<PrivateRoute redirectTo="/">
          <Chamados />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/chamados_engenharia" element={<PrivateRoute redirectTo="/">
          <ChamadoEng />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/relatorio_chamados" element={<PrivateRoute redirectTo="/">
          <RelatorioChamados />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/enviar_plano_de_producao" element={<PrivateRoute redirectTo="/">
          <EnviarPlano />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/pesquisa_de_indicadores" element={<PrivateRoute redirectTo="/">
          <PesquisaIndicadores />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/vincular_equipamento_produto" element={<PrivateRoute redirectTo="/">
          <VincularEquipamentoProduto />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/listar_produtos" element={<PrivateRoute redirectTo="/">
          <ListarProdutos />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/receber_equipamento" element={<PrivateRoute redirectTo="/">
          <ReceberEquipamento />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/devolver_equipamento" element={<PrivateRoute redirectTo="/">
          <DevolverEquipamento />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/manutencao_preventiva" element={<PrivateRoute redirectTo="/">
          <ManutencaoPreventiva />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/formularios_de_manutencao" element={<PrivateRoute redirectTo="/">
          <FormulariosManutencao />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/listar_notas_fiscais" element={<PrivateRoute redirectTo="/">
          <ListarNotasFiscais />
        </PrivateRoute>} />
        <Route path="/engenharia_testes/adicionar_nota" element={<PrivateRoute redirectTo="/">
          <AdicionarNota />
        </PrivateRoute>} />
        <Route path="/qualidade" element={<PrivateRoute redirectTo="/">
          <Qualidade />
        </PrivateRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
