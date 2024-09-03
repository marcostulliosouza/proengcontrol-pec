import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useChamados } from '../hooks/useChamados';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const VisualizarChamados: React.FC = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<{ atendido?: boolean; plano?: boolean; status?: number }>({});
    const pageSize = 10;
    const { chamados, loading, error, totalPages } = useChamados(page, pageSize);

    const filteredChamados = chamados.filter(chamado => {
        // Converte para string para garantir que podemos chamar toLowerCase
        const descricao = String(chamado.cha_descricao || '').toLowerCase();
        const cliente = String(chamado.cha_cliente || '').toLowerCase();
        const produto = String(chamado.cha_produto || '').toLowerCase();

        const matchesSearchQuery =
            descricao.includes(searchQuery.toLowerCase()) ||
            cliente.includes(searchQuery.toLowerCase()) ||
            produto.includes(searchQuery.toLowerCase());

        const matchesFilters =
            (filters.atendido === undefined || chamado.cha_status === (filters.atendido ? 1 : 2)) &&
            (filters.plano === undefined || chamado.cha_plano === filters.plano) &&
            (filters.status === undefined || chamado.cha_status === filters.status);

        return matchesSearchQuery && matchesFilters;
    });


    if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;
    if (error) return <div className="text-red-500 text-center mt-4">Erro: {error}</div>;

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };


    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPage(1); // Resetar para a primeira página ao buscar
    };

    const handleFilterChange = (filters: { atendido?: boolean; plano?: boolean; status?: number }) => {
        setFilters(filters);
        setPage(1); // Resetar para a primeira página ao filtrar
    };

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
