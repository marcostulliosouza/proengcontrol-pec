import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/page_login';
import { Menu } from './pages/page_menu'
import { Chamados } from './pages/page_chamados';

export function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/chamados" element={<Chamados/>} />
      </Routes>
    </BrowserRouter>
  )
}
