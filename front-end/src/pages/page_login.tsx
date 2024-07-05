import logo from '../assets/icon_pec.svg';
import { AiOutlineUser, AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoKey, GoCheck } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, FormEvent } from 'react';

export function Login() {
  // Função para limpar o localStorage, isso garante que o navegador não armazene o token de autenticação quando o usuário saí da aplicação ou da logout
  const clearLocalStorage = () => {
    if (localStorage.getItem("saveUser") === "false") {
      localStorage.clear();
      sessionStorage.clear();
    }
  };

  // UseEffect para limpar o localStorage quando o componente de login for chamado
  useEffect(() => {
    clearLocalStorage();
  }, []);

  const [isChecked, setIsChecked] = useState(false);
  const [col_login, setUsername] = useState('');
  const [col_senha, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://172.17.4.23:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ col_login, col_senha }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        localStorage.setItem("user", col_login);
        if (isChecked) {
          localStorage.setItem("saveUser", "true");
        } else {
          localStorage.setItem("saveUser", "false");
        }
        setTimeout(() => {
          navigate('/menu');
        }, 2000);
      } else {
        window.alert('Desculpe, parece que você digitou o login ou a senha incorretos. \nPor favor, verifique e tente novamente.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setLoading(false);
    }
  };

  return (
    <div className='lg:grid grid-cols-2 h-screen bg-pec'>
      <div className='bg-cinza-200 max-w-[325px] w-full h-[475px] fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg'>
        <main className="flex flex-col mt-20 gap-10">
          <header className="flex flex-col items-center text-pec font-semibold">
            <div className="flex items-center gap-1">
              <img src={logo} alt="PEC" className='w-10 h-10' />
              <h1 className='text-xl'>PEC</h1>
            </div>
            <div className="flex flex-col items-center gap-6">
              <p className='text-sm'>ProEngControl</p>
              <p className='text-pec text-xl font-extralight'>Bem-Vindo!</p>
            </div>
          </header>
          <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 font-normal">
            {/* Login */}
            <div className="flex items-center gap-2">
              <AiOutlineUser className='h-4 opacity-30' />
              <input className='bg-cinza-300 indent-1 outline-none rounded'
                id='login'
                type="text"
                placeholder='Login'
                value={col_login}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* Senha */}
            <div className="flex items-center gap-2">
              <GoKey className='h-3.5 opacity-30' />
              <input className='bg-cinza-300 indent-1 outline-none rounded'
                id='password'
                type="password"
                placeholder='Senha'
                value={col_senha}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Lembrar usuário */}
            <div className="inline-flex items-center">
              <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                <input type="checkbox"
                  className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all bg-cinza-400 checked:border-pec checked:bg-pec"
                  id="check"
                  checked={isChecked}
                  onChange={handleOnChange} />
                <span
                  className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <GoCheck />
                </span>
              </label>
              <label className="mt-px font-semibold text-pec cursor-pointer select-none" htmlFor="check">
                Lembrar usuário
              </label>
            </div>
            {/* Botão de entrar */}
            <footer className="w-full flex justify-center">
              <button
                type="submit"
                className='font-bold rounded-md h-10 w-32 bg-pec text-cinza-200'
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2 p-2">
                    Carregando
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  </div>
                ) : (
                  'Entrar'
                )}
            </button>
          </footer>
        </form>
      </main>
    </div>
    </div >
  );
}
