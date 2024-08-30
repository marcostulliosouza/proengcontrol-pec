import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination, Paper,
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, Grid, FormControl,
    Autocomplete, Checkbox, FormControlLabel,
    InputBase, IconButton, Menu, MenuItem,
    Divider, ListItemIcon, ListItemText, Typography
} from '@mui/material';
import { ContentCopy, Delete, Edit, Search } from '@mui/icons-material';
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useHotkeys } from 'react-hotkeys-hook';
import { RiStickyNoteAddLine, RiMapPinAddLine, RiGroupLine, RiListCheck } from 'react-icons/ri';
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { MdAddToPhotos } from "react-icons/md";
import axios from 'axios';
import { describe } from 'node:test';

// Interfaces
interface Insumo {
    codigo: string;
    descricaoSAP: string;
    descricaoEspecifica: string;
    familia: string;
    cliente: string;
    exclusivo: boolean;
    posicao: string;
    qtdMinima: string;
    periodoInventario: string;
}

interface PosicaoEstoque {
    id: string;
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
    const [addPosition, setAddPosition] = useState(false);
    const [insumo, setInsumo] = useState<Insumo>({
        codigo: '', descricaoSAP: '', descricaoEspecifica: '', familia: '', cliente: '', exclusivo: false,
        posicao: '', qtdMinima: '', periodoInventario: ''
    });
    const [posicoes, setPosicoes] = useState<PosicaoEstoque>({
        id: '', nome: '', descricao: ''
    });
    const [familias, setFamilias] = useState<FamiliaInsumo[]>([]);
    const [clientes, setClientes] = useState<{ label: string, id: number }[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [insumos, setInsumos] = useState<Insumo[]>([]);

    useEffect(() => {
        // Carregar dados iniciais
        fetchInsumos();
        fetchPosicoes();
        fetchFamilias();
        fetchClientes();
    }, []);

    const fetchInsumos = async () => {
        try {
            const response = await axios.get('http://localhost/api/cadastroinsumos');
            setInsumos(response.data);
        } catch (error) {
            console.error('Erro ao carregar insumos:', error);
        }
    };
    const fetchPosicoes = async () => {
        try {
            const response = await axios.get('http://localhost/api/posicoes');
            setPosicoes(response.data);
        } catch (error) {
            console.error('Erro ao carregar posições:', error);
        }
    };
    const fetchFamilias = async () => {
        try {
            const response = await axios.get('http://localhost/api/familias');
            setFamilias(response.data);
        } catch (error) {
            console.error('Erro ao carregar famílias:', error);
        }
    };

    const fetchClientes = async () => {
        try {
            const response = await axios.get('http://localhost/api/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        }
    };

    const handleSavePosition = async () => {
        try {
            await axios.post('/api/posicoes', posicoes);
            fetchPosicoes(); // Atualizar lista de posições
            handleCloseAddPosition();
        } catch (error) {
            console.error('Erro ao salvar posição:', error);
        }
    };

    const handleAddFamily = () => {
        // Lógica para abrir o dialog de cadastrar família
    };

    const handleListPositions = () => {
        // Lógica para listar posições
    };

    const handleListFamilies = () => {
        // Lógica para listar famílias
    };

    const handleChangePage = (_event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDialog = () => {
        setInsumo({
            codigo: '', descricaoSAP: '', descricaoEspecifica: '', familia: '', cliente: '', exclusivo: false,
            posicao: '', qtdMinima: '', periodoInventario: ''
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const handleSaveInsumo = async () => {
        try {
            await axios.post('/api/insumos', insumo);
            fetchInsumos(); // Atualizar lista de insumos
            handleCloseDialog();
        } catch (error) {
            console.error('Erro ao salvar insumo:', error);
        }
    };

    const handleAddPosition = () => {
        setPosicoes({
            id: '', nome: '', descricao: ''
        });
        setAddPosition(true);
    };

    const handleCloseAddPosition = () => {
        setAddPosition(false);
    };

    const handleSavePosicao = async () => {
        try {
            await axios.post('/api/posicoes', insumo);
            fetchPosicoes(); // Atualizar lista de insumos
            handleCloseAddPosition();
        } catch (error) {
            console.error('Erro ao salvar a posição do estoque:', error);
        }
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredInsumos = Array.isArray(insumos) ? insumos.filter(insumo =>
        insumo.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

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
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleMenuClick}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                Menu
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleOpenDialog}>
                                    <ListItemIcon>
                                        <RiStickyNoteAddLine fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Cadastrar Insumo</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleAddPosition}>
                                    <ListItemIcon>
                                        <RiMapPinAddLine fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Adicionar Posição</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleAddFamily}>
                                    <ListItemIcon>
                                        <RiGroupLine fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Adicionar Família</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleListPositions}>
                                    <ListItemIcon>
                                        <RiListCheck fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Listar Posições</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleListFamilies}>
                                    <ListItemIcon>
                                        <RiListCheck fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Listar Famílias</ListItemText>
                                </MenuItem>
                            </Menu>
                        </div>
                        <div>
                            <TextField
                                placeholder="Pesquisar Insumos"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            startAdornment={<Search />}
                                        />
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Descrição SAP</TableCell>
                                    <TableCell>Descrição Específica</TableCell>
                                    <TableCell>Família</TableCell>
                                    <TableCell>Cliente</TableCell>
                                    <TableCell>Exclusivo</TableCell>
                                    <TableCell>Posição</TableCell>
                                    <TableCell>Qtd. Mínima</TableCell>
                                    <TableCell>Período Inventário</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredInsumos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((insumo, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{insumo.codigo}</TableCell>
                                        <TableCell>{insumo.descricaoSAP}</TableCell>
                                        <TableCell>{insumo.descricaoEspecifica}</TableCell>
                                        <TableCell>{insumo.familia}</TableCell>
                                        <TableCell>{insumo.cliente}</TableCell>
                                        <TableCell>{insumo.exclusivo ? 'Sim' : 'Não'}</TableCell>
                                        <TableCell>{insumo.posicao}</TableCell>
                                        <TableCell>{insumo.qtdMinima}</TableCell>
                                        <TableCell>{insumo.periodoInventario}</TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <Edit />
                                            </IconButton>
                                            <IconButton>
                                                <Delete />
                                            </IconButton>
                                            <IconButton>
                                                <ContentCopy />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            count={filteredInsumos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
            </div>
            {/* Dialog para cadastro de insumo */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Cadastrar Insumo</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Número SAP"
                                fullWidth
                                value={insumo.codigo}
                                onChange={(e) => setInsumo({ ...insumo, codigo: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição SAP"
                                fullWidth
                                value={insumo.descricaoSAP}
                                onChange={(e) => setInsumo({ ...insumo, descricaoSAP: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição Específica"
                                fullWidth
                                value={insumo.descricaoEspecifica}
                                onChange={(e) => setInsumo({ ...insumo, descricaoEspecifica: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    options={familias}
                                    getOptionLabel={(option) => option.nome}
                                    value={familias.find(fam => fam.id === insumo.familia)}
                                    onChange={(event, newValue) => setInsumo({ ...insumo, familia: newValue?.id || '' })}
                                    renderInput={(params) => <TextField {...params} label="Família" />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControlLabel
                                control={<Checkbox checked={insumo.exclusivo} onChange={(e) => setInsumo({ ...insumo, exclusivo: e.target.checked })} />}
                                label="Uso Exclusivo"
                            />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    options={clientes}
                                    getOptionLabel={(option) => option.label}
                                    value={clientes.find(cli => cli.id === insumo.cliente)}
                                    onChange={(event, newValue) => setInsumo({ ...insumo, cliente: newValue?.id || '' })}
                                    renderInput={(params) => <TextField {...params} label="Cliente" />}
                                    disabled={!insumo.exclusivo}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Posição no Estoque"
                                fullWidth
                                value={insumo.posicao}
                                onChange={(e) => setInsumo({ ...insumo, posicao: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Quantidade Mínima"
                                type='number'
                                fullWidth
                                value={insumo.qtdMinima}
                                onChange={(e) => setInsumo({ ...insumo, qtdMinima: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Período Inventário (meses)"
                                type='number'
                                fullWidth
                                value={insumo.periodoInventario}
                                onChange={(e) => setInsumo({ ...insumo, periodoInventario: e.target.value })}
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
            {/* Dialog para adicionar posição */}
            <Dialog open={addPosition} onClose={handleCloseAddPosition}>
                <DialogTitle>Adicionar Posição</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Título"
                                fullWidth
                                value={posicoes.nome}
                                onChange={(e) => setPosicoes({ ...posicoes, nome: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição"
                                fullWidth
                                value={posicoes.descricao}
                                onChange={(e) => setPosicoes({ ...posicoes, descricao: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddPosition} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSavePosicao} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
