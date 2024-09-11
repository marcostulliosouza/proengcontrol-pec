import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { NotFound } from './pages/page_notfound';
import PrivateRoute from './components/PrivateRoute';
import VisualizarChamados from './pages/VisualizarChamados';
import CadastroProduto from './pages/CadastroProduto';
import CadastroColaborador from './pages/CadastroColaborador';
import CadastroCliente from './pages/CadastroCliente';
import CadastroDispositivo from './pages/CadastroDispositivo';
import VinculacaoClienteProduto from './pages/VinculacaoClienteProduto';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';
import Perfil from './pages/Perfil';
import HistoricoAtividades from './pages/HistoricoAtividades';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import AbrirChamado from './pages/AbrirChamado';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visualizar-chamados" element={<VisualizarChamados />} />
        <Route path="/cadastrar-produto" element={<CadastroProduto />} />
        <Route path="/cadastrar-colaborador" element={<CadastroColaborador />} />
        <Route path="/cadastrar-cliente" element={<CadastroCliente />} />
        <Route path="/cadastrar-dispositivo" element={<CadastroDispositivo />} />
        <Route path="/abrir-chamado" element={<AbrirChamado />} />
        <Route path="/vincular-cliente-produto" element={<VinculacaoClienteProduto />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/historico-atividades" element={<HistoricoAtividades />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}