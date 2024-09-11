// src/components/SearchBar.tsx

import React, { useState, useEffect } from 'react';
import Select, { MultiValue } from 'react-select';
import '../style/Table.css';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: { atendido?: number; status?: number; plano?: number[] }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState<number | undefined>(undefined);
    const [plano, setPlano] = useState<number[] | undefined>(undefined);

    const optionsPlano = [
        {
            value: 1, label:
                <div className="legend-item">
                    <div className="legend-color-box legend-high"></div>
                    <span>Alta</span>
                </div>
        },
        {
            value: 0, label:
                <div className="legend-item">
                    <div className="legend-color-box legend-medium"></div>
                    <span>Média</span>
                </div>
        },
        {
            value: -1, label:
                <div className="legend-item">
                    <div className="legend-color-box legend-low"></div>
                    <span>Baixa</span>
                </div>
        },
    ];

    // Função para mudança no plano
    const handlePlanoChange = (selectedOptions: MultiValue<{ value: number; label: JSX.Element }>) => {
        const values = selectedOptions.map(option => option.value);
        setPlano(values.length > 0 ? values : undefined); // Atualiza com array de valores
    };

    // Atualiza os filtros sempre que o estado dos filtros mudar
    useEffect(() => {
        onFilterChange({ status, plano });
    }, [status, plano]);

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

    return (
        <div className="mb-4 flex flex-col space-y-2">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Pesquisar por produto..."
                className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <div className="flex flex-wrap space-x-4 mt-2">
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
                    <span>Aberto</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="status"
                        checked={status === 2}
                        onChange={() => handleStatusChange(status === 2 ? undefined : 2)}
                        className="form-radio"
                    />
                    <span>Em atendimento</span>
                </label>
                <Select
                    value={optionsPlano.filter(option => plano?.includes(option.value))}
                    isMulti
                    name="plano"
                    options={optionsPlano}
                    className="plano-multi-select"
                    classNamePrefix="select"
                    placeholder="Selecione uma opção"
                    onChange={handlePlanoChange}
                />
            </div>
        </div>
    );
};

export default SearchBar;
