// ./pages/Relatorios.tsx
import React from 'react';
import Layout from '../components/Layout';
import { AiOutlineFileText, AiOutlineDownload } from 'react-icons/ai';

const Relatorios: React.FC = () => {
    // Simulação de dados para relatórios
    const reports = [
        { name: 'Relatório de Chamados - Setembro', date: '01/10/2024' },
        { name: 'Relatório de Produtos', date: '15/09/2024' },
    ];

    const handleDownload = (reportName: string) => {
        // Lógica para download do relatório
        console.log(`Baixando o relatório: ${reportName}`);
    };

    return (
        <Layout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Relatórios</h1>
                <div className="space-y-4">
                    {reports.map((report, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition">
                            <div className="flex items-center">
                                <AiOutlineFileText className="text-2xl text-blue-500 mr-3" />
                                <div>
                                    <h2 className="text-lg font-semibold">{report.name}</h2>
                                    <p className="text-sm text-gray-600">Data: {report.date}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDownload(report.name)}
                                className="text-blue-500 hover:underline"
                            >
                                <AiOutlineDownload className="inline-block mr-2" />
                                Baixar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Relatorios;