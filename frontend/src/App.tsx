// src/App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { NotFound } from './pages/page_notfound';
import PrivateRoute from './components/PrivateRoute';
import VisualizarChamados from './pages/VisualizarChamados';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route element={<PrivateRoute redirectTo="/" element={<Dashboard />} />}> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visualizar-chamados" element={<VisualizarChamados />} /> {/* Nova rota */}
        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter >
  );
}
