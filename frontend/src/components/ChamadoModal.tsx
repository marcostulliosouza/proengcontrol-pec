import React from 'react';

interface Chamado {
    cha_id: number;
    cha_cliente: string;
    cha_data_hora_abertura: string;
    cha_data_hora_atendimento: string | null;
    cha_data_hora_termino: string | null;
    cha_descricao: string;
    cha_local: string;
    cha_operador: string;
    cha_plano: boolean;
    cha_produto: string;
    cha_status: number;
    cha_tipo: string;
    cha_visualizado: boolean;
    duracao_total: number | null;
    duracao_atendimento: number | null;
}

interface ChamadoModalProps {
    chamado: Chamado;
    onClose: () => void;
}

const ChamadoModal: React.FC<ChamadoModalProps> = ({ chamado, onClose }) => {
    const handleAtenderChamado = () => {
        // Lógica para iniciar o atendimento do chamado
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Detalhes do Chamado</h2>
                <div className="grid grid-cols-2 gap-4">
                    {/* Exibir os detalhes do chamado em campos de formulário desabilitados */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cliente</label>
                        <input
                            type="text"
                            value={chamado.cha_cliente}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data de Abertura</label>
                        <input
                            type="text"
                            value={chamado.cha_data_hora_abertura}
                            disabled
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    {/* Adicione mais campos conforme necessário */}
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleAtenderChamado}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Atender Chamado
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChamadoModal;
