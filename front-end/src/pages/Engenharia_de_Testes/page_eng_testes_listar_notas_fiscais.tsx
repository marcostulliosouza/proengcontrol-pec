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
import { format, parseISO } from 'date-fns';
import { Button, Checkbox } from '@mui/material';

// Componentes
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';

// Icones
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdUploadFile } from "react-icons/md";

function Row(props: any) {
    const { row } = props;

    return (
        <React.Fragment>
            <TableRow className={`font-normal ${row.nof_com_retorno === 1 ? 'bg-green-200' : 'bg-white'}`}>
                <TableCell className="border-2 border-gray-300 w-[180px]">
                    <p className='text-center'>{row.nof_numero}</p>
                </TableCell>
                <TableCell className="border-2 border-gray-300">
                    <p className='text-start'>{row.nof_cliente}</p>
                </TableCell>
                <TableCell className="border-2 border-gray-300 w-[180px]">
                    <p className='text-center'>{row.nof_doc_sap}</p>
                </TableCell>
                <TableCell className="border-2 border-gray-300">
                    <p className='text-center'>{row.nof_data_hora_cadastro}</p>
                </TableCell>
                <TableCell className="border-2 border-gray-300">
                    <p className='text-center'>{row.nof_data_retorno}</p>
                </TableCell>
                <TableCell className="border-2 border-gray-300">

                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export function ListarNotasFiscais() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [notasFiscais, setNotasFiscais] = useState([]);
    const [pesqNotasNum, setPesqNotasNum] = useState('');
    const [pesqNotasCli, setPesqNotasCli] = useState('');
    const [pesqNotasDocSAP, setPesqNotasDocSAP] = useState('');
    const [pesqNotasDataCadastro, setPesqNotasDataCadastro] = useState('');
    const [pesqNotasDataRetorno, setPesqNotasDataRetorno] = useState('');
    const [showWithReturnDate, setShowWithReturnDate] = useState(false);

    useEffect(() => {
        const fetchDispositivos = async () => {
            try {
                // Notas fiscais
                const responseNotasFiscais = await fetch('http://127.0.0.1:5000/api/notasFiscais');
                if (responseNotasFiscais.ok) {
                    const dataNotasFiscais = await responseNotasFiscais.json();

                    // Clientes
                    const responseClientes = await fetch('http://127.0.0.1:5000/api/clientes');
                    if (responseClientes.ok) {
                        const dataClientes = await responseClientes.json();

                        // Cria um mapa para os clientes
                        const clientesMap = dataClientes.reduce((map: any, cliente: any) => {
                            map[cliente.cli_id] = cliente.cli_nome;
                            return map;
                        }, {});

                        // Atualiza as notas fiscais com os nomes dos clientes
                        const updatedNotasFiscais = dataNotasFiscais.map((notaFiscal: any) => {
                            if (clientesMap[notaFiscal.nof_cliente]) {
                                notaFiscal.nof_cliente = clientesMap[notaFiscal.nof_cliente];
                            } else {
                                notaFiscal.nof_cliente = 'HI-MIX';
                            }

                            // Formatar a data de cadastro
                            if (notaFiscal.nof_data_hora_cadastro) {
                                const parsedDate = parseISO(notaFiscal.nof_data_hora_cadastro);
                                notaFiscal.nof_data_hora_cadastro = format(parsedDate, 'dd/MM/yyyy');
                            }

                            // Formatar a data de retorno
                            if (notaFiscal.nof_data_retorno) {
                                const parsedDate = parseISO(notaFiscal.nof_data_retorno);
                                console.log('parsedDate: ', notaFiscal.nof_data_retorno);
                                notaFiscal.nof_data_retorno = format(parsedDate, 'dd/MM/yyyy');
                            } else {
                                notaFiscal.nof_data_retorno = 'Sem data de retorno';
                            }

                            return notaFiscal;
                        });

                        setNotasFiscais(updatedNotasFiscais);
                    } else {
                        console.error('Erro ao buscar clientes: ', responseClientes.statusText);
                    }
                } else {
                    console.error('Erro ao buscar as notas fiscais: ', responseNotasFiscais.statusText);
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

    const handleSearchChangeNum = (event: any) => {
        setPesqNotasNum(event.target.value);
        setPage(0);
    };

    const handleSearchChangeCli = (event: any) => {
        setPesqNotasCli(event.target.value);
        setPage(0);
    };

    const handleSearchChangeDocSAP = (event: any) => {
        setPesqNotasDocSAP(event.target.value);
        setPage(0);
    };

    const handleSearchChangeDataCadastro = (event: any) => {
        setPesqNotasDataCadastro(event.target.value);
        setPage(0);
    };

    const handleSearchChangeDataRetorno = (event: any) => {
        setPesqNotasDataRetorno(event.target.value);
        setPage(0);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowWithReturnDate(event.target.checked);
    };

    const filteredNotasFiscais = notasFiscais.filter((notaFiscal: any) =>
        notaFiscal.nof_numero.toString().includes(pesqNotasNum.toString()) &&
        notaFiscal.nof_cliente.toLowerCase().includes(pesqNotasCli.toLowerCase()) &&
        notaFiscal.nof_doc_sap.toLowerCase().includes(pesqNotasDocSAP.toLowerCase()) &&
        notaFiscal.nof_data_hora_cadastro.toLowerCase().includes(pesqNotasDataCadastro.toLowerCase()) &&
        notaFiscal.nof_data_retorno.toLowerCase().includes(pesqNotasDataRetorno.toLowerCase())
    );

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
                                <p className='mobile:text-sm mobile:absolute mobile:right-0 mobile:mr-4 mobile:w-24 mobile:text-center mobile:mb-5'>Listar Notas Fiscais</p>
                            </div>
                            <HelloUser />
                        </div>
                        <Link to={"/engenharia_testes/listar_notas_fiscais/adicionar_nota"} className='mobile:hidden'>
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
                                <MdUploadFile />
                                Adicionar Nota Fiscal
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='bg-cinza-200'>
                <div className='bg-cinza-200 w-screen px-4'>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#d9d9d9' }}>
                                <TableRow>
                                    <TableCell className='w-[180px]'>
                                        <p className='font-bold text-base text-center text-pec'>Número da Nota</p>
                                        <div className='mb-4'>
                                            <input
                                                type="text"
                                                value={pesqNotasNum}
                                                onChange={handleSearchChangeNum}
                                                placeholder="Pesquisar por Núm."
                                                className="p-2 border border-black rounded w-full text-center"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Cliente</p>
                                        <div className='mb-4'>
                                            <input
                                                type="text"
                                                value={pesqNotasCli}
                                                onChange={handleSearchChangeCli}
                                                placeholder="Pesquisar por Cliente"
                                                className="p-2 border border-black rounded w-full text-center"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className='w-[180px]'>
                                        <p className='font-bold text-base text-center text-pec'>Número Doc. SAP</p>
                                        <div className='mb-4'>
                                            <input
                                                type="text"
                                                value={pesqNotasDocSAP}
                                                onChange={handleSearchChangeDocSAP}
                                                placeholder="Pesquisar por Núm. Doc. SAP"
                                                className="p-2 border border-black rounded w-full text-center"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-center text-pec'>Data de Cadastro</p>
                                        <div className='mb-4'>
                                            <input
                                                type="text"
                                                value={pesqNotasDataCadastro}
                                                onChange={handleSearchChangeDataCadastro}
                                                placeholder="Pesquisar por Data de Cadastro"
                                                className="p-2 border border-black rounded w-full text-center"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-center text-pec'>Data de Retorno</p>
                                        <div className='mb-4'>
                                            <input
                                                type="text"
                                                value={pesqNotasDataRetorno}
                                                onChange={handleSearchChangeDataRetorno}
                                                placeholder="Pesquisar por Data de Retorno"
                                                className="p-2 border border-black rounded w-full text-center"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className='inline-flex text-center align-top'>
                                        <p className='font-bold text-base text-pec'>Com Data de Retorno</p>
                                        <Checkbox
                                            checked={showWithReturnDate}
                                            onChange={handleCheckboxChange}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredNotasFiscais
                                    .filter((notaFiscal: any) => !showWithReturnDate || notaFiscal.nof_data_retorno !== 'Sem data de retorno')
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
                        count={filteredNotasFiscais.length}
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