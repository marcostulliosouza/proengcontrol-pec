import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/chamados" element={<Chamados/>} />
        <Route path="/chamados_engenharia" element={<ChamadoEng/>} />
        <Route path="/relatorio_chamados" element={<RelatorioChamados/>} />
        <Route path="/enviar_plano_de_producao" element={<EnviarPlano/>} />
        <Route path="/pesquisa_de_indicadores" element={<PesquisaIndicadores/>} />
        <Route path="/vincular_equipamento_produto" element={<VincularEquipamentoProduto/>} />
        <Route path="/listar_produtos" element={<ListarProdutos/>} />
        <Route path="/receber_equipamento" element={<ReceberEquipamento/>} />
        <Route path="/devolver_equipamento" element={<DevolverEquipamento/>} />
        <Route path="/manutencao_preventiva" element={<ManutencaoPreventiva/>} />
        <Route path="/formularios_de_manutencao" element={<FormulariosManutencao/>} />
        <Route path="/listar_notas_fiscais" element={<ListarNotasFiscais/>} />
        <Route path="/adicionar_nota" element={<AdicionarNota/>} />
      </Routes>
    </BrowserRouter>
  )
}