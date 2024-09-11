// src/hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../config/apiConfig';

interface UseAuthReturn {
    col_login: string;
    col_senha: string;
    loading: boolean;
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
}

export function useAuth(): UseAuthReturn {
    const [col_login, setUsername] = useState('');
    const [col_senha, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ col_login, col_senha }),
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('token', data.token);
                localStorage.setItem('user', col_login);
                localStorage.setItem('userId', data.col_id); // Armazena o col_id
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                toast.error('Login ou senha incorretos. Tente novamente.');
            }
        } catch (error) {
            toast.error('Erro ao conectar com o servidor');
        } finally {
            setLoading(false);
        }
    };

    // Verificar se o usuário já está autenticado e carregar o nome de usuário salvo
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const saveUser = localStorage.getItem('saveUser');
        const token = sessionStorage.getItem('token');

        if (saveUser === 'true' && savedUser) {
            setUsername(savedUser);
        }

        if (token) {
            navigate('/dashboard'); // Redireciona automaticamente se já houver um token
        }
    }, [navigate]);

    return {
        col_login,
        col_senha,
        loading,
        handleLogin,
        setUsername,
        setPassword
    };
}
