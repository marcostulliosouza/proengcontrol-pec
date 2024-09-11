// src/pages/DeviceManagement.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import DeviceTable from '../components/DeviceTable';
import DeviceFormModal from '../components/DeviceFormModal';
import DeviceSearchBar from '../components/DeviceSearchBar';

const initialDevices = [
    { id: 1, name: 'Dispositivo 1', type: 'Tipo A' },
    { id: 2, name: 'Dispositivo 2', type: 'Tipo B' },
    { id: 3, name: 'Dispositivo 3', type: 'Tipo C' },
];

const DeviceManagement: React.FC = () => {
    const [devices, setDevices] = useState(initialDevices);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleAddDevice = () => {
        setSelectedDevice(null);
        setIsModalOpen(true);
    };

    const handleEditDevice = (device: any) => {
        setSelectedDevice(device);
        setIsModalOpen(true);
    };

    const handleDeleteDevice = (deviceId: number) => {
        setDevices(devices.filter((device) => device.id !== deviceId));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDevice(null);
    };

    const filteredDevices = devices.filter(device =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <div className="p-4 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Gerenciamento de Dispositivos</h2>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={handleAddDevice}
                        >
                            Adicionar Dispositivo
                        </button>
                    </div>
                    <DeviceSearchBar onSearch={handleSearch} />
                    <DeviceTable
                        devices={filteredDevices}
                        onEdit={handleEditDevice}
                        onDelete={handleDeleteDevice}
                    />
                </div>
            </div>

            {isModalOpen && (
                <DeviceFormModal
                    device={selectedDevice}
                    onClose={handleCloseModal}
                />
            )}
        </Layout>
    );
};

export default DeviceManagement;
