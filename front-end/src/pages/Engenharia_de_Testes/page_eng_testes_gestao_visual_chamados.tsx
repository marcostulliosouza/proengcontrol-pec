import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { Sidebar } from '../../components/sidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


interface Chamado {
    cha_status: number;
    cha_plano: number;
    responsavel: string;
    cha_local: string;
    cha_data_hora_atendimento: string;
    produto_nome: string;
    cliente_nome: string;
    tipo_chamado: string;
    cha_descricao: string;
}

interface IndiceDiario {
    dailyTotalCalls: number;
    dailyAvgAnswering: string;
    dailyAvgLate: string;
    dailyUpTime: number;
}

interface IndiceSemanal {
    weeklyTotalCalls: number;
    weeklyAvgAnswering: string;
    weeklyAvgLate: string;
    weeklyUpTime: number;
}

interface IndiceMensal {
    monthlyTotalCalls: number;
    monthlyAvgAnswering: string;
    monthlyAvgLate: string;
    monthlyUpTime: number;
}

interface NotificacaoAtrasoChamado {
    cha_status: number;
    cha_id: number;
    cha_plano: number;
    responsavel: number;
    cha_local: string;
    cha_data_hora_atendimento: string;
    produto_nome: string;
    cliente_nome: string;
    tipo_chamado: string;
    cha_descricao: string;
    minutos_desde_abertura: string;
}

