import React from "react";
import { useState } from "react";

export function AtenderChamado({ produto, cliente, problema }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className='rounded shadow text-white font-semibold bg-red-700 hover:bg-red-800 p-2'
            >
                Atender chamado
            </button>
            {showModal ? (
                <>
                    <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-lg fixed left-1/2 top-72 -translate-x-1/2 -translate-y-1/2 flex flex-col w-6/12 bg-cinza-300">
                                <head className="flex items-start flex-col p-5 text-base font-semibold gap-2">
                                    <div>
                                        <p className="text-2xl">Atendendo chamado</p>
                                        <button
                                            className="text-cinza-100 bg-red-700 rounded font-bold uppercase px-6 py-2 text-sm mr-1 mb-1 absolute top-5 right-5"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancelar chamado
                                        </button>
                                    </div>
                                    <div className="flex items-start justify-start gap-10">
                                        <p>Produto: {produto}</p>
                                        <p>Cliente: {cliente}</p>
                                    </div>
                                    <p>Problema:</p>
                                    <p className="font-normal">{problema}</p>
                                    <p>Tempo de atendimento: </p>
                                </head>
                                <main className="p-6">
                                    <form className="bg-cinza-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Descrição da solução
                                        </label>
                                        <input type='text' className="bg-cinza-100 shadow appearance-none border rounded w-full h-60 py-2 px-1 text-black" />
                                    </form>
                                </main>
                                <footer className="flex items-center justify-between p-6 rounded">
                                    <button
                                        className="text-cinza-500 bg-cinza-400 rounded font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Tranferir chamado
                                    </button>
                                    <button
                                        className="text-cinza-100 bg-pec font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Encerrar chamado
                                    </button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};