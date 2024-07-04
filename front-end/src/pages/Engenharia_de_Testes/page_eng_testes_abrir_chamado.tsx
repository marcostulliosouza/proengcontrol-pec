import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
// import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Componentes
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';

// Icones
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

interface Chamado {
    cha_tipo: number;
    cha_cliente: number;
    cha_produto: number;
    cha_DT: string;
    cha_descricao: string;
    cha_status: number;
    cha_data_hora_abertura: Date;
    cha_operador: string;
    cha_plano: number;
    cha_local: string;
}

interface PlanoProducao {
    pdp_id: number;
}

interface ProdutosPlano {
    odp_id: number;
    odp_cliente: number;
    odp_produto: number;
}

export function AbrirChamado() {
    const [chamado, setChamado] = useState<Chamado>({
        cha_tipo: 0,
        cha_cliente: 0,
        cha_produto: 0,
        cha_DT: '',
        cha_descricao: '',
        cha_status: 1,
        cha_data_hora_abertura: new Date(),
        cha_operador: localStorage.getItem('user') || '',
        cha_plano: 0,
        cha_local: ''
    });
    const [showSidebar, setShowSidebar] = useState(false);
    const [locais, setLocais] = useState([]);
    const [tiposChamados, setTiposChamados] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [planoProducao, setPlanoProducao] = useState<PlanoProducao | null>(null);
    const [produtosPlano, setProdutosPlano] = useState<ProdutosPlano | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Locais
                const responseLocais = await fetch('http://172.17.13.12:5000/api/locais');
                if (responseLocais.ok) {
                    const data = await responseLocais.json();
                    setLocais(data);
                } else {
                    console.error('Erro ao buscar locais: ', responseLocais.statusText);
                }

                // Tipos de chamados
                const responseTipos = await fetch('http://172.17.13.12:5000/api/tiposChamados');
                if (responseTipos.ok) {
                    const data = await responseTipos.json();
                    setTiposChamados(data);
                    console.log('Tipos de chamados: ', tiposChamados);
                } else {
                    console.error('Erro ao buscar tipos de chamados: ', responseTipos.statusText);
                }

                // Clientes
                const responseClientes = await fetch('http://172.17.13.12:5000/api/clientes');
                if (responseClientes.ok) {
                    const data = await responseClientes.json();
                    setClientes(data);
                } else {
                    console.error('Erro ao buscar clientes: ', responseClientes.statusText);
                }

                // Produtos
                const responseProdutos = await fetch('http://172.17.13.12:5000/api/produtos');
                if (responseProdutos.ok) {
                    const data = await responseProdutos.json();
                    setProdutos(data);
                } else {
                    console.error('Erro ao buscar produtos: ', responseProdutos.statusText);
                }

                // Plano de produção do dia
                const responsePlano = await fetch('http://172.17.13.12:5000/api/planododia');
                if (responsePlano.ok) {
                    const data = await responsePlano.json();
                    setPlanoProducao(data);
                    console.log('Plano de produção: ', planoProducao);
                    
                    if (planoProducao !== null) {
                        // Produtos do plano de produção atual
                        const responseProdutos = await fetch(`http://172.17.13.12:5000/api/produtosnoplano?planoProducao=${encodeURIComponent(planoProducao.pdp_id)}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        });
                        if (responseProdutos.ok) {
                            const data = await responseProdutos.json();
                            setProdutosPlano(data);
                            console.log('Produtos do plano de produção: ', produtosPlano);
                        } else {
                            console.error('Erro ao buscar produtos do plano de produção: ', responseProdutos.statusText);
                        }
                    }
                } else {
                    console.error('Erro ao buscar plano de produção: ', responsePlano.statusText);
                }

            } catch (error) {
                console.error("Erro fetching dados: ", error)
            }
        };
        fetchData();
    }, []);

    const abrirChamado = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await axios.get('http://worldtimeapi.org/api/timezone/America/Sao_Paulo');
                chamado.cha_data_hora_abertura = response.data.datetime;

        chamado.cha_plano = produtosPlano?.odp_produto.toString().includes(chamado.cha_produto.toString()) ? 1 : 0;
        if (chamado.cha_tipo === 5) {
            chamado.cha_plano = -1;
        }

        for (const [key, value] of Object.entries(chamado)) {
            if (key !== 'cha_plano') {
                if (value === null || value === '' || value === 0) {
                    toast.error(`Erro: Preencha todos os campos obrigatórios.`);
                    return;
                }
            }
        }

        try {
            const responseAbrirChamado = await fetch('http://172.17.13.12:5000/api/abrirchamado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chamado)
            });

            if (responseAbrirChamado.ok) {
                toast.success("Chamado aberto com sucesso!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                const errorBody = await responseAbrirChamado.text();
                console.error("Erro ao abrir chamado: ", responseAbrirChamado.statusText, errorBody);
            }
        } catch (error) {
            console.error("Erro ao abrir chamado: ", error);
        }
    };

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
            <div className="grid grid-rows-1 bg-cinza-200 p-4">
                <div className='inline-flex gap-4'>
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
                                <p className='mobile:text-sm mobile:absolute mobile:right-0 mobile:mr-4 mobile:w-24 mobile:text-center mobile:mb-5'>Abrir Chamado</p>
                            </div>
                            <HelloUser />
                        </div>
                        {/* <Link to={"/engenharia_testes/abrir_chamado/chamado_engenharia"} className='mobile:hidden'>
                            <Button style={{
                                backgroundColor: "#d9d9d9",
                                color: "#020c3e",
                                textAlign: "center",
                                textDecoration: "none",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                borderRadius: "4px",
                                boxShadow: "2px 4px 2px 0 rgba(2, 12, 62, 0.1)",
                                height: "40px",
                                gap: "10px",
                                marginTop: "20px",
                            }}>
                                Abrir Chamado de Engenharia
                            </Button>
                        </Link> */}
                    </div>
                </div>
            </div>
            <div className='bg-cinza-200 w-screen h-full mobile:p-5'>
                <main className='flex justify-center'>
                    <form className='grid grid-cols-4 content-center gap-4 w-8/12 text-lg mobile:text-sm mobile:w-screen mobile:flex mobile:flex-col' onSubmit={abrirChamado}>
                        {/* Tipo de chamado */}
                        <label className='mobile:text-sm text-lg font-bold text-pec'>Tipo de chamado: </label>
                        <div className='flex flex-row gap-2'>
                            <Select
                                options={tiposChamados.map((tipo: any) => ({ value: tipo.tch_id, label: tipo.tch_descricao }))}
                                onChange={(selectedOption) => setChamado({ ...chamado, cha_tipo: selectedOption?.value || 0 })}
                                className='text-sm w-full'
                                placeholder='Selecione o tipo de chamado'
                                styles={customStyles}
                            />
                            <p className='text-red-600 text-lg font-bold'>*</p>
                        </div>

                        {/* Local */}
                        <label className='mobile:text-sm text-lg font-bold text-pec'>Local: </label>
                        <div className='flex flex-row gap-2'>
                            <Select
                                options={locais.map((local: any) => ({ value: local.loc_id, label: local.loc_nome }))}
                                onChange={(selectedOption) => setChamado({ ...chamado, cha_local: selectedOption?.label || 'Sem local' })}
                                className='text-sm w-full'
                                placeholder='Selecione o local'
                                styles={customStyles}
                            />
                            <p className='text-red-600 text-lg font-bold'>*</p>
                        </div>

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
                                className='indent-1 border border-1 border-black rounded p-2 shadow-sm bg-white h-10 w-full text-sm'
                            />
                            <p className='text-red-600 text-lg font-bold'>*</p>
                        </div>

                        {/* Descrição do chamado */}
                        <div className='flex flex-row col-span-4 gap-2'>
                            <label className='mobile:text-sm text-lg font-bold text-pec'>Breve descrição sobre o Chamado: </label>
                            <p className='text-red-600 text-lg font-bold'>*</p>
                        </div>
                        <textarea
                            name='descricao'
                            value={chamado.cha_descricao}
                            onChange={(event) => setChamado({ ...chamado, cha_descricao: event.target.value })}
                            className="col-span-2 bg-gray-100 shadow appearance-none border border-1 border-cinza-500 rounded h-32 indent-1 text-black resize-none"
                        />
                        <div className='col-span-2 text-red-600 text-sm font-bold'>
                            <p>Verifique as informações preenchidas antes de abrir o chamado</p>
                            <p>* Campo obrigatório</p>
                        </div>
                        <button
                            type='submit'
                            className='h-10 bg-pec text-cinza-200 font-bold rounded col-span-2'
                        >
                            ABRIR CHAMADO
                        </button>

                    </form>
                </main>
            </div>

            {showSidebar && (
                <div className='backdrop-blur-xs fixed inset-y-0 w-screen z-50'>
                    <Sidebar />
                    <button
                        onClick={() => setShowSidebar(false)}
                        className='absolute top-6 left-6 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}