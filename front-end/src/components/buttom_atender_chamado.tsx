import React from "react";
import { useState } from "react";
import Draggable from 'react-draggable';

export function AtenderChamado({ produto, cliente, problema, tempoDeAtendimento, tipo }) {
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
                    <Draggable>
                        <div className="w-[80vw] max-w-[800px] rounded-lg shadow bg-cinza-300 border border-black absolute top-[50%] left-[50%] transform translate[-50%,-50%] z-50">
                            <header className="rounded-lg shadow-lg cursor-move p-5 bg-cinza-300 text-base font-semibold flex flex-col gap-2">
                                <span className="">Atendendo chamado</span>
                                <button
                                    className="absolute top-5 right-5 text-cinza-100 bg-red-700 rounded font-bold uppercase px-6 py-2 text-sm"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar chamado
                                </button>
                                <div className="flex items-start justify-start gap-10">
                                    <p>Produto: {produto}</p>
                                    <p>Cliente: {cliente}</p>
                                </div>
                                <p>Problema:</p>
                                <p className="font-normal">{problema}</p>
                                <p className={`flex justify-center items-center rounded p-2 text-gray-100 text-9xl ${tipo === 1 ? 'bg-no_plano' : tipo === 0 ? 'bg-fora_plano' : 'bg-engenharia'
                                    }`} style={{ textShadow: '2px 2px 2px black' }}>{tempoDeAtendimento}</p>
                            </header>
                            <body>
                                <main>
                                    <form className="p-5 w-full">
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Descrição da solução:
                                        </label>
                                        <textarea className="bg-gray-100 shadow appearance-none border rounded w-full h-60 py-2 px-1 text-black resize-none"></textarea>
                                    </form>
                                </main>
                                <footer className="flex items-center justify-between p-6">
                                    <button
                                        className="text-pec bg-cinza-400 rounded font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1"
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
                            </body>
                        </div>
                    </Draggable>
                </>
            ) : null}
        </>
    );
};