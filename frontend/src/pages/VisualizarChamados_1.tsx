// ./pages/VisualizarChamados.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import '../style/Table.css';
import { useChamados } from '../hooks/useChamados';
import ChamadoModal from '../components/ChamadoModal';
import { toast } from 'react-toastify';

interface Chamado {
    cha_id: number;
    cha_cliente: string;
    cha_data_hora_abertura: string;
    cha_data_hora_atendimento: string | null;
    cha_data_hora_termino: string | null;
    cha_descricao: string;
    cha_local: string;
    cha_operador: string;
    cha_plano: number;
    cha_produto: string;
    cha_tipo: number;
    cha_status: number;
    support_id: number;
    cha_visualizado: boolean;
    duracao_total: number | null;
    duracao_atendimento: number | null;
    cha_DT: string | null;
    support: string | null;
    call_type: string | null;
}

const VisualizarChamados: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<{ atendido?: number; plano?: number[]; status?: number }>({});
    const [selectedChamado, setSelectedChamado] = useState<Chamado | null>(null);

    // Desestruturar o resultado do hook useChamados
    const { chamados, loading, error, refetch } = useChamados();

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

    // Note: handleChamadoUpdate não está sendo usado, pois setChamados não está disponível
    const handleCloseModal = () => {
        setSelectedChamado(null);
    };

    const handleChamadoUpdate = async () => {
        if (!selectedChamado) return;

        try {
            if (refetch) await refetch();

            // Atualiza o estado local ou realiza outras ações após o atendimento
            setSelectedChamado(null); // Fecha o modal
            // Atualize a lista de chamados se necessário,
            toast.success('Chamado atendido com sucesso.');
        } catch (error) {
            console.error('Erro ao atender o chamado:', error);
            // Gerencie o erro, por exemplo, mostrando uma mensagem para o usuário
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 text-center mt-4">Erro: {error}</div>;

    return (
        <Layout>
            <div className="p-1 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow overflow-auto">
                    <h2 className="text-xl font-semibold mb-4">Lista de Chamados</h2>
                    <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
                    <div className="legend-container">
                        <div className="legend-title">
                            <p className='font-bold legend-item'>Legenda</p>
                        </div>
                        <div className="legend-content italic font-semibold">
                            <div className="legend-item">
                                <div className="legend-color-box legend-high"></div>
                                <span>Alta</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color-box legend-medium"></div>
                                <span>Média</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color-box legend-low"></div>
                                <span>Baixa</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color-box legend-tt"></div>
                                <span>Tempo Total (TT)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color-box legend-ta"></div>
                                <span>Tempo de Atendimento (TA)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color-box legend-tatr"></div>
                                <span>Tempo de Atraso (TAtr)</span>
                            </div>
                        </div>
                    </div>

                    <Table
                        chamados={filteredChamados}
                        onChamadoClick={(chamado) => setSelectedChamado(chamado)}
                    />
                </div>
            </div>
            {selectedChamado && (
                <ChamadoModal
                    chamado={selectedChamado}
                    onClose={handleCloseModal}
                    onAtender={handleChamadoUpdate}
                />
            )}
        </Layout>
    );
};

export default VisualizarChamados;
