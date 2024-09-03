// ./components/Pagination.tsx
import React from 'react';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
    return (
        <div className="mt-4 flex justify-between items-center">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            >
                Página Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            >
                Próxima Página
            </button>
        </div>
    );
};

export default Pagination;
