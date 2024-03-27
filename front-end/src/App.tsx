import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/page_login';
import { Chamados } from './pages/page_chamados';

export function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/chamados" element={<Chamados/>} />
      </Routes>
    </BrowserRouter>
  )
}
