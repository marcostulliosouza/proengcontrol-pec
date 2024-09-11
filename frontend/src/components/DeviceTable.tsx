// src/components/DeviceTable.tsx
import React from 'react';

interface Device {
    id: number;
    name: string;
    type: string;
}

interface DeviceTableProps {
    devices: Device[];
    onEdit: (device: Device) => void;
    onDelete: (deviceId: number) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices, onEdit, onDelete }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {devices.map((device) => (
                    <tr key={device.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                onClick={() => onEdit(device)}
                            >
                                Editar
                            </button>
                            <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => onDelete(device.id)}
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DeviceTable;
