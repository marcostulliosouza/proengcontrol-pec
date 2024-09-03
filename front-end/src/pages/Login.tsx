// src/pages/Login.tsx
import React, { useEffect } from 'react';
import logo from '../assets/icon_pec.svg';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';

export function Login() {
    const {
        col_login,
        col_senha,
        isChecked,
        loading,
        setUsername,
        setPassword,
        handleOnChange,
        handleLogin,
    } = useAuth();

    // Função para limpar o localStorage quando o componente de login for chamado
    const clearLocalStorage = () => {
        if (localStorage.getItem('saveUser') === 'false') {
            localStorage.clear();
            sessionStorage.clear();
        }
    };

    useEffect(() => {
        clearLocalStorage();
    }, []);

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
                    <LoginForm
                        col_login={col_login}
                        col_senha={col_senha}
                        isChecked={isChecked}
                        loading={loading}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        handleOnChange={handleOnChange}
                        handleLogin={handleLogin}
                    />
                </main>
            </div>
        </div>
    );
}