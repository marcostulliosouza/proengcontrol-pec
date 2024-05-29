import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
// Componentes
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';

// Icones
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

function Row(props: any) {
    const { row } = props;

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <p className='text-start'>{row.cmp_identificacao}</p>
                </TableCell>
                <TableCell>
                    <p className='text-start'>{row.cmp_localizacao}</p>
                </TableCell>
                <TableCell>
                    <p className='text-start'>{row.cmp_proprietario}</p>
                </TableCell>
                <TableCell>
                    <p className='text-start'>{row.cmp_etapa_teste}</p>
                </TableCell>
                <TableCell>
                    <p className='text-start'>{row.cmp_sis_operacional}</p>
                </TableCell>
                <TableCell>
                    <p className='text-start'>{row.cmp_observacao}</p>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export function ConsultarComputadores() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [computadores, setComputadores] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [pesqComputador, setPesqComputador] = useState('');

    useEffect(() => {
        const fetchComputadores = async () => {
            try {
                const responseComputadores = await fetch('http://127.0.0.1:5000/api/computadores');
                if (responseComputadores.ok) {
                    const data = await responseComputadores.json();
                    setComputadores(data);
                } else {
                    console.error('Erro ao buscar os computadores: ', responseComputadores.statusText);
                }
            } catch (error) {
                console.error("Erro fetching dados: ", error)
            }
        };
        fetchComputadores();
    }, []);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event: any) => {
        setPesqComputador(event.target.value);
        setPage(0);
    };

    const filteredComputadores = computadores.filter((computador: any) =>
        computador.cmp_identificacao.toLowerCase().includes(pesqComputador.toLowerCase())
    );

    return (
        <div className='w-screen h-screen'>
            <header className="grid grid-rows-1 bg-cinza-200 h-1/6">
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
                            <p>Consultar Computadores</p>
                        </div>
                        <HelloUser />
                    </div>
                </div>
            </header>
            <body className='bg-cinza-200 mobile:px-3 h-5/6'>
                <div className='mb-4 mx-10'>
                    <input
                        type="text"
                        value={pesqComputador}
                        onChange={handleSearchChange}
                        placeholder="Pesquisar"
                        className="p-2 border border-black rounded"
                    />
                </div>
                <div className='bg-cinza-200 mx-10'>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#d9d9d9' }}>
                                <TableRow>
                                    <TableCell>
                                        <p className='font-bold text-base text-start'>Identificação</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start'>Localização</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start'>Proprietário</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start'>Etapa de Teste</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start'>Produtos Relacionados</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start'>Observação</p>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredComputadores
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: any) => (
                                        <Row key={row.cmp_id} row={row} />
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={filteredComputadores.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Linhas por página"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    />
                </div>
            </body>

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
            )}
        </div>
    )
}