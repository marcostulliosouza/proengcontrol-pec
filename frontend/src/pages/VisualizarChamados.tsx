import React from 'react';
import CallTable from '../components/CallTable';

const CallsPage: React.FC = () => {
    return (
        <div>
            <h1>Lista de Chamados </h1>
            < CallTable />
        </div>
    );
};

export default CallsPage;