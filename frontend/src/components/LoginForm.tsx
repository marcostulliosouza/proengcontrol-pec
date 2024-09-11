// src/components/LoginForm.tsx
import React from 'react';
import { AiOutlineUser, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GoKey, GoCheck } from 'react-icons/go';


interface LoginFormProps {
    col_login: string;
    col_senha: string;
    loading: boolean;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
    col_login,
    col_senha,
    loading,
    setUsername,
    setPassword,
    handleLogin,
}) => {
    return (
        <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 font-normal">
            {/* Login */}
            <div className=" flex items-center gap-2">
                <AiOutlineUser className='h-4 opacity-30' />
                <input className='bg-gray-100 indent-1 outline-none rounded'
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
                <input className='bg-gray-100 indent-1 outline-none rounded'
                    id='password'
                    type="password"
                    placeholder='Senha'
                    value={col_senha}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {/* Lembrar usuário */}
            {/* <div className="inline-flex items-center">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                    <input type="checkbox"
                        className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all bg-gray-400 checked:border-pec checked:bg-pec"
                        id="check"
                        checked={isChecked}
                        onChange={handleOnChange} />
                    <span
                        className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <GoCheck />
                    </span>
                </label>
                <label className="font-semibold text-pec cursor-pointer select-none" htmlFor="check">
                    Lembrar usuário
                </label>
            </div> */}
            {/* Botão de entrar */}
            <footer className="w-full flex justify-center">
                <button
                    type="submit"
                    className='font-bold rounded-md h-10 w-32 bg-pec text-gray-200'
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center gap-2 p-2">
                            Entrando...
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        </div>
                    ) : (
                        'Entrar'
                    )}
                </button>
            </footer>
        </form>
    );
};

export default LoginForm;