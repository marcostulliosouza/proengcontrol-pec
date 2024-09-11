import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useChamados } from '../hooks/useChamados';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

const VisualizarChamados: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<{ atendido?: number; plano?: number[]; status?: number }>({});

    const { chamados, loading, error } = useChamados();

    const filteredChamados = chamados.filter(chamado => {
        const produto = String(chamado.cha_produto || '').toLowerCase();
        const matchesSearchQuery = produto.includes(searchQuery.toLowerCase());
        const matchesFilters = (
            (filters.atendido === undefined || chamado.cha_status === filters.atendido) &&
            (filters.status === undefined || chamado.cha_status === filters.status) &&
            (filters.plano === undefined || filters.plano.includes(chamado.cha_plano))
        );
        return matchesSearchQuery && matchesFilters;
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (newFilters: { atendido?: number; plano?: number[]; status?: number }) => {
        setFilters(newFilters);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 text-center mt-4">Erro: {error}</div>;

    return (
        <Layout>
            <div className="p-1 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow overflow-auto">
                    <h2 className="text-xl font-semibold mb-4">Lista de Chamados</h2>
                    <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
                    <Table chamados={filteredChamados} />
                </div>
            </div>
        </Layout>
    );
};

export default VisualizarChamados;
