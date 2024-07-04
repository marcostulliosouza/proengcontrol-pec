import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';
import Draggable from 'react-draggable';
import { useMediaQuery } from 'react-responsive';
import { format } from 'date-fns';

export function VisualizarChamados() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dados, setDados] = useState([]);
    const [chamadosAtendidos, setChamadosAtendidos] = useState([] as any);
    const [chamado, setChamado] = useState({} as any);
    const [dataInicial, setDataInicial] = useState(new Date(new Date().setDate(new Date().getDate() - 1)));
    const [dataFinal, setDataFinal] = useState(new Date());
    const dataInicialString = dataInicial.toISOString();
    const dataFinalString = dataFinal.toISOString();

    const isMobile = useMediaQuery({
        query: '(max-width: 639px)'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://172.17.13.12:5000/api/chamados', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const responseAtendidos = await fetch(`http://172.17.13.12:5000/api/chamadosatendidos?dataInicial=${encodeURIComponent(dataInicialString)}&dataFinal=${encodeURIComponent(dataFinalString)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const sortedData = data.sort((a: any) => {
                        if (a.cha_plano === 1) return -1;
                        if (a.cha_plano === 0) return -1;
                        return 1;
                    });
                    setDados(sortedData);
                } else {
                    console.error('Erro ao buscar chamados: ', response.statusText);
                }
                if (responseAtendidos.ok) {
                    const dataAtendidos = await responseAtendidos.json();
                    setChamadosAtendidos(dataAtendidos);
                } else {
                    console.error('Erro ao buscar chamados atendidos: ', responseAtendidos.statusText);
                }
            } catch (error) {
                console.error("Erro fetching dados: ", error)
            }
        };
        fetchData();

        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, [dataInicial, dataFinal]);

    const openModal = (chamado: any) => {
        setShowModal(true);
        setChamado(chamado);
    }

    return (
        <div className='w-screen h-screen flex flex-col'>
            <div className="bg-cinza-200 p-4">
                <div className='inline-flex gap-4'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200 flex justify-start items-start h-9'>
                        <IoMenu />
                    </button>
                    <Logo />
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
                            <p className='mobile:text-sm mobile:absolute mobile:right-0 mobile:mr-4 mobile:w-24 mobile:text-center mobile:mb-5'>Visualizar chamados</p>
                        </div>
                        <HelloUser />
                    </div>
                </div>
            </div>
            <div className='h-full bg-cinza-200 grid grid-cols-2 mobile:flex mobile:flex-col px-4 gap-4'>
                <div className='bg-white rounded shadow-md flex flex-col mobile:max-h-[300px] max-h-[700px]'>
                    <h1 className='ml-6 mt-4 mobile:text-lg text-xl text-pec font-bold mobile:m-2'>CHAMADOS EM ATENDIMENTO</h1>
                    <div className='m-6 overflow-y-auto mobile:m-2'>
                        <ul>
                            {dados
                                .map((chamado: any) => (
                                    <li key={chamado.cha_id} className={`flex flex-col border-2 rounded mb-2 shadow-md p-2 mobile:text-xs
                                        ${chamado.cha_plano == 1 ? 'border-no_plano' : chamado.cha_plano == 0 ? 'border-fora_plano' : 'border-engenharia'}`}>
                                        <button onClick={() => openModal(chamado)}>
                                            <div className='grid grid-cols-3 mobile:grid-cols-1'>
                                                <div className='inline-flex gap-2'>
                                                    <p className='font-bold'>Local:</p> {chamado.cha_local}
                                                </div>
                                                <div className='inline-flex gap-2'>
                                                    <p className={'font-bold'}>Atendimento:</p> <p className={`font-normal ${chamado.cha_status == 1 ? '' : 'text-green-600 font-semibold'}`}>{chamado.cha_status == 1 ? 'Pendente' : 'Em andamento'}</p>
                                                </div>
                                                <div className='inline-flex gap-2'>
                                                    <p className='font-bold'>Aberto por:</p> {chamado.cha_operador}
                                                </div>
                                                <div className='inline-flex gap-2'>
                                                    <p className='font-bold'>Produto:</p> {chamado.produto_nome}
                                                </div>
                                                <div className='inline-flex gap-2'>
                                                    <p className='font-bold'>Cliente:</p> {chamado.cliente_nome}
                                                </div>
                                                <div className='inline-flex gap-2'>
                                                    <p className='font-bold'>Abertura:</p>
                                                    <p>{format(new Date(chamado.cha_data_hora_abertura), 'dd/MM/yyyy HH:mm')}</p>
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div className='bg-white rounded shadow-md mobile:max-h-[300px] max-h-[700px]'>
                    <div className='inline-flex justify-between w-full px-6 pt-4 mobile:grid mobile:px-2 mobile:pt-2'>
                        <h1 className='mobile:text-lg text-xl text-pec font-bold'>CHAMADOS ATENDIDOS</h1>
                        <div className='flex gap-2 justify-between text-sm mobile:text-xs'>
                            <div className='inline-flex items-center gap-2'>
                                <p className='text-center font-bold text-pec'>De:</p>
                                <input
                                    name='dataInicial'
                                    type="date"
                                    value={dataInicial.toISOString().split('T')[0]}
                                    onChange={(e) => setDataInicial(new Date(e.target.value + 'T00:00:00.000Z'))}
                                    className='text-center border-2 border-pec rounded p-1 shadow-2xl'
                                />
                            </div>
                            <div className='inline-flex items-center gap-2'>
                                <p className='text-center font-bold text-pec'>Há:</p>
                                <input
                                    name='dataFinal'
                                    type="date"
                                    value={dataFinal.toISOString().split('T')[0]}
                                    onChange={(e) => setDataFinal(new Date(e.target.value + 'T00:00:00.000Z'))}
                                    className='text-center border-2 border-pec rounded p-1 shadow-md'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='m-6 overflow-y-auto h-[600px] mobile:h-[200px] mobile:m-2'>
                        <ul>
                            {chamadosAtendidos
                                .map((chamado: any) => (
                                    <li key={chamado.cha_id} className={`flex flex-col border-2 rounded mb-2 shadow-md p-2 mobile:text-xs
                                        ${chamado.cha_plano == 1 ? 'border-no_plano' : chamado.cha_plano == 0 ? 'border-fora_plano' : 'border-engenharia'}`}>
                                        <button onClick={() => openModal(chamado)}>
                                            <div className='grid grid-cols-3 mobile:grid-cols-1'>
                                                <div className='inline-flex gap-2'>
                                                    <p className='font-bold'>Local:</p> {chamado.cha_local}
                                                </div>
                                                <div className='inline-flex gap-2 mobile:hidden'>
                                                    <p className='font-bold'>Atendimento:</p><p className='text-green-600 font-semibold'>{chamado.cha_status == 3 ? 'Concluído' : ''}</p>
                                                </div>
                                                <div className='inline-flex gap-2'>
                                                    <p className='font-bold'>Aberto por:</p> {chamado.cha_operador}
                                                </div>
                                                <div className='inline-flex gap-2'>
                                                    <p className='font-bold'>Produto:</p> {chamado.produto_nome}
                                                </div>
                                                <div className='inline-flex gap-2'>
                                                    <p className='font-bold'>Cliente:</p> {chamado.cliente_nome}
                                                </div>
                                                <div className='inline-flex gap-2'>
                                                    <p className='font-bold'>Fechamento:</p>
                                                    <p>{chamado.cha_data_hora_termino ? format(new Date(chamado.cha_data_hora_termino), 'dd/MM/yyyy HH:mm') : ''}</p>
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
            {showModal ? (
                <>
                    <Draggable disabled={isMobile}>
                        <div className={`mobile:fixed mobile:inset-0 mobile:overflow-hidden mobile:w-screen w-[80vw] max-w-[800px] rounded-lg shadow bg-cinza-300 border-5 mobile:border-none absolute top-20 left-40 z-50 p-3 ${chamado.cha_plano === 1 ? 'border-no_plano' : chamado.cha_plano === 0 ? 'border-fora_plano text-black' : 'border-engenharia'}`}>
                            <div className="rounded-lg mobile:cursor-auto cursor-move text-base flex flex-col gap-2">
                                <nav className='flex justify-between items-center'>
                                    <span className="text-2xl font-semibold">Detalhes do chamado</span>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        type="button"
                                        className="text-cinza-100 bg-no_plano rounded font-bold uppercase mobile:p-2 px-6 py-2 mobile:text-xs text-sm"
                                    >
                                        Fechar
                                    </button>
                                </nav>
                                <div className='grid grid-cols-2 mobile:flex mobile:flex-col gap-2'>
                                    <div className='flex items-start justify-start gap-2'>
                                        <p className="font-semibold">Local:</p>
                                        <p>{chamado.cha_local}</p>
                                    </div>
                                    <div className='flex items-start justify-start gap-2'>
                                        <p className="font-semibold">Atendimento:</p>
                                        <p className={`font-normal ${chamado.cha_status == 1 ? '' : 'text-green-600 font-semibold'}`}>{chamado.cha_status == 1 ? 'PENDENTE' : chamado.cha_status == 2 ? 'EM ANDAMENTO' : 'CONCLUÍDO'}</p>
                                    </div>
                                    <div className='flex items-start justify-start gap-2'>
                                        <p className="font-semibold">Aberto por:</p>
                                        <p>{chamado.cha_operador}</p>
                                    </div>
                                    <div className='flex items-start justify-start gap-2'>
                                        <p className="font-semibold">Tipo de chamado:</p>
                                        <p>{chamado.tipo_chamado}</p>
                                    </div>
                                    <div className='flex items-start justify-start gap-2'>
                                        <p className="font-semibold">Produto:</p>
                                        <p>{chamado.produto_nome}</p>
                                    </div>
                                    <div className='flex items-start justify-start gap-2'>
                                        <p className="font-semibold">Cliente:</p>
                                        <p>{chamado.cliente_nome}</p>
                                    </div>
                                    <div className='flex items-start justify-start gap-2'>
                                        <p className="font-semibold">Abertura:</p>
                                        <p>{format(new Date(chamado.cha_data_hora_abertura), 'dd/MM/yyyy HH:mm')}</p>
                                    </div>
                                    <div className='flex items-start justify-start gap-2'>
                                        <p className="font-semibold">Fechamento:</p>
                                        <p>{chamado.cha_data_hora_termino ? format(new Date(chamado.cha_data_hora_termino), 'dd/MM/yyyy HH:mm') : ''}</p>
                                    </div>
                                    <p className="font-semibold">Problema:</p>
                                    <p className='col-span-2'>{chamado.cha_descricao}</p>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </>
            ) : null}

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
        </div>
    )
}