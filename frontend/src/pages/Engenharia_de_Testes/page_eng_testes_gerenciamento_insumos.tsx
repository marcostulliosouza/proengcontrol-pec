// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Table from '@mui/material/Table';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TablePagination from '@mui/material/TablePagination';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import { Sidebar } from '../../components/sidebar';
// import { HelloUser } from '../../components/hello_user';
// import { Logo } from '../../components/logo';
// import { IoMenu } from "react-icons/io5";
// import { IoIosArrowForward } from "react-icons/io";
// import { FaHome } from "react-icons/fa";
// import { Autocomplete, Checkbox, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';

// // Defina uma interface para o insumo
// interface Insumo {
//     codigo: string;
//     descricao: string;
//     familia: string;
//     cliente: string;
//     exclusivo: boolean;
//     posicao: string;
//     preco: string;
//     quantidade: string;
// }

// export function GerenciamentoInsumos() {
//     const [showSidebar, setShowSidebar] = useState(false);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [insumo, setInsumo] = useState<Insumo>({ codigo: '', descricao: '', familia: '', cliente: '', exclusivo: false, posicao: '', preco: '', quantidade: '' });

//     // Mock data para testes
//     const familias = [
//         { label: 'Família 1', id: 1 },
//         { label: 'Família 2', id: 2 },
//         { label: 'Família 3', id: 3 },
//     ];

//     const clientes = [
//         { label: 'Cliente 1', id: 1 },
//         { label: 'Cliente 2', id: 2 },
//         { label: 'Cliente 3', id: 3 },
//     ];

//     const handleChangePage = (_event: any, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event: any) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const handleOpenDialog = () => {
//         setInsumo({ codigo: '', descricao: '', familia: '', cliente: '', exclusivo: false, posicao: '', preco: '', quantidade: '' });
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//     };

//     const handleSaveInsumo = () => {
//         // Lógica para salvar o insumo
//         handleCloseDialog();
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
//                     <Logo />
//                     <div className='inline-flex justify-between w-full'>
//                         <div className='flex-col-1 ml-8 mt-4'>
//                             <div className='inline-flex content font-bold text-pec gap-2 justify-center items-center'>
//                                 <Link to={"/menu"} className='inline-flex items-center gap-2'>
//                                     <FaHome className='mobile:w-0' />
//                                     <p className='mobile:text-[0px]'>Menu</p>
//                                 </Link>
//                                 <IoIosArrowForward className='mobile:w-0' />
//                                 <p className='mobile:text-sm mobile:absolute mobile:right-0 mobile:mr-4 mobile:w-24 mobile:text-center'>Gerenciamento de Insumos</p>
//                             </div>
//                             <HelloUser />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className='bg-cinza-200 h-5/6'>
//                 <div className='bg-cinza-200 px-4'>
//                     <Button variant="contained" color="primary" onClick={handleOpenDialog}>
//                         Adicionar Novo Insumo
//                     </Button>
//                     <TableContainer component={Paper} className="mt-4">
//                         <Table aria-label="simple table">
//                             <TableHead sx={{ backgroundColor: '#d9d9d9' }}>
//                                 <TableRow>
//                                     <TableCell>
//                                         <p className='font-bold text-base text-start text-pec'>Código SAP</p>
//                                     </TableCell>
//                                     <TableCell>
//                                         <p className='font-bold text-base text-start text-pec'>Descrição</p>
//                                     </TableCell>
//                                     <TableCell>
//                                         <p className='font-bold text-base text-start text-pec'>Família</p>
//                                     </TableCell>
//                                     <TableCell>
//                                         <p className='font-bold text-base text-start text-pec'>Exclusivo</p>
//                                     </TableCell>
//                                     <TableCell>
//                                         <p className='font-bold text-base text-start text-pec'>Posição</p>
//                                     </TableCell>
//                                     <TableCell>
//                                         <p className='font-bold text-base text-start text-pec'>Preço Unitário</p>
//                                     </TableCell>
//                                     <TableCell>
//                                         <p className='font-bold text-base text-start text-pec'>Quantidade</p>
//                                     </TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             {/* <TableBody>
//                                 {insumos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//                                     <TableRow key={row.codigo}>
//                                         <TableCell>{row.codigo}</TableCell>
//                                         <TableCell>{row.descricao}</TableCell>
//                                         <TableCell>{row.familia}</TableCell>
//                                         <TableCell>{row.exclusivo}</TableCell>
//                                         <TableCell>{row.posicao}</TableCell>
//                                         <TableCell>{row.preco}</TableCell>
//                                         <TableCell>{row.quantidade}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody> */}
//                         </Table>
//                     </TableContainer>
//                     <TablePagination
//                         rowsPerPageOptions={[5, 10, 20]}
//                         component="div"
//                         count={0} // Atualize com o número real de insumos
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                         labelRowsPerPage="Linhas por página"
//                         labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
//                     />
//                 </div>
//             </div>
//             {showSidebar && (
//                 <div className='backdrop-blur-xs fixed inset-y-0 w-screen z-50'>
//                     <Sidebar />
//                     <button
//                         onClick={() => setShowSidebar(false)}
//                         className='absolute top-6 left-6 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
//                     >
//                         <IoMenu />
//                     </button>
//                 </div>
//             )}

