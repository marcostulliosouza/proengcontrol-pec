// pages/CadastroCliente.tsx
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Layout from '../components/Layout';

const CadastroCliente: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = () => {
        // Logica para submeter os dados do cliente
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Cadastro de Cliente</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        label="Nome"
                        placeholder="Digite o nome do cliente"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Digite o email do cliente"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        label="Telefone"
                        placeholder="Digite o telefone do cliente"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <Button label="Salvar" onClick={handleSubmit} />
            </div>
        </Layout>
    );
};

export default CadastroCliente;