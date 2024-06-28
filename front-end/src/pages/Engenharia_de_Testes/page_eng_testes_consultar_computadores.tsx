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
                <TableCell className='border-2 border-gray-300'>
                    <p className='text-start'>PC-{row.cmp_identificacao}</p>
                </TableCell>
                <TableCell className='border-2 border-gray-300'>
                    <p className='text-start'>{row.cmp_localizacao ? row.cmp_localizacao : "DESCONHECIDA"}</p>
                </TableCell>
                <TableCell className='border-2 border-gray-300'>
                    <p className='text-start'>{row.cmp_proprietario}</p>
                </TableCell>
                <TableCell className='border-2 border-gray-300'>
                    <p className='text-start'>{row.cmp_etapa_teste}</p>
                </TableCell>
                <TableCell className='border-2 border-gray-300'>
                    <p className='text-start'>{row.cmp_programas_instalados}</p>
                </TableCell>
                <TableCell className='border-2 border-gray-300'>
                    <p className='text-start'>{row.cmp_observacao}</p>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export function ConsultarComputadores() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [pesqComputador, setPesqComputador] = useState('');
    const [computadores, setComputadores] = useState([]);

    useEffect(() => {
        const fetchComputadores = async () => {
            try {
                // Computadores
                const responseComputadores = await fetch('http://172.17.12.28:5000/api/computadores');
                if (responseComputadores.ok) {
                    const dataComputadores = await responseComputadores.json();

                    // Clientes
                    const responseClientes = await fetch('http://172.17.12.28:5000/api/clientes');
                    if (responseClientes.ok) {
                        const dataClientes = await responseClientes.json();

                        // Cria um mapa para os clientes
                        const clientesMap = dataClientes.reduce((map: any, cliente: any) => {
                            map[cliente.cli_id] = cliente.cli_nome;
                            return map;
                        }, {});

                        // Atualiza os computadores com os nomes dos proprietários
                        const updatedComputadores = dataComputadores.map((computador: any) => {
                            if (clientesMap[computador.cmp_proprietario]) {
                                computador.cmp_proprietario = clientesMap[computador.cmp_proprietario];
                            }
                            return computador;
                        });

                        setComputadores(updatedComputadores);
                    } else {
                        console.error('Erro ao buscar clientes: ', responseClientes.statusText);
                    }

                    // Produtos e Vinculo de Produtos
                    const responseProdutos = await fetch('http://172.17.12.28:5000/api/produtos');
                    const responseVinculoProdutos = await fetch('http://172.17.12.28:5000/api/vinculoComputadores');
                    if (responseProdutos.ok && responseVinculoProdutos.ok) {
                        const dataProdutos = await responseProdutos.json();
                        const dataVinculoProdutos = await responseVinculoProdutos.json();

                        const updatedComputadores = dataComputadores.map((computador: any) => {
                            // Filtra os produtos vinculados a este computador
                            const produtosVinculados = dataVinculoProdutos
                                .filter((vinculo: any) => vinculo.vcp_computadores_cmp_id === computador.cmp_id)
                                .map((vinculo: any) => {
                                    // Encontra o nome do produto correspondente
                                    const produto = dataProdutos.find((produto: any) => produto.pro_id === vinculo.vcp_produtos_pro_id);
                                    computador.cmp_etapa_teste = computador.cmp_etapa_teste === "GRAVAÇÃO/FUNCIONAL" || computador.cmp_etapa_teste === "GRAVAÇÃO/TESTE" ? computador.cmp_etapa_teste : 
                                                                    vinculo.vcp_etapa_teste === "" || vinculo.vcp_etapa_teste === null && computador.cmp_etapa_teste === "" ? 'NÃO INFORMADO' :
                                                                    vinculo.vcp_etapa_teste === "" || vinculo.vcp_etapa_teste === null && computador.cmp_etapa_teste !== "" ? computador.cmp_etapa_teste :
                                                                    vinculo.vcp_etapa_teste;
                                    return produto ? produto.pro_nome : '';
                                });
                            // Cria uma string com os nomes dos produtos vinculados
                            computador.cmp_programas_instalados = produtosVinculados.join(' | ');
                            return computador;
                        });

                        setComputadores(updatedComputadores);

                    } else {
                        console.error('Erro ao buscar produtos e vinculo de produtos: ', responseProdutos.statusText);
                    }

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
        const aux = (event.target.value)
        console.log(aux)
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
                            <p className='mobile:text-sm mobile:absolute mobile:right-0 mobile:mr-4 mobile:w-24 mobile:text-center mobile:mb-5'>Consultar Computadores</p>
                        </div>
                        <HelloUser />
                    </div>
                </div>
            </div>
            <div className='bg-cinza-200 mobile:px-3 h-5/6'>
                <div className='mb-4 mx-10'>
                    <input
                        type="text"
                        value={pesqComputador}
                        onChange={handleSearchChange}
                        placeholder="Pesquisar por ID"
                        className="p-2 border border-black rounded"
                    />
                </div>
                <div className='bg-cinza-200 mx-10 mobile:mx-0'>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#d9d9d9' }}>
                                <TableRow>
                                    <TableCell className='w-[120px]'>
                                        <p className='font-bold text-base text-start text-pec'>Identificação</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Localização</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Proprietário</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Etapa de Teste</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Produtos Relacionados</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Observação</p>
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