//             {/* Dialog para adicionar/editar insumo */}
//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>{insumo.codigo ? 'Editar Insumo' : 'Adicionar Insumo'}</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 margin="dense"
//                                 id="codigo"
//                                 label="Código SAP"
//                                 type="text"
//                                 fullWidth
//                                 variant="outlined"
//                                 value={insumo.codigo}
//                                 onChange={(e) => setInsumo({ ...insumo, codigo: e.target.value })}
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <FormControl fullWidth margin="dense">
//                                 <Autocomplete
//                                     options={familias} // Array com as opções de família
//                                     getOptionLabel={(option) => option.label}
//                                     value={insumo.familia}
//                                     onChange={(e, newValue) => setInsumo({ ...insumo, familia: newValue })}
//                                     renderInput={(params) => (
//                                         <TextField {...params} label="Família" variant="outlined" required />
//                                     )}
//                                 />
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12} sm={12}>
//                             <TextField
//                                 margin="dense"
//                                 id="descricao"
//                                 label="Descrição"
//                                 type="text"
//                                 fullWidth
//                                 variant="outlined"
//                                 value={insumo.descricao}
//                                 onChange={(e) => setInsumo({ ...insumo, descricao: e.target.value })}
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={3} sm={3}>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         checked={insumo.exclusivo}
//                                         onChange={(e) => setInsumo({ ...insumo, exclusivo: e.target.checked })}
//                                     />
//                                 }
//                                 label="Exclusivo"
//                             />
//                         </Grid>
//                         <Grid item xs={6} sm={9}>
//                             <FormControl fullWidth margin="dense">
//                                 <Autocomplete
//                                     options={clientes} // Array com as opções de clientes
//                                     getOptionLabel={(option) => option.label}
//                                     value={insumo.cliente}
//                                     onChange={(e, newValue) => setInsumo({ ...insumo, cliente: newValue })}
//                                     renderInput={(params) => (
//                                         <TextField {...params} label="Cliente" variant="outlined" disabled={!insumo.exclusivo} />
//                                     )}
//                                 />
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 margin="dense"
//                                 id="posicao"
//                                 label="Posição no Estoque"
//                                 type="text"
//                                 fullWidth
//                                 variant="outlined"
//                                 value={insumo.posicao}
//                                 onChange={(e) => setInsumo({ ...insumo, posicao: e.target.value })}
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 margin="dense"
//                                 id="valor"
//                                 label="Valor Unitário"
//                                 type="number"
//                                 fullWidth
//                                 variant="outlined"
//                                 value={insumo.preco}
//                                 onChange={(e) => setInsumo({ ...insumo, preco: e.target.value })}
//                                 InputProps={{
//                                     startAdornment: <InputAdornment position="start">R$</InputAdornment>,
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 margin="dense"
//                                 id="quantidade"
//                                 label="Quantidade Minima Estoque"
//                                 type="number"
//                                 fullWidth
//                                 variant="outlined"
//                                 value={insumo.quantidade}
//                                 onChange={(e) => setInsumo({ ...insumo, quantidade: e.target.value })}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 margin="dense"
//                                 id="periodo_inventario"
//                                 label="Periodicidade de Inventário (meses)"
//                                 type="number"
//                                 fullWidth
//                                 variant="outlined"
//                                 value={insumo.periodo_inventario}
//                                 onChange={(e) => setInsumo({ ...insumo, periodo_inventario: e.target.value })}
//                             />
//                         </Grid>
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog} color="primary">
//                         Cancelar
//                     </Button>
//                     <Button onClick={handleSaveInsumo} color="primary">
//                         Salvar
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//         </div>
//     );
// }
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination, Paper,
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, Grid, FormControl,
    Autocomplete, Checkbox, FormControlLabel,
    InputAdornment, IconButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

