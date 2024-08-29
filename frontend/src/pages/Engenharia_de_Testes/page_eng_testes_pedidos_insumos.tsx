// import { useState } from 'react';
// import { Sidebar } from '../../components/sidebar';
// import { IoMenu } from "react-icons/io5";
// import { HelloUser } from '../../components/hello_user';

// export function SolicitacaoPedidoInsumo() {
//     const [showSidebar, setShowSidebar] = useState(false);
//     const [pedido, setPedido] = useState({
//         insumo: '',
//         quantidade: '',
//         utilizacao: '',
//     });

//     const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
//         const { name, value } = event.target;
//         setPedido({ ...pedido, [name]: value });
//     };

//     const handleSubmit = (event: { preventDefault: () => void; }) => {
//         event.preventDefault();
//         console.log('Pedido Solicitado:', pedido);
//     };

//     return (
//         <div className='w-screen h-screen flex flex-col'>
//             <div className="grid grid-rows-1 bg-cinza-200 p-4">
//                 <div className='inline-flex gap-4'>
//                     <button
//                         onClick={() => setShowSidebar(true)}
//                         className='text-pec text-4xl hover:scale-110 transition duration-200 flex justify-start items-start h-9'>
//                         <IoMenu />
//                     </button>
//                     <HelloUser />
//                 </div>
//             </div>
//             <div className='flex flex-col items-center justify-center h-5/6'>
//                 <form className='w-1/2 bg-white p-4 shadow-lg' onSubmit={handleSubmit}>
//                     <h2 className='text-center font-bold text-xl mb-4'>Solicitação de Pedido de Insumos</h2>
//                     <div className='mb-4'>
//                         <label className='block text-pec mb-2'>Insumo</label>
//                         <input
//                             type="text"
//                             name="insumo"
//                             value={pedido.insumo}
//                             onChange={handleInputChange}
//                             className='w-full border border-gray-300 p-2 rounded-md'
//                         />
//                     </div>
//                     <div className='mb-4'>
//                         <label className='block text-pec mb-2'>Quantidade</label>
//                         <input
//                             type="number"
//                             name="quantidade"
//                             value={pedido.quantidade}
//                             onChange={handleInputChange}
//                             className='w-full border border-gray-300 p-2 rounded-md'
//                         />
//                     </div>
//                     <div className='mb-4'>
//                         <label className='block text-pec mb-2'>Utilização</label>
//                         <textarea
//                             name="utilizacao"
//                             value={pedido.utilizacao}
//                             onChange={handleInputChange}
//                             className='w-full border border-gray-300 p-2 rounded-md'
//                         />
//                     </div>
//                     <button type="submit" className='bg-pec text-white py-2 px-4 rounded-md'>
//                         Solicitar Pedido
//                     </button>
//                 </form>
//             </div>
//             {showSidebar && (
//                 <div className='backdrop-blur-xs fixed inset-y-0 w-screen z-50'>
//                     <Sidebar />
//                 </div>
//             )}
//         </div>
//     );
// }
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

export function SolicitacaoPedidoInsumo() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openDialog, setOpenDialog] = useState(false);
    const [solicitacao, setSolicitacao] = useState({ codigo: '', descricao: '', quantidade: '', data: '', status: '' });

    const handleChangePage = (_event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDialog = () => {
        setSolicitacao({ codigo: '', descricao: '', quantidade: '', data: '', status: '' });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveSolicitacao = () => {
        // Lógica para salvar a solicitação de insumo
        handleCloseDialog();
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
                                <p className='mobile:text-sm mobile:absolute mobile:right-0 mobile:mr-4 mobile:w-24 mobile:text-center'>Solicitação de Insumos</p>
                            </div>
                            <HelloUser />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-cinza-200 h-5/6'>
                <div className='bg-cinza-200 px-4'>
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                        Nova Solicitação
                    </Button>
                    <TableContainer component={Paper} className="mt-4">
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
                                        <p className='font-bold text-base text-start text-pec'>Quantidade</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Data</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-bold text-base text-start text-pec'>Status</p>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {/* <TableBody>
                                {solicitacoes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.codigo}>
                                        <TableCell>{row.codigo}</TableCell>
                                        <TableCell>{row.descricao}</TableCell>
                                        <TableCell>{row.quantidade}</TableCell>
                                        <TableCell>{row.data}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody> */}
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={0} // Atualize com o número real de solicitações
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

            {/* Dialog para solicitar insumo */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{solicitacao.codigo ? 'Editar Solicitação' : 'Nova Solicitação'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="codigo"
                        label="Código SAP"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={solicitacao.codigo}
                        onChange={(e) => setSolicitacao({ ...solicitacao, codigo: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="descricao"
                        label="Descrição"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={solicitacao.descricao}
                        onChange={(e) => setSolicitacao({ ...solicitacao, descricao: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="quantidade"
                        label="Quantidade"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={solicitacao.quantidade}
                        onChange={(e) => setSolicitacao({ ...solicitacao, quantidade: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="data"
                        label="Data"
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={solicitacao.data}
                        onChange={(e) => setSolicitacao({ ...solicitacao, data: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="status"
                        label="Status"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={solicitacao.status}
                        onChange={(e) => setSolicitacao({ ...solicitacao, status: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveSolicitacao} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}