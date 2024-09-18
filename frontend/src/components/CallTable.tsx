import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
    getAllCalls,
    attendCall,
    closeCall,
    transferCall,
    giveUpCall,
    isLockedCall,
    lockCall
} from '../api/callApi';
import { getDetractorList } from '../api/dectratorApi';
import { getUsersList } from '../api/userApi';

interface CallModalProps {
    call: any;
    onClose: () => void;
    refreshCalls: () => void;
}

const CallModal: React.FC<CallModalProps> = ({ call, onClose, refreshCalls }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isAttending, setIsAttending] = useState(false);
    const [showTransfer, setShowTransfer] = useState(false);
    const [showClose, setShowClose] = useState(false);
    const [showGiveUp, setShowGiveUp] = useState(false);
    const [transferTo, setTransferTo] = useState<string | null>(null);
    const [actionTaken, setActionTaken] = useState<string>('');
    const [detractorList, setDetractorList] = useState<any[]>([]);
    const [usersList, setUsersList] = useState<any[]>([]);
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            const lockedStatus = await isLockedCall(call.cha_id);
            setLocked(lockedStatus);
            const detractors = await getDetractorList();
            setDetractorList(detractors);
            const users = await getUsersList();
            setUsersList(users);
        };

        fetchInitialData();
    }, [call.cha_id]);

    useEffect(() => {
        if (isOpen) {
            lockCall(call.cha_id, true).then(() => setLocked(true));
        } else {
            lockCall(call.cha_id, false).then(() => setLocked(false));
        }
    }, [isOpen]);

    const handleAttend = async () => {
        await attendCall(call.cha_id, 'userId'); // Replace 'userId' with actual user ID
        setIsAttending(true);
        refreshCalls();
    };

    const handleTransfer = async () => {
        if (transferTo) {
            await transferCall(call.cha_id, 'currentUserId', transferTo); // Replace 'currentUserId' with actual user ID
            setShowTransfer(false);
            refreshCalls();
        }
    };

    const handleClose = async () => {
        await closeCall(call.cha_id, 'detractorId', actionTaken); // Replace 'detractorId' with actual detractor ID
        setShowClose(false);
        refreshCalls();
    };

    const handleGiveUp = async () => {
        await giveUpCall(call.cha_id, 'currentUserId'); // Replace 'currentUserId' with actual user ID
        setShowGiveUp(false);
        refreshCalls();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                setIsOpen(false);
                onClose();
            }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">Detalhes do Chamado</Dialog.Title>

                            <div className="mt-2 space-y-4">
                                <div>
                                    <h3 className="text-sm font-semibold">Tempo Total</h3>
                                    <p>{isAttending ? 'Tempo de Atendimento: ' + call.duracao_atendimento : call.duracao_total}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold">Criador</h3>
                                    <p>{call.cha_cliente}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold">Tipo de Chamado</h3>
                                    <p>{call.call_type}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold">Cliente</h3>
                                    <p>{call.cha_cliente}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold">Produto</h3>
                                    <p>{call.cha_produto}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold">Dispositivo de Teste</h3>
                                    <p>{call.cha_plano}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold">Local</h3>
                                    <p>{call.cha_local}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold">Descrição</h3>
                                    <p>{call.cha_descricao}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-4">
                                {isAttending ? (
                                    <>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600"
                                            onClick={() => setShowClose(true)}
                                        >
                                            Finalizar Chamado
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600"
                                            onClick={() => setShowTransfer(true)}
                                        >
                                            Transferir Chamado
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600"
                                            onClick={() => setShowGiveUp(true)}
                                        >
                                            Desistir do Chamado
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-600"
                                        onClick={handleAttend}
                                    >
                                        Atender Chamado
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-400"
                                    onClick={() => {
                                        setIsOpen(false);
                                        onClose();
                                    }}
                                >
                                    Fechar
                                </button>
                            </div>

                            {/* Transfer Modal */}
                            <Transition appear show={showTransfer} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={() => setShowTransfer(false)}>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="mx-auto max-w-sm p-6 bg-white rounded-lg shadow-lg">
                                            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">Transferir Chamado</Dialog.Title>
                                            <div className="mt-2">
                                                <label className="block text-sm font-medium text-gray-700">Transferir para</label>
                                                <select
                                                    value={transferTo ?? ''}
                                                    onChange={(e) => setTransferTo(e.target.value)}
                                                    className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option value="">Selecione um usuário</option>
                                                    {
                                                        usersList.map((user) => (
                                                            <option key={user.id} value={user.id}>
                                                                {user.name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="mt-4 flex gap-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600"
                                                    onClick={handleTransfer}
                                                >
                                                    Confirmar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-400"
                                                    onClick={() => setShowTransfer(false)}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </Dialog>
                            </Transition>

                            {/* Close Modal */}
                            <Transition appear show={showClose} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={() => setShowClose(false)}>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="mx-auto max-w-sm p-6 bg-white rounded-lg shadow-lg">
                                            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">Fechar Chamado</Dialog.Title>
                                            <div className="mt-2">
                                                <label className="block text-sm font-medium text-gray-700">Motivo</label>
                                                <textarea
                                                    rows={3}
                                                    value={actionTaken}
                                                    onChange={(e) => setActionTaken(e.target.value)}
                                                    className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="mt-4 flex gap-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600"
                                                    onClick={handleClose}
                                                >
                                                    Confirmar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-400"
                                                    onClick={() => setShowClose(false)}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </Dialog>
                            </Transition>

                            {/* Give Up Modal */}
                            <Transition appear show={showGiveUp} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={() => setShowGiveUp(false)}>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="mx-auto max-w-sm p-6 bg-white rounded-lg shadow-lg">
                                            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">Desistir do Chamado</Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">Você tem certeza de que deseja desistir deste chamado? Esta ação não pode ser desfeita.</p>
                                            </div>
                                            <div className="mt-4 flex gap-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600"
                                                    onClick={handleGiveUp}
                                                >
                                                    Confirmar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-400"
                                                    onClick={() => setShowGiveUp(false)}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </Dialog>
                            </Transition>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CallModal;

