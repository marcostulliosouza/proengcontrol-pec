// src/components/DeviceFormModal.tsx
import React, { useState, useEffect } from 'react';

interface Device {
    id?: number;
    name: string;
    type: string;
}

interface DeviceFormModalProps {
    device?: Device;
    onClose: () => void;
}

const DeviceFormModal: React.FC<DeviceFormModalProps> = ({ device, onClose }) => {
    const [name, setName] = useState(device?.name || '');
    const [type, setType] = useState(device?.type || '');

    const handleSave = () => {
        // Implementar lógica de salvar dispositivo
        onClose();
    };

    useEffect(() => {
        if (device) {
            setName(device.name);
            setType(device.type);
        }
    }, [device]);

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-800 flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{device ? 'Editar Dispositivo' : 'Adicionar Dispositivo'}</h2>
                <label className="block mb-2">
                    Nome
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mt-1"
                    />
                </label>
                <label className="block mb-4">
                    Tipo
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mt-1"
                    />
                </label>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Salvar
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeviceFormModal;
