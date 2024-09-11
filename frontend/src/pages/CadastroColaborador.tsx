// pages/CadastroColaborador.tsx
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Layout from '../components/Layout';

const CadastroColaborador: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = () => {
        // Logica para submeter os dados do colaborador
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Cadastro de Colaborador</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        label="Nome"
                        placeholder="Digite o nome do colaborador"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Digite o email do colaborador"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        label="Cargo"
                        placeholder="Digite o cargo do colaborador"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>
                <Button label="Salvar" onClick={handleSubmit} />
            </div>
        </Layout>
    );
};

export default CadastroColaborador;