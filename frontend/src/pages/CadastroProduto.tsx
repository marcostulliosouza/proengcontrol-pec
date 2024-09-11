// pages/CadastroProduto.tsx
import React, { useState } from 'react';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Layout from '../components/Layout';

const CadastroProduto: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const categories = [
        { value: 1, label: 'Categoria 1' },
        { value: 2, label: 'Categoria 2' },
        { value: 3, label: 'Categoria 3' }
    ];

    const handleSubmit = () => {
        // Logica para submeter os dados do produto
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Cadastro de Produto</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        label="Nome do Produto"
                        placeholder="Digite o nome do produto"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <SelectField
                        options={categories}
                        onChange={(option) => setProductCategory(option ? option.label : '')}
                        placeholder="Selecione a Categoria"
                    />
                </div>
                <Button label="Salvar" onClick={handleSubmit} />
            </div>
        </Layout>
    );
};

export default CadastroProduto;