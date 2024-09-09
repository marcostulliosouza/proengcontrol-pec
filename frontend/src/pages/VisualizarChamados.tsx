// frontend/pages/VisualizadorChamados.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useChamados } from '../hooks/useChamados';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const VisualizarChamados: React.FC = () => {
    // Declaração dos estados e hooks
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<{ atendido?: number; tipo?: number; status?: number }>({});
    const pageSize = 10;

    // Hook para buscar dados dos chamados
    const { chamados, loading, error, totalPages } = useChamados(page, pageSize);

    // Função de filtragem dos chamados
    const filteredChamados = chamados.filter(chamado => {
        const produto = String(chamado.cha_produto || '').toLowerCase();
        const matchesSearchQuery = produto.includes(searchQuery.toLowerCase());
        const matchesFilters = (
            (filters.atendido === undefined || chamado.cha_status === (filters.atendido ? 1 : 2)) &&
            (filters.status === undefined || chamado.cha_status === filters.status)
        );
        return matchesSearchQuery && matchesFilters;
    });

    // Função para alterar a página
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // Função para buscar
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPage(1); // Resetar para a primeira página ao buscar
    };

    // Função para alterar filtros
    const handleFilterChange = (newFilters: { atendido?: number; tipo?: number; status?: number }) => {
        const convertedFilters = {
            ...newFilters,
            atendido: newFilters.atendido !== undefined ? (newFilters.atendido ? 1 : 2) : undefined,
        };
        setFilters(convertedFilters);
        setPage(1); // Resetar para a primeira página ao filtrar
    };

    // Renderização condicional com base no estado de carregamento e erro
    if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;
    if (error) return <div className="text-red-500 text-center mt-4">Erro: {error}</div>;

    return (
        <Layout>
            <div className="p-6 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow overflow-hidden">
                    <h2 className="text-xl font-semibold mb-4">Lista de Chamados</h2>
                    <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
                    <Table chamados={filteredChamados} />
                    <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
        </Layout>
    );
};

export default VisualizarChamados;
