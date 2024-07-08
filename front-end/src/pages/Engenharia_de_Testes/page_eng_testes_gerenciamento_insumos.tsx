import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
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

export function GerenciamentoInsumos() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
        const aux = (event.target.value)
        console.log(aux)
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                                <p className='mobile:text-sm mobile:absolute mobile:right-0 mobile:mr-4 mobile:w-24 mobile:text-center'>Gerenciamento de Insumos</p>
                            </div>
                            <HelloUser />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-cinza-200 h-5/6'>
                <div className='bg-cinza-200 px-4'>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#d9d9d9' }}>
                                <TableRow>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Código SAP</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Descrição</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Família</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Exclusivo</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Posição</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Preço Unitário</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Quantidade</p>
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            {/* <TableBody>
                                {filteredComputadores
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: any) => (
                                        <Row key={row.cmp_id} row={row} />
                                    ))}
                            </TableBody> */}
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Linhas por página"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    />
                </div>
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
        </div>
    )
}