export function GestaoVisualChamados() {
    const [dadosChamado, setDadosChamado] = useState<Chamado[]>([]);
    const [dadosIndicesDiario, setDadosIndicesDiario] = useState<IndiceDiario | null>(null);
    const [dadosIndicesSemanal, setDadosIndicesSemanal] = useState<IndiceSemanal | null>(null);
    const [dadosIndicesMensal, setDadosIndicesMensal] = useState<IndiceMensal | null>(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const prevNotificacoesRef = useRef<NotificacaoAtrasoChamado[]>([]);
    const toastIdMapRef = useRef<Record<number, React.ReactText>>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCall = await fetch('http://172.17.4.23:5000/api/visualizarchamados');
                if (responseCall.ok) {
                    const dataCall = await responseCall.json();
                    setDadosChamado(dataCall);
                } else {
                    console.error('Erro ao buscar dados: ', responseCall.statusText);
                }

                const responseDailyIndex = await fetch('http://172.17.4.23:5000/api/indicadoresdiarios');
                if (responseDailyIndex.ok) {
                    const dataDailyIndex = await responseDailyIndex.json();
                    setDadosIndicesDiario(dataDailyIndex);
                } else {
                    console.error('Erro ao buscar dados: ', responseDailyIndex.statusText);
                }

                const responseWeekIndex = await fetch('http://172.17.4.23:5000/api/indicadoressemanais');
                if (responseWeekIndex.ok) {
                    const dataWeekIndex = await responseWeekIndex.json();
                    setDadosIndicesSemanal(dataWeekIndex);
                } else {
                    console.error('Erro ao buscar dados: ', responseWeekIndex.statusText);
                }

                const responseMonthIndex = await fetch('http://172.17.4.23:5000/api/indicadoresmensais');
                if (responseMonthIndex.ok) {
                    const dataMonthIndex = await responseMonthIndex.json();
                    setDadosIndicesMensal(dataMonthIndex);
                } else {
                    console.error('Erro ao buscar dados: ', responseMonthIndex.statusText);
                }
                const responseNotificacaoChamados = await fetch('http://172.17.4.23:5000/api/notificacaochamadosatrasados');
                if (responseNotificacaoChamados.ok) {
                    const dataNotificacaoChamados = await responseNotificacaoChamados.json();
                    const novosChamadosAtrasados: NotificacaoAtrasoChamado[] = dataNotificacaoChamados.chamadosAtrasados;

                    // Compare new data with previous data to detect new delayed calls
                    const novosChamados = novosChamadosAtrasados.filter((novo: NotificacaoAtrasoChamado) =>
                        !prevNotificacoesRef.current.some((prev: NotificacaoAtrasoChamado) => prev.cha_id === novo.cha_id)
                    );

                    // Find resolved calls to remove notifications
                    const resolvedChamados = prevNotificacoesRef.current.filter((prev: NotificacaoAtrasoChamado) =>
                        !novosChamadosAtrasados.some((novo: NotificacaoAtrasoChamado) => novo.cha_id === prev.cha_id)
                    );

                    resolvedChamados.forEach((chamado: NotificacaoAtrasoChamado) => {
                        if (toastIdMapRef.current[chamado.cha_id]) {
                            toast.dismiss(toastIdMapRef.current[chamado.cha_id]);
                            delete toastIdMapRef.current[chamado.cha_id];
                        }
                    });

                    if (novosChamados.length > 0) {
                        // Show notifications for new delayed calls
                        novosChamados.forEach((chamado: NotificacaoAtrasoChamado) => {
                            const toastId = toast.error(
                                <div className='w-auto m-auto '>
                                    <div className='text-center'>
                                        <strong className='text-4xl'>Chamado Atrasado</strong>
                                        <p className='text-3xl'>{chamado.cliente_nome} - {chamado.produto_nome}</p>
                                        <p className='text-4xl'>{chamado.minutos_desde_abertura} MIN</p>
                                    </div>
                                </div>, {
                                position: "top-right",
                                autoClose: false, // Remove autoClose to make notifications permanent
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                            toastIdMapRef.current[chamado.cha_id] = toastId;
                        });

                        prevNotificacoesRef.current = novosChamadosAtrasados;
                    }
                } else {
                    console.error('Erro ao buscar dados: ', responseNotificacaoChamados.statusText);
                }
            } catch (error) {
                console.error("Erro fetching dados: ", error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 10000); // Update interval to 10 seconds for better performance
        return () => clearInterval(intervalId);
    }, []);

    const calculateDuration = (start: string) => {
        const startDate = new Date(start);
        const currentDate = new Date();
        let duration = currentDate.getTime() - startDate.getTime();

        let isNegative = false;
        if (duration < 0) {
            isNegative = true;
            duration *= -1;
        }

        const hours = Math.floor(duration / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((duration % (1000 * 60)) / 1000).toString().padStart(2, '0');

        let formattedDuration = `${hours}:${minutes}:${seconds}`;

        if (isNegative) {
            formattedDuration = `-${formattedDuration}`;
        }

        return formattedDuration;
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
                            <p>Gestão visual de chamados</p>
                        </div>
                        <HelloUser />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 bg-cinza-200 p-4">
                <div className='bg-white 0 p-4 rounded shadow-md'>
                    <div className='text-2xl text-pec font-bold pb-4'>
                        CHAMADOS EM ATENDIMENTO
                    </div>
                    <div className='min-w-full m-auto'>
                        <Carousel controls={false} interval={7000} wrap={true} variant="dark">
                            {dadosChamado.length > 0 ? (
                                dadosChamado
                                    .filter((row) => row.cha_status === 2)
                                    .map((row, index) => (
                                        <Carousel.Item key={index}>
                                            <div className={`p-4 rounded bg-white shadow-md min-h-[700px] max-w-full border-5 ${row.cha_plano === 1 ? 'border-no_plano' : row.cha_plano === 0 ? 'border-yellow-500' : 'border-engenharia'}`}>
                                                <p className='font-semibold text-4xl p-2'>Suporte: {row.responsavel ? row.responsavel : 'Nome não disponível'}</p>
                                                <div className='flex items-start justify-start text-3xl p-2 my-3 gap-2'>
                                                    <p className='font-semibold'>Local: </p><p>{row.cha_local === null ? 'Não Informado' : row.cha_local}</p>
                                                </div>
                                                <p className={`flex justify-center items-center rounded p-2 text-white text-9xl ${row.cha_plano === 1 ? 'bg-no_plano' : row.cha_plano === 0 ? 'bg-yellow-500' : 'bg-engenharia'}`} style={{ textShadow: '2px 2px 2px black' }}>{calculateDuration(row.cha_data_hora_atendimento)}</p>
                                                <div className="text-3xl p-2">
                                                    <div className='flex items-start justify-start gap-2 py-2'>
                                                        <p className='font-semibold'>Produto:</p><p>{row.produto_nome}</p>
                                                    </div>
                                                    <div className='flex items-start justify-start gap-2 py-2'>
                                                        <p className='font-semibold'>Cliente: </p><p>{row.cliente_nome}</p>
                                                    </div>
                                                    <div className='flex justify-start gap-2 py-2'>
                                                        <p className='font-semibold'>Tipo de Chamado: </p><p>{row.tipo_chamado}</p>
                                                    </div>
                                                    <div className='flex items-start justify-start gap-2 py-2'>
                                                        <p className='font-semibold'>Descrição:</p>
                                                    </div>
                                                    <div className='flex items-start justify-start gap-2 py-2'>
                                                        <p>{row.cha_descricao}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Carousel.Item>
                                    ))
                            ) : (
                                <p>Sem chamados em atendimento.</p>
                            )}
                        </Carousel>
                    </div>
                </div>

                <div className='bg-white p-4 rounded shadow-md'>
                    <div className='text-2xl text-pec font-bold pb-4'>
                        INDICADORES
                    </div>
                    <div className='grid grid-cols-1 gap-4'>
                        <div className='bg-pec text-white rounded p-4 shadow-md text-2xl'>
                            <h2 className='text-xl font-bold mb-2'>DIÁRIO</h2>
                            {dadosIndicesDiario ? (
                                <ul className='list-disc ml-4'>
                                    <li>Total de Chamados: <strong>{dadosIndicesDiario.dailyTotalCalls}</strong></li>
                                    <li>Tempo Médio de Atendimento: <strong>{dadosIndicesDiario.dailyAvgAnswering}</strong></li>
                                    <li>Tempo Médio de Atraso: <strong>{dadosIndicesDiario.dailyAvgLate}</strong></li>
                                    <li>Disponibilidade: <strong>{dadosIndicesDiario.dailyUpTime}</strong></li>
                                </ul>
                            ) : (
                                <p>Sem dados diários disponíveis.</p>
                            )}
                        </div>

                        <div className='bg-pec text-white rounded p-4 shadow-md text-2xl'>
                            <h2 className='text-xl font-bold mb-2 '>SEMANAL</h2>
                            {dadosIndicesSemanal ? (
                                <ul className='list-disc ml-4'>
                                    <li>Total de Chamados: <strong>{dadosIndicesSemanal.weeklyTotalCalls}</strong></li>
                                    <li>Tempo Médio de Atendimento: <strong>{dadosIndicesSemanal.weeklyAvgAnswering}</strong></li>
                                    <li>Tempo Médio de Atraso: <strong>{dadosIndicesSemanal.weeklyAvgLate}</strong></li>
                                    <li>Disponibilidade: <strong>{dadosIndicesSemanal.weeklyUpTime}</strong></li>
                                </ul>
                            ) : (
                                <p>Sem dados semanais disponíveis.</p>
                            )}
                        </div>

                        <div className='bg-pec text-white rounded p-4 shadow-md text-2xl'>
                            <h2 className='text-xl font-bold mb-2'>MENSAL</h2>
                            {dadosIndicesMensal ? (
                                <ul className='list-disc ml-4'>
                                    <li>Total de Chamados: <strong>{dadosIndicesMensal.monthlyTotalCalls}</strong></li>
                                    <li>Tempo Médio de Atendimento: <strong>{dadosIndicesMensal.monthlyAvgAnswering}</strong></li>
                                    <li>Tempo Médio de Atraso: <strong>{dadosIndicesMensal.monthlyAvgLate}</strong></li>
                                    <li>Disponibilidade: <strong>{dadosIndicesMensal.monthlyUpTime}</strong></li>
                                </ul>
                            ) : (
                                <p>Sem dados mensais disponíveis.</p>
                            )}
                        </div>
                    </div>
                </div>
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
            <ToastContainer />
        </div>
    );
}