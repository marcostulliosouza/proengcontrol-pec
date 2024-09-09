import React, { useState, useEffect } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: { atendido?: number; status?: number; tipo?: number }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [atendido, setAtendido] = useState<number | undefined>(undefined);
    const [status, setStatus] = useState<number | undefined>(undefined);
    const [tipo, setTipo] = useState<number | undefined>(undefined);

    // Função para atualizar filtros diretamente
    const updateFilters = () => {
        onFilterChange({ atendido, status, tipo });
    };

    // Atualiza filtros quando atendido, status ou tipo mudam
    useEffect(() => {
        updateFilters();
    }, [atendido, status, tipo]); // Atualiza filtros apenas quando esses valores mudam

    // Função para mudança no campo de busca
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    // Função para mudança no status
    const handleStatusChange = (newStatus: number | undefined) => {
        setStatus(newStatus);
    };

    // Função para mudança no tipo
    const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setTipo(value ? parseInt(value) : undefined);
    };

    return (
        <div className="mb-4 flex flex-col space-y-2">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Pesquisar por produto..."
                className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <div className="flex flex-col space-y-2 mt-2">
                <div className="flex flex-wrap space-x-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="status"
                            checked={status === undefined}
                            onChange={() => handleStatusChange(undefined)}
                            className="form-radio"
                        />
                        <span>Todos</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="status"
                            checked={status === 1}
                            onChange={() => handleStatusChange(status === 1 ? undefined : 1)}
                            className="form-radio"
                        />
                        <span>Pendente</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="status"
                            checked={status === 2}
                            onChange={() => handleStatusChange(status === 2 ? undefined : 2)}
                            className="form-radio"
                        />
                        <span>Em andamento</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
