import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    getAllCalls,
    attendCall,
    closeCall,
    transferCall,
    giveUpCall,
    isLockedCall,
    lockCall
} from '../api/callApi';
import { getDetractorList } from '../api/detractorApi';
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
            setDetractorList(await getDetractorList());
            setUsersList(await getUsersList());
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const handleLock = async () => {
            await lockCall(call.cha_id, isOpen);
            setLocked(isOpen);
        };
        handleLock();
    }, [isOpen]);

    const handleAttend = async () => {
        await attendCall(call.cha_id, 'userId'); // Substitua 'userId' pelo ID do usuário
        setIsAttending(true);
        refreshCalls();
    };

    const handleTransfer = async () => {
        if (transferTo) {
            await transferCall(call.cha_id, 'currentUserId', transferTo); // Substitua 'currentUserId' pelo ID do usuário atual
            setShowTransfer(false);
            refreshCalls();
        }
    };

    const handleClose = async () => {
        await closeCall(call.cha_id, 'detractorId', actionTaken); // Substitua 'detractorId' pelo ID do detrator
        setShowClose(false);
        refreshCalls();
    };

    const handleGiveUp = async () => {
        await giveUpCall(call.cha_id, 'currentUserId'); // Substitua 'currentUserId' pelo ID do usuário atual
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
                                {/* <DetailItem title="Tempo Total" content={isAttending ? `Tempo de Atendimento: ${call.duracao_atendimento}` : call.duracao_total} /> */}
                                <DetailItem title="Criador" content={call.cha_cliente} />
                                <DetailItem title="Tipo de Chamado" content={call.call_type} />
                                <DetailItem title="Cliente" content={call.cha_cliente} />
                                <DetailItem title="Produto" content={call.cha_produto} />
                                <DetailItem title="Dispositivo de Teste" content={call.cha_plano} />
                                <DetailItem title="Local" content={call.cha_local} />
                                <DetailItem title="Descrição" content={call.cha_descricao} />
                            </div>

                            <div className="mt-4 flex gap-4">
                                {isAttending ? (
                                    <>
                                        <ActionButton onClick={() => setShowClose(true)} color="blue" label="Finalizar Chamado" />
                                        <ActionButton onClick={() => setShowTransfer(true)} color="green" label="Transferir Chamado" />
                                        <ActionButton onClick={() => setShowGiveUp(true)} color="red" label="Desistir do Chamado" />
                                    </>
                                ) : (
                                    <ActionButton onClick={handleAttend} color="yellow" label="Atender Chamado" />
                                )}
                                <ActionButton
                                    onClick={() => {
                                        setIsOpen(false);
                                        onClose();
                                    }}
                                    color="gray"
                                    label="Fechar"
                                />

                            </div>

                            {/* Transfer Modal */}
                            <Modal show={showTransfer} onClose={() => setShowTransfer(false)} title="Transferir Chamado">
                                <SelectField label="Transferir para" value={transferTo} onChange={setTransferTo} options={usersList} />
                                <div className="mt-4 flex gap-4">
                                    <ActionButton onClick={handleTransfer} color="blue" label="Confirmar" />
                                    <ActionButton onClick={() => setShowTransfer(false)} color="gray" label="Cancelar" />
                                </div>
                            </Modal>

                            {/* Close Modal */}
                            <Modal show={showClose} onClose={() => setShowClose(false)} title="Fechar Chamado">
                                <TextAreaField label="Motivo" value={actionTaken} onChange={setActionTaken} />
                                <div className="mt-4 flex gap-4">
                                    <ActionButton onClick={handleClose} color="blue" label="Confirmar" />
                                    <ActionButton onClick={() => setShowClose(false)} color="gray" label="Cancelar" />
                                </div>
                            </Modal>

                            {/* Give Up Modal */}
                            <Modal show={showGiveUp} onClose={() => setShowGiveUp(false)} title="Desistir do Chamado">
                                <p className="text-sm text-gray-500">Você tem certeza de que deseja desistir deste chamado? Esta ação não pode ser desfeita.</p>
                                <div className="mt-4 flex gap-4">
                                    <ActionButton onClick={handleGiveUp} color="red" label="Confirmar" />
                                    <ActionButton onClick={() => setShowGiveUp(false)} color="gray" label="Cancelar" />
                                </div>
                            </Modal>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

const DetailItem: React.FC<{ title: string; content: string }> = ({ title, content }) => (
    <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p>{content}</p>
    </div>
);

const ActionButton: React.FC<{ onClick: () => void; color: string; label: string }> = ({ onClick, color, label }) => (
    <button
        type="button"
        className={`inline-flex justify-center rounded-md border border-transparent bg-${color}-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-${color}-600`}
        onClick={onClick}
    >
        {label}
    </button>
);

const Modal: React.FC<{ show: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ show, onClose, title, children }) => (
    <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                    <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">{title}</Dialog.Title>
                    <div className="mt-2">{children}</div>
                </Dialog.Panel>
            </Transition.Child>
        </Dialog>
    </Transition>
);

const SelectField: React.FC<{ label: string; value: string | null; onChange: (value: string) => void; options: any[] }> = ({ label, value, onChange, options }) => (
    <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">Selecione</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
    </div>
);

const TextAreaField: React.FC<{ label: string; value: string; onChange: (value: string) => void }> = ({ label, value, onChange }) => (
    <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={3}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export default CallModal;