// Interfaces
interface Insumo {
    codigo: string;
    descricao: string;
    familia: string;
    cliente: string;
    exclusivo: boolean;
    posicao: string;
    preco: string;
    quantidade: string;
    periodo_inventario: string;
}

interface PosicaoEstoque {
    id: number;
    nome: string;
    descricao: string;
}

interface FamiliaInsumo {
    id: number;
    nome: string;
}

// Componente principal
export function GerenciamentoEstoque() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openDialog, setOpenDialog] = useState(false);
    const [insumo, setInsumo] = useState<Insumo>({
        codigo: '', descricao: '', familia: '', cliente: '', exclusivo: false,
        posicao: '', preco: '', quantidade: '', periodo_inventario: ''
    });
    const [posicoes, setPosicoes] = useState<PosicaoEstoque[]>([]);
    const [familias, setFamilias] = useState<FamiliaInsumo[]>([]);
    const [clientes, setClientes] = useState<{ label: string, id: number }[]>([]);

    // Mock data para testes
    const mockFamilias = [
        { label: 'Família 1', id: 1 },
        { label: 'Família 2', id: 2 },
        { label: 'Família 3', id: 3 },
    ];

    const mockClientes = [
        { label: 'Cliente 1', id: 1 },
        { label: 'Cliente 2', id: 2 },
        { label: 'Cliente 3', id: 3 },
    ];

    const handleChangePage = (_event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDialog = () => {
        setInsumo({
            codigo: '', descricao: '', familia: '', cliente: '', exclusivo: false,
            posicao: '', preco: '', quantidade: '', periodo_inventario: ''
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveInsumo = () => {
        // Lógica para salvar o insumo
        handleCloseDialog();
    };

    const handleAddPosicao = () => {
        // Lógica para adicionar posição de estoque
    };

    const handleAddFamilia = () => {
        // Lógica para adicionar família de insumo
    };

    const handleEditPosicao = (id: number) => {
        // Lógica para editar posição de estoque
    };

    const handleEditFamilia = (id: number) => {
        // Lógica para editar família de insumo
    };

    const handleDeletePosicao = (id: number) => {
        // Lógica para excluir posição de estoque
    };

    const handleDeleteFamilia = (id: number) => {
        // Lógica para excluir família de insumo
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
                                <p className='mobile:text-sm mobile:absolute mobile:right-0 mobile:mr-4 mobile:w-24 mobile:text-center'>Gerenciamento de Estoque</p>
                            </div>
                            <HelloUser />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-cinza-200 h-5/6'>
                <div className='bg-cinza-200 px-4'>
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                        Adicionar Novo Insumo
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Lógica para renderizar as linhas da tabela com base nos dados de insumos */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={0} // Atualize com o número real de insumos
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Linhas por página"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    />

                    {/* Seção para gerenciamento de posição de estoque */}
                    <div className="mt-6">
                        <Button variant="contained" color="primary" onClick={handleAddPosicao}>
                            Adicionar Nova Posição de Estoque
                        </Button>
                        <TableContainer component={Paper} className="mt-4">
                            <Table aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#d9d9d9' }}>
                                    <TableRow>
                                        <TableCell>
                                            <p className='font-bold text-base text-start text-pec'>Nome da Posição</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className='font-bold text-base text-start text-pec'>Descrição</p>
                                        </TableCell>
                                        <TableCell align="right">
                                            <p className='font-bold text-base text-start text-pec'>Ações</p>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {posicoes.map((posicao) => (
                                        <TableRow key={posicao.id}>
                                            <TableCell>{posicao.nome}</TableCell>
                                            <TableCell>{posicao.descricao}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => handleEditPosicao(posicao.id)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeletePosicao(posicao.id)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    {/* Seção para gerenciamento de famílias de insumos */}
                    <div className="mt-6">
                        <Button variant="contained" color="primary" onClick={handleAddFamilia}>
                            Adicionar Nova Família de Insumo
                        </Button>
                        <TableContainer component={Paper} className="mt-4">
                            <Table aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#d9d9d9' }}>
                                    <TableRow>
                                        <TableCell>
                                            <p className='font-bold text-base text-start text-pec'>Nome da Família</p>
                                        </TableCell>
                                        <TableCell align="right">
                                            <p className='font-bold text-base text-start text-pec'>Ações</p>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {familias.map((familia) => (
                                        <TableRow key={familia.id}>
                                            <TableCell>{familia.nome}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => handleEditFamilia(familia.id)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteFamilia(familia.id)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
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

            {/* Dialog para adicionar/editar insumo */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{insumo.codigo ? 'Editar Insumo' : 'Adicionar Insumo'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="codigo"
                                label="Código SAP"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={insumo.codigo}
                                onChange={(e) => setInsumo({ ...insumo, codigo: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="dense">
                                <Autocomplete
                                    options={mockFamilias} // Array com as opções de família
                                    getOptionLabel={(option) => option.label}
                                    // value={insumo.familia}
                                    onChange={(e, newValue) => setInsumo({ ...insumo, familia: newValue })}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Família" variant="outlined" required />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                margin="dense"
                                id="descricao"
                                label="Descrição"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={insumo.descricao}
                                onChange={(e) => setInsumo({ ...insumo, descricao: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={3} sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={insumo.exclusivo}
                                        onChange={(e) => setInsumo({ ...insumo, exclusivo: e.target.checked })}
                                    />
                                }
                                label="Exclusivo"
                            />
                        </Grid>
                        <Grid item xs={6} sm={9}>
                            <FormControl fullWidth margin="dense">
                                <Autocomplete
                                    options={mockClientes} // Array com as opções de clientes
                                    getOptionLabel={(option) => option.label}
                                    // value={insumo.cliente}
                                    onChange={(e, newValue) => setInsumo({ ...insumo, cliente: newValue })}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Cliente" variant="outlined" disabled={!insumo.exclusivo} />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="posicao"
                                label="Posição no Estoque"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={insumo.posicao}
                                onChange={(e) => setInsumo({ ...insumo, posicao: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="valor"
                                label="Valor Unitário"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={insumo.preco}
                                onChange={(e) => setInsumo({ ...insumo, preco: e.target.value })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="quantidade"
                                label="Quantidade Minima Estoque"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={insumo.quantidade}
                                onChange={(e) => setInsumo({ ...insumo, quantidade: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="periodo_inventario"
                                label="Periodicidade de Inventário (meses)"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={insumo.periodo_inventario}
                                onChange={(e) => setInsumo({ ...insumo, periodo_inventario: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveInsumo} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog para adicionar/editar posição de estoque */}
            <Dialog open={false} onClose={() => { }}>
                {/* Similar ao Dialog para Insumos */}
            </Dialog>

            {/* Dialog para adicionar/editar família de insumos */}
            <Dialog open={false} onClose={() => { }}>
                {/* Similar ao Dialog para Insumos */}
            </Dialog>
        </div>
    );
}

