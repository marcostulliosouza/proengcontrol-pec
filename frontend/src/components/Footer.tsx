import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-pec text-white text-center py-4 mt-auto">
            <div className="container mx-auto">
                <p className="text-sm">&copy; 2024 PEC. Todos os direitos reservados.</p>
                <div className="mt-2">
                    <p className="text-xs">Desenvolvido por Marcos Tullio - Plataforma de Engenharia de Testes - Hi-mix</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;