// pages/VinculacaoClienteProduto.tsx
import React, { useState } from 'react';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Layout from '../components/Layout';

const VinculacaoClienteProduto: React.FC = () => {
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const clients = [
        { value: 1, label: 'Cliente A' },
        { value: 2, label: 'Cliente B' },
        { value: 3, label: 'Cliente C' }
    ];
    const products = [
        { value: 1, label: 'Produto X' },
        { value: 2, label: 'Produto Y' },
        { value: 3, label: 'Produto Z' }
    ];

    const handleSubmit = () => {
        // Logica para vincular cliente ao produto
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Vinculação de Cliente ao Produto</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                        options={clients}
                        onChange={(option) => setSelectedClient(option ? option.label : '')}
                        placeholder="Selecione o Cliente"
                    />
                    <SelectField
                        options={products}
                        onChange={(option) => setSelectedProduct(option ? option.label : '')}
                        placeholder="Selecione o Produto"
                    />
                </div>
                <Button label="Vincular" onClick={handleSubmit} />
            </div>
        </Layout>
    );
};

export default VinculacaoClienteProduto;