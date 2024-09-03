import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SelectField from '../../components/SelectField';
import FormField from '../../components/FormField';
import { IoMenu } from "react-icons/io5";

export function AbrirChamadoEng() {
    const [chamado, setChamado] = useState({
        cha_tipo: 0,
        cha_local: '',
        cha_cliente: 0,
        cha_produto: 0,
        cha_DT: '',
        cha_descricao: '',
        cha_status: '',
        cha_data_hora_abertura: '',
        cha_operador: '',
        cha_plano: 0,
    });
    const [showSidebar, setShowSidebar] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseClientes = await fetch('http://127.0.0.1:5000/api/clientes');
                if (responseClientes.ok) {
                    const data = await responseClientes.json();
                    setClientes(data);
                } else {
                    console.error('Erro ao buscar clientes: ', responseClientes.statusText);
                }

                const responseProdutos = await fetch('http://127.0.0.1:5000/api/produtos');
                if (responseProdutos.ok) {
                    const data = await responseProdutos.json();
                    setProdutos(data);
                } else {
                    console.error('Erro ao buscar produtos: ', responseProdutos.statusText);
                }
            } catch (error) {
                console.error("Erro fetching dados: ", error);
            }
        };
        fetchData();
    }, []);

    const abrirChamado = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(chamado);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];
        if (!validChars.includes(event.key)) {
            event.preventDefault();
        }
    };

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            border: '1px solid black'
        })
    };

    return (
        <div className='w-screen h-screen flex flex-col'>
            <Header />
            <main className='flex-grow bg-cinza-200 p-4'>
                <div className='flex'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200 mr-4'
                    >
                        <IoMenu />
                    </button>
                    <div className='flex-1'>
                        <form onSubmit={abrirChamado} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-lg'>
                            <FormField label='Cliente' required>
                                <SelectField
                                    options={clientes.map((cliente: any) => ({ value: cliente.cli_id, label: cliente.cli_nome }))}
                                    onChange={(selectedOption) => setChamado({ ...chamado, cha_cliente: selectedOption?.value || 0 })}
                                    placeholder='Selecione o cliente'
                                    customStyles={customStyles}
                                />
                            </FormField>

                            <FormField label='Produto' required>
                                <SelectField
                                    options={produtos
                                        .filter((produto: any) => produto.pro_cliente === chamado.cha_cliente)
                                        .map((produto: any) => ({ value: produto.pro_id, label: produto.pro_nome }))}
                                    onChange={(selectedOption) => setChamado({ ...chamado, cha_produto: selectedOption?.value || 0 })}
                                    placeholder='Selecione o produto'
                                    customStyles={customStyles}
                                />
                            </FormField>

                            <FormField label='Dispositivo de Teste - DT (apenas números)'>
                                <input
                                    type="text"
                                    value={chamado.cha_DT}
                                    onChange={(event) => setChamado({ ...chamado, cha_DT: event.target.value })}
                                    placeholder='XXXXXX'
                                    onKeyDown={handleKeyDown}
                                    className='border border-black rounded p-2 shadow-sm bg-white h-10 w-full'
                                />
                            </FormField>

                            <FormField label='Breve descrição sobre o Chamado' required>
                                <textarea
                                    value={chamado.cha_descricao}
                                    onChange={(event) => setChamado({ ...chamado, cha_descricao: event.target.value })}
                                    className="bg-gray-100 border border-cinza-500 rounded h-32 w-full p-2"
                                />
                            </FormField>

                            <div className='col-span-4 text-red-600 text-sm font-bold'>
                                <p>Verifique as informações preenchidas antes de abrir o chamado</p>
                                <p>* Campo obrigatório</p>
                            </div>
                            <button
                                type='submit'
                                className='bg-pec text-cinza-200 font-bold rounded h-10 col-span-4'
                            >
                                ABRIR CHAMADO
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
            {showSidebar && (
                <div className='fixed inset-y-0 w-64 bg-white shadow-lg z-40'>
                    <Sidebar />
                    <button
                        onClick={() => setShowSidebar(false)}
                        className='absolute top-6 right-6 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )}
        </div>
    );
}