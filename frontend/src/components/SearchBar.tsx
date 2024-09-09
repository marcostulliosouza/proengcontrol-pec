import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: { atendido?: boolean; plano?: boolean; status?: number; tipo?: number }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [atendido, setAtendido] = useState<boolean | undefined>(undefined);
    const [plano, setPlano] = useState<boolean | undefined>(undefined);
    const [status] = useState<number | undefined>(undefined);
    const [tipo, setTipo] = useState<number | undefined>(undefined);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    const handleFilterChange = () => {
        onFilterChange({ atendido, plano, status, tipo });
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
            <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap space-x-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={atendido === true}
                            onChange={() => {
                                setAtendido(atendido === true ? undefined : true);
                                handleFilterChange();
                            }}
                            className="form-checkbox"
                        />
                        <span>Em atendimento</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={plano === true}
                            onChange={() => {
                                setPlano(plano === true ? undefined : true);
                                handleFilterChange();
                            }}
                            className="form-checkbox"
                        />
                        <span>Chamados do Plano</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={plano === false}
                            onChange={() => {
                                setPlano(plano === false ? undefined : false);
                                handleFilterChange();
                            }}
                            className="form-checkbox"
                        />
                        <span>Fora do Plano</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={tipo === 3}
                            onChange={() => {
                                setTipo(tipo === 3 ? undefined : 3);
                                handleFilterChange();
                            }}
                            className="form-checkbox"
                        />
                        <span>Chamados de Engenharia</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
