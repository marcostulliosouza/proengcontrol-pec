// ./components/Footer.tsx
import React from 'react';
import logoHimix from '../assets/logo-hi-mix.svg';

const Footer: React.FC = () => {
    return (
        <footer className="bg-pec text-white text-center py-4 mt-auto">
            <div className="container mx-auto">
                <img src={logoHimix} alt="Hi-mix" className="w-1/12 min-w-20 mx-auto py-2" />
                <p className="text-sm">&copy; 2024 PEC. Todos os direitos reservados.</p>
                <div className="mt-2">
                    <p className="text-xs">Desenvolvido por Marcos Tullio - Engenharia de Testes - Hi-mix</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;