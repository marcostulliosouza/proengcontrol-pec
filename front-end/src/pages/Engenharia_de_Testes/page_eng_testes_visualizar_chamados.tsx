import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

// Icons
import logo from "../../assets/icon_pec.svg"
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

// Componentes
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';

function Row(props: any) {
    const { row } = props;
    const [tempoInicioAtendimento, setTempoInicioAtendimento] = React.useState<Date | null>(null);

    const calculateDuration = (start: string) => {
        const startDate = new Date(start);
        const currentDate = new Date();
        const duration = currentDate.getTime() - startDate.getTime();

        const hours = Math.floor(duration / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((duration % (1000 * 60)) / 1000).toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        if (row.cha_status === 2 && !tempoInicioAtendimento) {
            setTempoInicioAtendimento(new Date());
        }
    }, [row.cha_status]);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset', fontSize: '16px' } }}>
                <TableCell align="left" sx={{ display: 'flex', alignItems: 'center', borderBottom: 'unset', margin: '8px' }}>
                    <span
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor:
                                row.cha_plano === 1
                                    ? '#DB2E2A'
                                    : row.cha_plano === 0
                                        ? '#FFCC6D'
                                        : '#3366FF',
                            border: '1px solid black',
                        }}
                    ></span>
                </TableCell>
                <TableCell align="left">{calculateDuration(row.cha_data_hora_abertura)}</TableCell>
                <TableCell align="left">{row.tipo_chamado}</TableCell>
                <TableCell align="left">{row.produto_nome}</TableCell>
                <TableCell align="left">{row.cliente_nome}</TableCell>
                <TableCell align="left">{row.cha_local}</TableCell>
            </TableRow>
        </React.Fragment >
    );
}

export function VisualizarChamados() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [dados, setDados] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/visualizar_chamados');
                console.log('resposta', response);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setDados(data);
                } else {
                    console.error('Erro ao buscar dados: ', response.statusText);
                }
            } catch (error) {
                console.error("Erro fetching dados: ", error)
            }
        };
        fetchData();

        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const calculateDurationAtendimento = (start: string) => {
        if (!start) {
            return '00:00:00'
        }

        const startDate = new Date(start);
        const currentDate = new Date();
        const duration = currentDate.getTime() - startDate.getTime();

        const hours = Math.floor(duration / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((duration % (1000 * 60)) / 1000).toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <>
            <div className="bg-cinza-200 fixed inset-y-0 w-screen" />
            <header className='absolute top-0 left-0 p-10 flex justify-between gap-4 items-start w-screen'>
                <div className='inline-flex items-start gap-4'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                    <div className="grid justify-items-center items-center text-pec font-semibold">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="PEC" />
                            <h1 className='text-xl'>PEC</h1>
                        </div>
                        <p className='text-sm'>ProEngControl</p>
                    </div>
                    <div className='flex flex-col ml-8 mt-3 gap-3'>
                        <div className='inline-flex items-center gap-2 content font-bold text-pec'>
                            <Link to={"/menu"} className='inline-flex items-center gap-2'>
                                <FaHome />
                                <p>Menu</p>
                            </Link>
                            <IoIosArrowForward />
                            <Link to={"/engenharia_testes"}>
                                <p>Engenharia de Testes</p>
                            </Link>
                            <IoIosArrowForward />
                            <p>Visualizar Chamados</p>
                        </div>
                        {/* <HelloUser user={localStorage.getItem("user")} /> */}
                    </div>
                </div>
            </header>
            <body className='grid grid-cols-2 gap-4 mt-24'>
                <div className='z-10 w-[840px]'>
                    <div className='text-4xl py-4 text-pec font-bold p-10 mt-10'>
                        CHAMADOS EM ATENDIMENTO
                    </div>
                    <Carousel
                        pauseOnHover={false}
                        stopOnHover={false}
                        showStatus={false}
                        showThumbs={false}
                        controls={false}
                        infiniteLoop={true}
                        interval={5000}
                        variant="dark"
                    >
                        {dados
                            .filter((row: any) => row.cha_status === 2)
                            .map((row: any) => (
                                <Carousel.Item>
                                    <div className='ml-10 px-10 pb-10 rounded bg-white shadow shadow-black border-1 border-cinza-300 h-[740px]' key={row.cha_id}>
                                        <p className='font-semibold text-4xl py-10'>Responsável: {row.responsavel}</p>
                                        <p className={`flex justify-center items-center rounded p-2 text-gray-100 text-9xl ${row.cha_plano === 1 ? 'bg-no_plano' : row.cha_plano === 0 ? 'bg-fora_plano' : 'bg-engenharia'
                                            }`} style={{ textShadow: '2px 2px 2px black' }}>{calculateDurationAtendimento(row.cha_data_hora_atendimento)}</p>
                                        <div className="text-3xl pt-10">
                                            <div className='flex justify-between'>
                                                <div className='flex items-start justify-start gap-2 py-3'>
                                                    <p className='font-semibold'>Produto:</p><p>{row.produto_nome}</p>
                                                </div>
                                                <div className='flex items-start justify-start gap-2 py-3'>
                                                    <p className='font-semibold'>Cliente: </p><p>{row.cliente_nome}</p>
                                                </div>
                                            </div>
                                            <div className='flex items-start justify-start gap-2 py-3'>
                                                <p className='font-semibold'>Local: </p><p>{row.cha_local}</p>
                                            </div>
                                            <div className='flex justify-start gap-2 py-3'>
                                                <p className='font-semibold'>Tipo de Chamado: </p><p>{row.tipo_chamado}</p>
                                            </div>
                                            <div className='flex flex-col items-start justify-start py-3 gap-2'>
                                                <p className="font-semibold">Problema:</p>
                                                <p className='text-2xl font-medium'>{row.cha_descricao}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            ))}
                    </Carousel>
                </div>

                <div className="absolute right-0 p-10">
                    <div className='text-4xl py-4 text-pec font-bold'>
                        CHAMADOS EM ABERTO
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead sx={{ backgroundColor: '#d9d9d9' }}>
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Tipo</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Duração Total</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Tipo de Chamado</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Produto</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Cliente</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Local</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dados
                                    .filter((row: any) => row.cha_status === 1)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: any) => (
                                        <Row key={row.cha_id} row={row} />
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={dados.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Linhas por página"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    />
                </div >
            </body >


            {showSidebar && (
                <div className='backdrop-blur-xs fixed inset-y-0 w-screen z-50'>
                    <Sidebar />
                    <button
                        onClick={() => setShowSidebar(false)}
                        className='absolute top-10 left-10 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )
            }
        </>
    );
}