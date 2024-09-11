// components/Button.tsx
import React from 'react';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    type?: 'submit' | 'button';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {label}
        </button>
    );
};

export default Button;