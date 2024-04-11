import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/page_login';
import { Menu } from './pages/page_menu';
import { Chamados } from './pages/page_chamados';
import { ChamadoEng } from './pages/page_chamado_eng';
import { RelatorioChamados } from './pages/page_relatorio_chamadas';
import { EnviarPlano } from './pages/page_enviar_plano';
import { PesquisaIndicadores } from './pages/page_pesquisa_indicadores';
import { VincularEquipamentoProduto } from './pages/page_vincular_equipamento_produto';
import { ListarProdutos } from './pages/page_listar_produtos';
import { ReceberEquipamento } from './pages/page_receber_equipamento';
import { DevolverEquipamento } from './pages/page_devolver_equipamento';
import { ManutencaoPreventiva } from './pages/page_manutencao_preventiva';
import { FormulariosManutencao } from './pages/page_formularios_matuncao';
import { ListarNotasFiscais } from './pages/page_listar_notas_fiscais';
import { AdicionarNota } from './pages/page_adicionar_nota';

const PrivateRoute = ({ children, redirectTo }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
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
        <Route path="/chamados" element={<PrivateRoute redirectTo="/">
          <Chamados />
        </PrivateRoute>} />
        <Route path="/chamados_engenharia" element={<PrivateRoute redirectTo="/">
          <ChamadoEng />
        </PrivateRoute>} />
        <Route path="/relatorio_chamados" element={<PrivateRoute redirectTo="/">
          <RelatorioChamados />
        </PrivateRoute>} />
        <Route path="/enviar_plano_de_producao" element={<PrivateRoute redirectTo="/">
          <EnviarPlano />
        </PrivateRoute>} />
        <Route path="/pesquisa_de_indicadores" element={<PrivateRoute redirectTo="/">
          <PesquisaIndicadores />
        </PrivateRoute>} />
        <Route path="/vincular_equipamento_produto" element={<PrivateRoute redirectTo="/">
          <VincularEquipamentoProduto />
        </PrivateRoute>} />
        <Route path="/listar_produtos" element={<PrivateRoute redirectTo="/">
          <ListarProdutos />
        </PrivateRoute>} />
        <Route path="/receber_equipamento" element={<PrivateRoute redirectTo="/">
          <ReceberEquipamento />
        </PrivateRoute>} />
        <Route path="/devolver_equipamento" element={<PrivateRoute redirectTo="/">
          <DevolverEquipamento />
        </PrivateRoute>} />
        <Route path="/manutencao_preventiva" element={<PrivateRoute redirectTo="/">
          <ManutencaoPreventiva />
        </PrivateRoute>} />
        <Route path="/formularios_de_manutencao" element={<PrivateRoute redirectTo="/">
          <FormulariosManutencao />
        </PrivateRoute>} />
        <Route path="/listar_notas_fiscais" element={<PrivateRoute redirectTo="/">
          <ListarNotasFiscais />
        </PrivateRoute>} />
        <Route path="/adicionar_nota" element={<PrivateRoute redirectTo="/">
          <AdicionarNota />
        </PrivateRoute>} />
        <Route path='*' element="Page Not Found" />
      </Routes>
    </BrowserRouter>
  )
}
