import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

// Icons
import logo from "../../assets/icon_pec.svg"
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

// Componentes
import { Sidebar } from '../../components/sidebar';

// Interface para definir o tipo de dados dos chamados
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


export function VisualizarChamados() {
    const [dadosChamado, setDadosChamado] = useState<Chamado[]>([]);
    const [dadosIndicesDiario, setDadosIndicesDiario] = useState([]);
    const [dadosIndicesSemanal, setDadosIndicesSemanal] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);

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
                    console.log(dataDailyIndex);
                    setDadosIndicesDiario(dataDailyIndex);
                } else {
                    console.error('Erro ao buscar dados: ', responseDailyIndex.statusText);
                }
                const responseWeekIndex = await fetch('http://172.17.4.23:5000/api/indicadoressemanais');
                if (responseWeekIndex.ok) {
                    const dataWeekIndex = await responseWeekIndex.json();
                    console.log(dataWeekIndex);
                    setDadosIndicesSemanal(dataWeekIndex);
                } else {
                    console.error('Erro ao buscar dados: ', responseWeekIndex.statusText);
                }
            } catch (error) {
                console.error("Erro fetching dados: ", error)
            }
        };
        fetchData();

        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    // Função para calcular a duração
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
        <>
            <header className="grid grid-rows-1 bg-cinza-200">
                <div className='inline-flex p-5 gap-4'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200 flex justify-start items-start'>
                        <IoMenu />
                    </button>

                    <div className="grid justify-items-center items-center text-pec font-semibold">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="PEC" />
                            <h1 className='text-xl'>PEC</h1>
                        </div>
                        <p className='text-sm'>ProEngControl</p>
                    </div>
                    <div className='inline-flex content font-bold text-pec ml-8 gap-2 justify-center items-center'>
                        <Link to={"/menu"} className='inline-flex items-center gap-2'>
                            <FaHome className='mobile:w-0'/>
                            <p className='mobile:text-[0px]'>Menu</p>
                        </Link>
                        <IoIosArrowForward className='mobile:w-0'/>
                        <Link to={"/engenharia_testes"}>
                            <p className='mobile:text-[0px]'>Engenharia de Testes</p>
                        </Link>
                        <IoIosArrowForward className='mobile:w-0'/>
                        <p>Visualizar chamados</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-2 grid-flow-col bg-cinza-200">
                <div className='col-span-1 row-span-2 p-4 flex flex-col justify-center items-center'>
                    <div className='text-4xl text-pec font-bold pb-4 self-start'>
                        CHAMADOS EM ATENDIMENTO
                    </div>
                    <Carousel
                        controls={false}
                        interval={7000}
                        wrap={true}
                        variant="dark"
                    >
                        {dadosChamado
                            .filter((row: any) => row.cha_status === 2)
                            .map((row: any, index: number) => (
                                <Carousel.Item key={index}>
                                    <div className='p-4 rounded bg-white shadow shadow-black border-1 border-cinza-300 h-[800px] min-w-[800px] max-w-[840px] place-self-center'>
                                        <p className='font-semibold text-4xl p-1'>Responsável: {row.responsavel.toUpperCase()}</p>
                                        <div className='flex items-start justify-start text-3xl py-3'>
                                            <p className='font-semibold'>Local: </p><p>{row.cha_local}</p>
                                        </div>
                                        <p className={`flex justify-center items-center rounded p-2 text-gray-100 text-9xl ${row.cha_plano === 1 ? 'bg-no_plano' : row.cha_plano === 0 ? 'bg-yellow-500' : 'bg-engenharia'}`} style={{ textShadow: '2px 2px 2px black' }}>{calculateDuration(row.cha_data_hora_atendimento)}</p>
                                        <div className="text-3xl py-5">
                                            <div className='flex items-start justify-start gap-2 py-3'>
                                                <p className='font-semibold'>Produto:</p><p>{row.produto_nome}</p>
                                            </div>
                                            <div className='flex items-start justify-start gap-2 py-3'>
                                                <p className='font-semibold'>Cliente: </p><p>{row.cliente_nome}</p>
                                            </div>
                                            <div className='flex justify-start gap-2 py-3'>
                                                <p className='font-semibold'>Tipo de Chamado: </p><p>{row.tipo_chamado}</p>
                                            </div>
                                            <div className='flex flex-col items-start justify-start py-3 gap-2'>
                                                <p className="font-semibold">Problema:</p><p>{row.cha_descricao}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            ))}
                    </Carousel>
                </div>

                <div className="col-span-1 row-span-2 flex flex-col justify-center">
                    <div className="bg-cinza-200 h-1/3 p-4">
                        <div className='text-4xl text-pec font-bold p-4'>
                            CHAMADOS ABERTOS
                        </div>
                        <div className='p-4 rounded bg-white shadow shadow-black border-1 border-cinza-300 flex justify-around max-w-[840px] max-h-[300px]'>
                            <div className='flex flex-col items-center'>
                                <p className='text-3xl text-pec font-bold'>DENTRO DO PLANO</p>
                                <div className='text-7xl text-no_plano font-bold'>
                                    {dadosChamado.filter((row: any) => (row.cha_status === 1) && (row.cha_plano === 1)).length}
                                </div>
                            </div>

                            <div className='flex flex-col items-center'>
                                <p className='text-3xl text-pec font-bold'>FORA DO PLANO</p>
                                <div className='text-7xl text-yellow-500 font-bold'>
                                    {dadosChamado.filter((row: any) => (row.cha_status === 1) && (row.cha_plano === 0)).length}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-cinza-200 h-1/3 p-4">
                        <div className='text-4xl text-pec font-bold pb-4 px-4'>
                            ÍNDICES
                        </div>
                        <div className='p-4 rounded bg-white shadow shadow-black border-1 border-cinza-300 flex justify-around max-w-[840px] max-h-[400px]'>
                            <Carousel controls={false} interval={10000} wrap={true} variant="dark" indicators={false}>
                                <Carousel.Item>
                                    <div className="flex justify-around w-full">
                                        <div className="w-1/3 relative">
                                            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                                                <h1 className='font-semibold text-lg mb-4 text-gray-800'>DIÁRIO</h1>
                                                <table className="w-full">
                                                    <tbody>
                                                        <tr>
                                                            <td className="text-gray-600 text-sm pr-4 pb-2">Chamados Atendidos:</td>
                                                            <td className="font-semibold text-xl text-pec pb-2">{dadosIndicesDiario && dadosIndicesDiario.dailyTotalCalls}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-gray-600 text-sm pr-4 pb-2">Tempo Médio de Atendimento:</td>
                                                            <td className="font-semibold text-xl text-pec pb-2">{dadosIndicesDiario && dadosIndicesDiario.dailyAvgAnswering}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-gray-600 text-sm pr-4 pb-2">Tempo Médio de Atraso:</td>
                                                            <td className="font-semibold text-xl text-pec pb-2">{dadosIndicesDiario && dadosIndicesDiario.dailyAvgLate}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-gray-600 text-sm pr-4">Uptime de Teste:</td>
                                                            <td className="font-semibold text-xl text-pec">{dadosIndicesDiario && dadosIndicesDiario.dailyUpTime}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="w-1/3">
                                            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                                                <h1 className='font-semibold text-lg mb-4 text-gray-800'>SEMANAL</h1>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col">
                                                        <p className="text-gray-600 text-sm mb-1">Chamados Atendidos:</p>
                                                        <p className="font-semibold text-xl text-pec">{dadosIndicesDiario && dadosIndicesDiario.dailyTotalCalls}</p>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-gray-600 text-sm mb-1">Tempo Médio de Atendimento:</p>
                                                        <p className="font-semibold text-xl text-pec">{dadosIndicesDiario && dadosIndicesDiario.dailyAvgAnswering}</p>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-gray-600 text-sm mb-1">Tempo Médio de Atraso:</p>
                                                        <p className="font-semibold text-xl text-pec">{dadosIndicesDiario && dadosIndicesDiario.dailyAvgLate}</p>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-gray-600 text-sm mb-1">Uptime de Teste:</p>
                                                        <p className="font-semibold text-xl text-pec">{dadosIndicesDiario && dadosIndicesDiario.dailyUpTime}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-1/3">
                                            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                                                <h1 className='font-semibold text-lg mb-4 text-gray-800'>MENSAL</h1>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col">
                                                        <p className="text-gray-600 text-sm mb-1">Chamados Atendidos:</p>
                                                        <p className="font-semibold text-xl text-pec">{dadosIndicesDiario && dadosIndicesDiario.dailyTotalCalls}</p>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-gray-600 text-sm mb-1">Tempo Médio de Atendimento:</p>
                                                        <p className="font-semibold text-xl text-pec">{dadosIndicesDiario && dadosIndicesDiario.dailyAvgAnswering}</p>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-gray-600 text-sm mb-1">Tempo Médio de Atraso:</p>
                                                        <p className="font-semibold text-xl text-pec">{dadosIndicesDiario && dadosIndicesDiario.dailyAvgLate}</p>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-gray-600 text-sm mb-1">Uptime de Teste:</p>
                                                        <p className="font-semibold text-xl text-pec">{dadosIndicesDiario && dadosIndicesDiario.dailyUpTime}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>

                    {/* <div className="bg-cinza-200 h-1/3 p-4">
                        <div className='text-4xl text-pec font-bold pl-4'>
                            AVISOS
                        </div>
                        <div className='p-4 rounded bg-white shadow shadow-black border-1 border-cinza-300 flex justify-around max-w-[840px]'>
                            <div className='flex flex-col items-center'>
                                <p className='text-3xl text-pec font-bold'>DENTRO DO PLANO</p>
                                <div className='text-9xl text-no_plano font-bold'>
                                    {dadosChamado.filter((row: any) => (row.cha_status === 1) && (row.cha_plano === 1)).length}
                                </div>
                            </div>

                            <div className='flex flex-col items-center'>
                                <p className='text-3xl text-pec font-bold'>FORA DO PLANO</p>
                                <div className='text-9xl text-yellow-500 font-bold'>
                                    {dadosChamado.filter((row: any) => (row.cha_status === 1) && (row.cha_plano === 0)).length}
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>

            {showSidebar && (
                <div className='backdrop-blur-xs fixed inset-y-0 w-screen z-50'>
                    <Sidebar />
                    <button
                        onClick={() => setShowSidebar(false)}
                        className='absolute top-5 left-5 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )
            }
        </>
    );
}