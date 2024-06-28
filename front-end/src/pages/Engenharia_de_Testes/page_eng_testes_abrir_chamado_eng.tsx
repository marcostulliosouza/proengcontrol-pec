import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
// Componentes
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';

// Icones
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

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
                // Clientes
                const responseClientes = await fetch('http://172.17.12.28:5000/api/clientes');
                if (responseClientes.ok) {
                    const data = await responseClientes.json();
                    setClientes(data);
                } else {
                    console.error('Erro ao buscar clientes: ', responseClientes.statusText);
                }

                // Produtos
                const responseProdutos = await fetch('http://172.17.12.28:5000/api/produtos');
                if (responseProdutos.ok) {
                    const data = await responseProdutos.json();
                    setProdutos(data);
                } else {
                    console.error('Erro ao buscar produtos: ', responseProdutos.statusText);
                }
            } catch (error) {
                console.error("Erro fetching dados: ", error)
            }
        };
        fetchData();
    }, []);

    const abrirChamado = (event: any) => {
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
        <div className='w-screen h-screen'>
            <div className="grid grid-rows-1 bg-cinza-200 h-1/6">
                <div className='inline-flex p-5 gap-4'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200 flex justify-start items-start h-9'>
                        <IoMenu />
                    </button>
                    <Logo />
                    <div className='inline-flex justify-between w-full'>
                        <div className='flex-col-1 ml-8 mt-4'>
                            <div className='inline-flex content font-bold text-pec gap-2 justify-center items-center'>
                                <Link to={"/menu"} className='inline-flex items-center gap-2'>
                                    <FaHome className='mobile:w-0' />
                                    <p className='mobile:text-[0px]'>Menu</p>
                                </Link>
                                <IoIosArrowForward className='mobile:w-0' />
                                <Link to={"/engenharia_testes"}>
                                    <p className='mobile:text-[0px]'>Engenharia de Testes</p>
                                </Link>
                                <IoIosArrowForward className='mobile:w-0' />
                                <Link to={"/engenharia_testes/abrir_chamado"}>
                                    <p className='mobile:text-[0px]'>Abrir Chamado</p>
                                </Link>
                                <IoIosArrowForward className='mobile:w-0' />
                                <p className='mobile:text-sm mobile:absolute mobile:right-0 mobile:mr-4 mobile:w-24 mobile:text-center'>Abrir Chamado de Engenharia</p>
                            </div>
                            <HelloUser />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-cinza-200 w-screen h-5/6 mobile:p-5'>
                <main className='flex justify-center'>
                    <form onSubmit={abrirChamado} className='grid grid-cols-2 content-center gap-4 w-4/12 text-lg mobile:text-sm mobile:w-screen'>
                        {/* Cliente */}
                        <label className='mobile:text-sm text-lg font-bold text-pec'>Cliente: </label>
                        <div className='flex flex-row gap-2'>
                            <Select
                                options={clientes.map((cliente: any) => ({ value: cliente.cli_id, label: cliente.cli_nome }))}
                                onChange={(selectedOption) => setChamado({ ...chamado, cha_cliente: selectedOption?.value || 0 })}
                                className='text-sm w-full'
                                placeholder='Selecione o cliente'
                                styles={customStyles}
                            />
                            <p className='text-red-600 text-lg font-bold'>*</p>
                        </div>

                        {/* Produto */}
                        <label className='mobile:text-sm text-lg font-bold text-pec'>Produto: </label>
                        <div className='flex flex-row gap-2'>
                            <Select
                                options={produtos
                                    .filter((produto: any) => produto.pro_cliente === chamado.cha_cliente)
                                    .map((produto: any) => ({ value: produto.pro_id, label: produto.pro_nome }))}
                                onChange={(selectedOption) => setChamado({ ...chamado, cha_produto: selectedOption?.value || 0 })}
                                className='text-sm w-full'
                                placeholder='Selecione o produto'
                                styles={customStyles}
                            />
                            <p className='text-red-600 text-lg font-bold'>*</p>
                        </div>

                        {/* Dispositivo de Teste - DT */}
                        <label className='mobile:text-sm text-lg font-bold text-pec'>Dispositivo de Teste - DT: (apenas números)</label>
                        <div className='flex flex-row gap-2'>
                            <input
                                name='dt'
                                type="text"
                                value={chamado.cha_DT}
                                onChange={(event) => setChamado({ ...chamado, cha_DT: chamado.cha_tipo === 1 ? '000000' : event.target.value })}
                                placeholder={chamado.cha_tipo === 1 ? '000000' : 'XXXXXX'}
                                disabled={chamado.cha_tipo === 1}
                                onKeyDown={handleKeyDown}
                                className='indent-1 border border-1 border-black rounded p-2 shadow-sm bg-white h-10 text-sm w-full'
                            />
                            <p className='text-red-600 text-lg font-bold'>*</p>
                        </div>

                        {/* Descrição do chamado */}
                        <div className='flex flex-row col-span-2 gap-2'>
                            <label className='mobile:text-sm text-lg font-bold text-pec'>Breve descrição sobre o Chamado: </label>
                            <p className='text-red-600 text-lg font-bold'>*</p>
                        </div>
                        <textarea
                            name='descricao'
                            value={chamado.cha_descricao}
                            onChange={(event) => setChamado({ ...chamado, cha_descricao: event.target.value })}
                            className="col-span-2 bg-gray-100 shadow appearance-none border border-1 border-cinza-500 rounded h-32 indent-1 text-black resize-none"
                        />
                        <p className='text-red-600 text-sm font-bold col-span-2'>Verifique as informações preenchidas antes de abrir o chamado</p>
                        <button
                            type='submit'
                            className='h-10 bg-pec text-cinza-200 font-bold rounded col-span-2'
                        >
                            ABRIR CHAMADO
                        </button>
                        <p className='text-red-600 text-lg font-bold col-span-2'>* Campo obrigatório</p>
                    </form>
                </main>
            </div>

            {showSidebar && (
                <div className='backdrop-blur-xs fixed inset-y-0 w-screen z-50'>
                    <Sidebar />
                    <button
                        onClick={() => setShowSidebar(false)}
                        className='absolute top-12 left-12 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )}
        </div>
    )
}