import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination, Paper,
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, Grid, FormControl,
    Autocomplete, Checkbox, FormControlLabel,
    InputBase, IconButton, Menu, MenuItem,
    Divider, ListItemIcon, ListItemText
} from '@mui/material';
import { ContentCopy, Delete, Edit, Search } from '@mui/icons-material';
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { RiStickyNoteAddLine, RiMapPinAddLine, RiGroupLine, RiListCheck } from 'react-icons/ri';
import axios from 'axios';

interface Insumo {
    codigo: string;
    descricaoSAP: string;
    descricaoEspecifica: string;
    familia: string;
    cliente: number | null;
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

interface Clientes {
    cli_id: number;
    cli_nome: string;
}

export function GerenciamentoEstoque() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openDialog, setOpenDialog] = useState(false);
    const [openPositionDialog, setOpenPositionDialog] = useState(false);
    const [openFamilyDialog, setOpenFamilyDialog] = useState(false);
    const [insumo, setInsumo] = useState<Insumo>({ codigo: '', descricaoSAP: '', descricaoEspecifica: '', familia: '', cliente: '', exclusivo: false, posicao: '', qtdMinima: '', periodoInventario: '' });
    const [posicao, setPosicao] = useState<PosicaoEstoque>({ id: '', nome: '', descricao: '' });
    const [familia, setFamilia] = useState<FamiliaInsumo>({ id: 0, nome: '' });
    const [familias, setFamilias] = useState<FamiliaInsumo[]>([]);
    const [posicoes, setPosicoes] = useState<PosicaoEstoque[]>([]);
    const [clientes, setClientes] = useState([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [insumos, setInsumos] = useState<Insumo[]>([]);
    const [selectedPosicao, setSelectedPosicao] = useState<PosicaoEstoque | null>(null);
    const [selectedFamilia, setSelectedFamilia] = useState<FamiliaInsumo | null>(null);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [insumosRes, posicoesRes, familiasRes, clientesRes] = await Promise.all([
                axios.get('http://localhost:5000/api/listarinsumos'),
                axios.get('http://localhost:5000/api/listarposicoes'),
                axios.get('http://localhost:5000/api/listarfamilias'),
                axios.get('http://localhost:5000/api/listagemclientes')
            ]);
            setInsumos(insumosRes.data);
            setPosicoes(posicoesRes.data);
            setFamilias(familiasRes.data);
            setClientes(clientesRes.data);
            console.log(clientesRes.data);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    const handleDialogToggle = (dialog: string, state: boolean) => {
        if (dialog === 'insumo') setOpenDialog(state);
        if (dialog === 'position') setOpenPositionDialog(state);
        if (dialog === 'family') setOpenFamilyDialog(state);
    };

    const handleSave = async (type: string) => {
        try {
            if (type === 'insumo') {
                await axios.post('http://localhost:5000/api/cadastroinsumos', insumo);
            } else if (type === 'posicao') {
                await axios.post('http://localhost:5000/api/cadastroposicoes', posicao);
            } else if (type === 'familia') {
                await axios.post('http://localhost:5000/api/cadastrofamilias', familia);
            }
            fetchData();
            handleDialogToggle(type, false);
        } catch (error) {
            console.error(`Erro ao salvar ${type}:`, error);
        }
    };

    const handleRowDoubleClick = (type: string, item: PosicaoEstoque | FamiliaInsumo) => {
        if (type === 'position') {
            setSelectedPosicao(item as PosicaoEstoque);
            handleDialogToggle('position', true); // Abrir o diálogo de edição para a posição
        } else if (type === 'family') {
            setSelectedFamilia(item as FamiliaInsumo);
            handleDialogToggle('family', true); // Abrir o diálogo de edição para a família
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

    const filteredInsumos = insumos.filter(insumo =>
        insumo.codigo.toLowerCase().includes(searchTerm.toLowerCase())
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
                                <MenuItem onClick={() => handleDialogToggle('insumo', true)}>
                                    <ListItemIcon>
                                        <RiStickyNoteAddLine fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Cadastrar Insumo</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => handleDialogToggle('position', true)}>
                                    <ListItemIcon>
                                        <RiMapPinAddLine fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Adicionar Posição</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => handleDialogToggle('family', true)}>
                                    <ListItemIcon>
                                        <RiGroupLine fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Adicionar Família</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => handleDialogToggle('position', true)}>
                                    <ListItemIcon>
                                        <RiListCheck fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Listar Posições</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => handleDialogToggle('family', true)}>
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
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    ),
                                    endAdornment: (
                                        <IconButton sx={{ p: '10px' }} aria-label="search">
                                            <Search />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <Paper>
                        <TableContainer>
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
                                        <TableCell>Qtd Mínima</TableCell>
                                        <TableCell>Período de Inventário</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredInsumos
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row.codigo}</TableCell>
                                                <TableCell>{row.descricaoSAP}</TableCell>
                                                <TableCell>{row.descricaoEspecifica}</TableCell>
                                                <TableCell>{row.familia}</TableCell>
                                                <TableCell>{row.cliente}</TableCell>
                                                <TableCell>
                                                    <Checkbox checked={row.exclusivo} />
                                                </TableCell>
                                                <TableCell>{row.posicao}</TableCell>
                                                <TableCell>{row.qtdMinima}</TableCell>
                                                <TableCell>{row.periodoInventario}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredInsumos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
                        />
                    </Paper>
                </div>
            </div>

            {/* Dialogs */}
            <Dialog open={openDialog} onClose={() => handleDialogToggle('insumo', false)}>
                <DialogTitle>Cadastro de Insumo</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Código SAP"
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
                                    options={familias.map(familia => familia.nome)}
                                    value={insumo.familia}
                                    onChange={(e, value) => setInsumo({ ...insumo, familia: value || '' })}
                                    renderInput={(params) => <TextField {...params} label="Família" />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={insumo.exclusivo}
                                        onChange={(e) => setInsumo({ ...insumo, exclusivo: e.target.checked })}
                                    />
                                }
                                label="Uso Exclusivo"
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    options={clientes}
                                    getOptionLabel={(option) => option.cli_nome}  // Use `option.cli_nome` para acessar o nome do cliente
                                    value={clientes.find(cliente => cliente.cli_id === insumo.cliente) || null}
                                    onChange={(event, newValue) => {
                                        setInsumo((prevInsumo) => ({
                                            ...prevInsumo,
                                            cliente: newValue ? newValue.cli_id : null
                                        }));
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Cliente" />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    options={posicoes.map(posicao => posicao.nome)}
                                    value={insumo.posicao}
                                    onChange={(e, value) => setInsumo({ ...insumo, posicao: value || '' })}
                                    renderInput={(params) => <TextField {...params} label="Posição do Estoque" />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Qtd Mínima"
                                fullWidth
                                value={insumo.qtdMinima}
                                onChange={(e) => setInsumo({ ...insumo, qtdMinima: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Período de Inventário (meses)"
                                fullWidth
                                value={insumo.periodoInventario}
                                onChange={(e) => setInsumo({ ...insumo, periodoInventario: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogToggle('insumo', false)}>Cancelar</Button>
                    <Button onClick={() => handleSave('insumo')} color="primary">Salvar</Button>
                </DialogActions>
            </Dialog>

            {/* Dialogs para Posições e Famílias */}
            <Dialog open={openPositionDialog} onClose={() => handleDialogToggle('position', false)}>
                <DialogTitle>Adicionar Posição</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome da Posição"
                                fullWidth
                                value={posicao.nome}
                                onChange={(e) => setPosicao({ ...posicao, nome: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição da Posição"
                                fullWidth
                                value={posicao.descricao}
                                onChange={(e) => setPosicao({ ...posicao, descricao: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogToggle('position', false)}>Cancelar</Button>
                    <Button onClick={() => handleSave('posicao')} color="primary">Salvar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openFamilyDialog} onClose={() => handleDialogToggle('family', false)}>
                <DialogTitle>Adicionar Família</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome da Família"
                                fullWidth
                                value={familia.nome}
                                onChange={(e) => setFamilia({ ...familia, nome: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogToggle('family', false)}>Cancelar</Button>
                    <Button onClick={() => handleSave('familia')} color="primary">Salvar</Button>
                </DialogActions>
            </Dialog>
            {/* Dialog para listar posições */}
            {/* <Dialog open={openPositionDialog} onClose={() => handleDialogToggle('positionList', false)}>
                <DialogTitle>Listar Posições</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Descrição</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posicoes.map((posicao) => (
                                    <TableRow
                                        key={posicao.id}
                                        onDoubleClick={() => handleRowDoubleClick('position', posicao)}
                                    >
                                        <TableCell>{posicao.nome}</TableCell>
                                        <TableCell>{posicao.descricao}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogToggle('positionList', false)}>Fechar</Button>
                </DialogActions>
            </Dialog> */}

            {/* Dialog para listar famílias */}
            {/* <Dialog open={openFamilyDialog} onClose={() => handleDialogToggle('familyList', false)}>
                <DialogTitle>Listar Famílias</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {familias.map((familia) => (
                                    <TableRow
                                        key={familia.id}
                                        onDoubleClick={() => handleRowDoubleClick('family', familia)}
                                    >
                                        <TableCell>{familia.nome}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogToggle('familyList', false)}>Fechar</Button>
                </DialogActions>
            </Dialog> */}

            {/* Dialog de edição para posição */}
            <Dialog open={!!selectedPosicao} onClose={() => setSelectedPosicao(null)}>
                <DialogTitle>Editar Posição</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome da Posição"
                                fullWidth
                                value={selectedPosicao?.nome || ''}
                                onChange={(e) =>
                                    setSelectedPosicao({ ...selectedPosicao!, nome: e.target.value })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição da Posição"
                                fullWidth
                                value={selectedPosicao?.descricao || ''}
                                onChange={(e) =>
                                    setSelectedPosicao({ ...selectedPosicao!, descricao: e.target.value })
                                }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedPosicao(null)}>Cancelar</Button>
                    <Button onClick={() => {
                        // Salvar mudanças
                        setSelectedPosicao(null);
                    }} color="primary">Salvar</Button>
                </DialogActions>
            </Dialog>

            {/* <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} /> */}
        </div>
    );
}