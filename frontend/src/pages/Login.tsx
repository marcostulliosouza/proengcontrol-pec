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
        <div className='flex items-center justify-center h-screen bg-pec'>
            <div className='bg-gray-200 max-w-[325px] w-full h-[475px] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center'>
                <header className="flex flex-col items-center text-pec font-semibold mb-10">
                    <div className="flex items-center gap-1 mb-4">
                        <img src={logo} alt="PEC" className='w-14 h-14' />
                        <h1 className='text-2xl'>PEC</h1>
                    </div>
                    <div className="flex flex-col items-center">
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
            </div>
        </div>
    );
}
