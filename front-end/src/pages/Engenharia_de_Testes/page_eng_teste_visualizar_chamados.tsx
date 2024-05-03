import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Icons
import logo from "../../assets/icon_pec.svg"
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

// Componentes
import { Sidebar } from '../../components/sidebar';

function Row(props: any) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
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
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
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
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detalhes
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Descrição</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Operador</Typography>
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.cha_produto}>
                                        <TableCell align="left">{row.cha_descricao}</TableCell>
                                        <TableCell align="left">{row.cha_operador}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
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

    return (
        <>
            <div className="bg-cinza-200 fixed inset-y-0 w-screen" />
            <header className='absolute top-10 left-10 flex items-start gap-4 items-start'>
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
                    <div className='ml-8 mt-3 inline-flex items-center gap-2 content font-bold text-pec'>
                        <Link to={"/menu"}>
                            <p>Menu</p>
                        </Link>
                        <IoIosArrowForward />
                        <Link to={"/engenharia_testes"}>
                            <p>Engenharia de Testes</p>
                        </Link>
                        <IoIosArrowForward />
                        <p>Visualizar Chamados</p>
                    </div>
            </header>
            <body className='grid grid-cols-2 gap-4 mt-24'>
                <div className='text-4xl py-4 text-pec font-bold z-10 p-10 mt-10'>
                    CHAMADOS EM ATENDIMENTO
                </div>

                <div className="absolute right-0 p-10">
                    <div className='text-4xl py-4 text-pec font-bold'>
                        CHAMADOS EM ABERTO
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead sx={{ backgroundColor: '#d9d9d9' }}>
                                <TableRow>
                                    <TableCell />
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
            </body>


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
            )}
        </>
    );
}