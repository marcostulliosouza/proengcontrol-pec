// frontend/components/LoadingSpinner.tsx
import React from 'react';
import { GiSandsOfTime } from "react-icons/gi";

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-pec mb-4"></div>
                <div className="text-pec animate-pulse text-4xl">
                    <GiSandsOfTime />
                </div>
                <p className="mt-4 text-lg text-gray-700">Carregando...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
