// pages/CadastroDispositivo.tsx
import React, { useState } from 'react';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Layout from '../components/Layout';

const CadastroDispositivo: React.FC = () => {
    const [deviceName, setDeviceName] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const types = [
        { value: 1, label: 'Tipo 1' },
        { value: 2, label: 'Tipo 2' },
        { value: 3, label: 'Tipo 3' }
    ];

    const handleSubmit = () => {
        // Logica para submeter os dados do dispositivo
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Cadastro de Dispositivo</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        label="Nome do Dispositivo"
                        placeholder="Digite o nome do dispositivo"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                    />
                    <SelectField
                        options={types}
                        onChange={(option) => setDeviceType(option ? option.label : '')}
                        placeholder="Selecione o Tipo"
                    />
                </div>
                <Button label="Salvar" onClick={handleSubmit} />
            </div>
        </Layout>
    );
};

export default CadastroDispositivo;