// components/SearchBar.tsx
import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface SearchBarProps {
    query: string;
    onSearch: (query: string) => void;
    placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearch, placeholder }) => {

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <div className="flex justify-end mb-1 w-full"> {/* Alinha à direita */}
            <div className="flex items-center border border-gray-300 rounded-lg w-full max-w-lg"> {/* Limite máximo de largura */}
                <CiSearch className="text-gray-500 ml-2 mr-2" />
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    className="p-2 w-full outline-none rounded-lg"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default SearchBar;
