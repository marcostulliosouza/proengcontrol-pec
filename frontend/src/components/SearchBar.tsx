// ./components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: { atendido?: boolean; plano?: boolean; status?: number }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [atendido, setAtendido] = useState<boolean | undefined>(undefined);
    const [plano, setPlano] = useState<boolean | undefined>(undefined);
    const [status, setStatus] = useState<number | undefined>(undefined);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    const handleFilterChange = () => {
        onFilterChange({ atendido, plano, status });
    };

    return (
        <div className="mb-4 flex flex-col space-y-2">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Pesquisar..."
                className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <div className="flex space-x-4">
                <label>
                    <input
                        type="checkbox"
                        checked={atendido === true}
                        onChange={() => {
                            setAtendido(atendido === true ? undefined : true);
                            handleFilterChange();
                        }}
                    />
                    Atendido
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={plano === true}
                        onChange={() => {
                            setPlano(plano === true ? undefined : true);
                            handleFilterChange();
                        }}
                    />
                    Plano
                </label>
                <select
                    value={status ?? ''}
                    onChange={(e) => {
                        setStatus(e.target.value ? parseInt(e.target.value) : undefined);
                        handleFilterChange();
                    }}
                    className="border border-gray-300 rounded-lg"
                >
                    <option value="">Status</option>
                    <option value="1">Pendente</option>
                    <option value="2">Em andamento</option>
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
