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
                    <p className={`mobile:text-xs flex justify-center items-center rounded p-2 font-semibold mobile:w-17 w-[80px] 
                    ${row.dis_status === 1 ? 'bg-red-600 text-gray-100' : row.dis_status === 2 ? 'bg-green-600' : 'bg-yellow-400'}`}>
                        {row.dis_id}
                    </p>
                </TableCell>
                <TableCell>
                    <p className='text-start'>{row.dis_descricao}</p>
                </TableCell>
                <TableCell>
                    <p className='text-start'>{row.dis_cliente}</p>
                </TableCell>
                <TableCell>
                    <p className='text-start'>{row.dis_codigo_sap}</p>
                </TableCell>
                <TableCell>
                    <p className='text-start'>{row.dis_nota_fiscal_atual}</p>
                </TableCell>
                <TableCell>
                    <p className='text-start'>{row.cmp_observacao}</p>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export function ListarDispositivos() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [dispositivos, setDispositivos] = useState([]);
    const [pesqDispositivosID, setPesqDispositivosID] = useState('');
    const [pesqDispositivosDesc, setPesqDispositivosDesc] = useState('');
    const [pesqDispositivosCli, setPesqDispositivosCli] = useState('');
    const [pesqDispositivosSAP, setPesqDispositivosSAP] = useState('');

    useEffect(() => {
        const fetchDispositivos = async () => {
            try {
                // Dispositivos
                const responseDispositivos = await fetch('http://127.0.0.1:5000/api/dispositivos');
                if (responseDispositivos.ok) {
                    const dataDispositivos = await responseDispositivos.json();

                    // Clientes
                    const responseClientes = await fetch('http://127.0.0.1:5000/api/clientes');
                    if (responseClientes.ok) {
                        const dataClientes = await responseClientes.json();

                        // Cria um mapa para os clientes
                        const clientesMap = dataClientes.reduce((map: any, cliente: any) => {
                            map[cliente.cli_id] = cliente.cli_nome;
                            return map;
                        }, {});

                        // Atualiza os dispositivos com os nomes dos proprietários
                        const updatedDispositivos = dataDispositivos.map((dispositivo: any) => {
                            if (clientesMap[dispositivo.dis_cliente]) {
                                dispositivo.dis_cliente = clientesMap[dispositivo.dis_cliente];
                            } else {
                                dispositivo.dis_cliente = 'HI-MIX';
                            }
                            return dispositivo;
                        });

                        setDispositivos(updatedDispositivos);
                    } else {
                        console.error('Erro ao buscar clientes: ', responseClientes.statusText);
                    }

                } else {
                    console.error('Erro ao buscar os dispositivos: ', responseDispositivos.statusText);
                }
            } catch (error) {
                console.error("Erro fetching dados: ", error)
            }
        };
        fetchDispositivos();
    }, []);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChangeID = (event: any) => {
        setPesqDispositivosID(event.target.value);
        setPage(0);
    };

    const handleSearchChangeDesc = (event: any) => {
        setPesqDispositivosDesc(event.target.value);
        setPage(0);
    };

    const handleSearchChangeCli = (event: any) => {
        setPesqDispositivosCli(event.target.value);
        setPage(0);
    };

    const handleSearchChangeSAP = (event: any) => {
        setPesqDispositivosSAP(event.target.value);
        setPage(0);
    };

    const filteredDispositivos = dispositivos.filter((dispositivo: any) =>
        dispositivo.dis_id.toString().includes(pesqDispositivosID.toString()) &&
        dispositivo.dis_descricao.toLowerCase().includes(pesqDispositivosDesc.toLowerCase()) &&
        dispositivo.dis_cliente.toLowerCase().includes(pesqDispositivosCli.toLowerCase()) &&
        dispositivo.dis_codigo_sap.toString().includes(pesqDispositivosSAP.toString())
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
                            <p>Listar Dispositivos</p>
                        </div>
                        <HelloUser />
                    </div>
                </div>
            </header>
            <div className='bg-cinza-200 mobile:px-3'>
                <div className='bg-cinza-200 mx-10 h-5/6'>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#d9d9d9' }}>
                                <TableRow>
                                    <TableCell className='w-[156px]'>
                                        <p className='font-bold text-base text-start text-pec'>Identificação</p>
                                        <div className='mb-4'>
                                            <input
                                                type="text"
                                                value={pesqDispositivosID}
                                                onChange={handleSearchChangeID}
                                                placeholder="Pesquisar por ID"
                                                className="p-2 border border-black rounded w-full"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Descrição</p>
                                        <div className='mb-4'>
                                            <input
                                                type="text"
                                                value={pesqDispositivosDesc}
                                                onChange={handleSearchChangeDesc}
                                                placeholder="Pesquisar por Descrição"
                                                className="p-2 border border-black rounded w-full"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Proprietário</p>
                                        <div className='mb-4'>
                                            <input
                                                type="text"
                                                value={pesqDispositivosCli}
                                                onChange={handleSearchChangeCli}
                                                placeholder="Pesquisar por Proprietário"
                                                className="p-2 border border-black rounded w-full"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Código SAP</p>
                                        <div className='mb-4'>
                                            <input
                                                type="text"
                                                value={pesqDispositivosSAP}
                                                onChange={handleSearchChangeSAP}
                                                placeholder="Pesquisar por Código SAP"
                                                className="p-2 border border-black rounded w-full"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>NF de Entrada</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>NF de Saída</p>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredDispositivos
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
                        count={filteredDispositivos.length}
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
                        className='absolute top-5 left-5 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )}
        </div>
    )
}