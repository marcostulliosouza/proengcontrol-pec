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
import { IoMenu, IoDocumentOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

function Row(props: any) {
    const { row } = props;

    return (
        <React.Fragment>
            <TableRow>
                <TableCell className="border-2 border-gray-300">
                    <p className={`mobile:text-xs flex justify-center items-center rounded p-2 font-semibold mobile:w-17 w-full 
                    ${row.dis_status === 1 ? 'bg-red-600 text-gray-100' : row.dis_status === 2 ? 'bg-green-600' : 'bg-yellow-400'}`}>
                        {row.dis_id}
                    </p>
                </TableCell>
                <TableCell className="border-2 border-gray-300 flex items-center justify-center text-center w-10">
                    <IoDocumentOutline className={`scale-150 ${row.dis_doc_enviado === 0 ? 'text-red-600' : 'text-green-600'}`} />
                </TableCell>
                <TableCell className="border-2 border-gray-300">
                    <p className='text-start'>{row.dis_descricao}</p>
                </TableCell>
                <TableCell className="border-2 border-gray-300">
                    <p className='text-start'>{row.dis_cliente}</p>
                </TableCell>
                <TableCell className="border-2 border-gray-300">
                    <p className='text-start'>{row.dis_codigo_sap}</p>
                </TableCell>
                <TableCell className="border-2 border-gray-300">
                    <p className='text-start'>{row.dis_nota_fiscal_atual}</p>
                </TableCell>
                <TableCell className="border-2 border-gray-300">
                    <p className='text-start'>{row.dis_observacao}</p>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export function ConsultarDispositivos() {
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
                const responseDispositivos = await fetch('http://172.17.4.23:5000/api/dispositivos');
                if (responseDispositivos.ok) {
                    const dataDispositivos = await responseDispositivos.json();

                    // Clientes
                    const responseClientes = await fetch('http://172.17.4.23:5000/api/clientes');
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

                    // Notas Fiscais
                    const responseEntradaSaidaEquipamento = await fetch('http://172.17.4.23:5000/api/entradaSaidaEquipamento');
                    const responseNotasFiscais = await fetch('http://172.17.4.23:5000/api/notasFiscais');
                    if (responseEntradaSaidaEquipamento.ok && responseNotasFiscais.ok) {
                        const dataEntradaSaidaEquipamento = await responseEntradaSaidaEquipamento.json();
                        const dataNotasFiscais = await responseNotasFiscais.json();

                        // Cria um mapa para as notas fiscais
                        const notasFiscaisMap = dataNotasFiscais.reduce((map: any, notaFiscal: any) => {
                            map[notaFiscal.nof_id] = notaFiscal.nof_numero;
                            return map;
                        }, {});

                        // Cria um mapa para as entradas de equipamento
                        const entradaEquipamentoMap = dataEntradaSaidaEquipamento.reduce((map: any, entrada: any) => {
                            map[entrada.ese_dispositivo] = notasFiscaisMap[entrada.ese_nota_fiscal_entrada];
                            return map;
                        }, {});

                        // Atualiza os dispositivos com os números das notas fiscais
                        const updatedDispositivos = dataDispositivos.map((dispositivo: any) => {
                            if (entradaEquipamentoMap[dispositivo.dis_id]) {
                                dispositivo.dis_nota_fiscal_atual = entradaEquipamentoMap[dispositivo.dis_id];
                            } else {
                                dispositivo.dis_nota_fiscal_atual = 'Sem nota fiscal de entrada';
                            }

                            return dispositivo;
                        });
                        setDispositivos(updatedDispositivos);

                        // Cria um mapa para as notas fiscais de saidas
                        const saidaEquipamentoMap = dataEntradaSaidaEquipamento.reduce((map: any, saida: any) => {
                            map[saida.ese_dispositivo] = saida.ese_numero_nota_fiscal_saida;
                            return map;
                        }, {});

                        // Atualiza os dispositivos com as notas fiscais de saída
                        const updatedSaidaDispositivos = dataDispositivos.map((dispositivo: any) => {
                            if (saidaEquipamentoMap[dispositivo.dis_id]) {
                                dispositivo.dis_observacao = saidaEquipamentoMap[dispositivo.dis_id];
                            } else {
                                dispositivo.dis_observacao = 'Sem nota fiscal de saída';
                            }

                            return dispositivo;
                        });
                        setDispositivos(updatedSaidaDispositivos);

                    } else {
                        console.error('Erro ao buscar as notas fiscais: ', responseEntradaSaidaEquipamento.statusText);
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
        const aux = (event.target.value)
        console.log(aux)
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
                            <p className='mobile:text-sm mobile:absolute mobile:right-0 mobile:mr-4 mobile:w-24 mobile:text-center mobile:mb-5'>Consultar Dispositivos</p>
                        </div>
                        <HelloUser />
                    </div>
                </div>
            </div>
            <div className='bg-cinza-200 mobile:px-0'>
                <div className='bg-cinza-200 mx-10 mobile:mx-3 h-5/6'>
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
                                    <TableCell />
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
                                    <TableCell className='align-top'>
                                        <p className='font-bold text-base text-start text-pec'>NF de Entrada</p>
                                    </TableCell>
                                    <TableCell className='align-top'>
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
                        className='absolute top-12 left-12 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )}
        </div>
    )
}