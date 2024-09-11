// src/components/DeviceSearchBar.tsx
import React, { useState } from 'react';

interface DeviceSearchBarProps {
    onSearch: (query: string) => void;
}

const DeviceSearchBar: React.FC<DeviceSearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Pesquisar dispositivos..."
                className="w-full border border-gray-300 p-2 rounded"
            />
        </div>
    );
};

export default DeviceSearchBar;
