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
    pos_descricao: string;
    cli_nome: string;
    ins_id: string;
    ins_cod_SAP: string;
    ins_posicao_id: string;
    ins_descricao_SAP: string;
    ins_descricao_especifica: string,
    ins_familia: string;
    ins_exclusivo: boolean;
    ins_cliente_id: string;
    ins_status: boolean;
    ins_qtd_minima: string;
    ins_periodo_inventario: string;
    ins_nessidade_compra: string;
}

interface PosicaoEstoque {
    pos_id: string;
    pos_nome: string;
    pos_descricao: string;
}

interface FamiliaInsumo {
    fam_ins_id: string;
    fam_ins_nome: string;
}

interface Cliente {
    cli_id: string;
    cli_nome: string;
}

export function GerenciamentoEstoque() {
    const [openInsumoDialog, setOpenIsumoDialog] = useState(false);
    const [openPosicaoDialog, setOpenPosicaoDialog] = useState(false);
    const [openFamiliaDialog, setOpenFamiliaDialog] = useState(false);

    const [insumo, setInsumo] = useState<Insumo>({
        pos_descricao: '',
        cli_nome: '',
        ins_id: '',
        ins_cod_SAP: '',
        ins_posicao_id: '',
        ins_descricao_SAP: '',
        ins_descricao_especifica: '',
        ins_familia: '',
        ins_exclusivo: false,
        ins_cliente_id: '',
        ins_status: true,
        ins_qtd_minima: '',
        ins_periodo_inventario: '',
        ins_nessidade_compra: ''
    });
    const [posicao, setPosicao] = useState<PosicaoEstoque>({
        pos_id: '',
        pos_nome: '',
        pos_descricao: ''
    });
    const [familia, setFamilia] = useState<FamiliaInsumo>({
        fam_ins_id: '',
        fam_ins_nome: ''
    });

    const [insumos, setInsumos] = useState<Insumo[]>([]);
    const [posicoes, setPosicoes] = useState<PosicaoEstoque[]>([]);
    const [familias, setFamilias] = useState<FamiliaInsumo[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const [showSidebar, setShowSidebar] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [listaInsumos, listaPosicoes, listaFamilias, listaClientes] = await Promise.all([
                axios.get('http://localhost:5000/api/listarinsumos'),
                axios.get('http://localhost:5000/api/listarposicoes'),
                axios.get('http://localhost:5000/api/listarfamilias'),
                axios.get('http://localhost:5000/api/listagemclientes')
            ]);
            setInsumos(listaInsumos.data);
            setPosicoes(listaPosicoes.data);
            setFamilias(listaFamilias.data);
            setClientes(listaClientes.data);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    const handleDialogToggle = (dialog: string, state: boolean) => {
        if (dialog === 'cadastrar_insumo') setOpenIsumoDialog(state);
        if (dialog === 'cadastrar_posicao') setOpenPosicaoDialog(state);
        if (dialog === 'cadastrar_familia') setOpenFamiliaDialog(state);
    };

    const handleSave = async (type: string) => {
        try {
            if (type === 'cadastrar_insumo') {
                await axios.post('http://localhost:5000/api/cadastroinsumos', insumo);
            } else if (type === 'cadastrar_posicao') {
                await axios.post('http://localhost:5000/api/cadastroposicoes', posicao);
            } else if (type === 'cadastrar_familia') {
                await axios.post('http://localhost:5000/api/cadastrofamilias', familia);
            }
            fetchData();
            handleDialogToggle(type, false);
        } catch (error) {
            console.error(`Erro ao salvar ${type}:`, error);
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

    const filteredInsumos = insumos?.filter((insumo) =>
        insumo.ins_cod_SAP.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];


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
                                <MenuItem onClick={() => handleDialogToggle('cadastrar_insumo', true)}>
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
                                        <TableCell>Código SAP</TableCell>
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
                                                <TableCell>{row.ins_cod_SAP}</TableCell>
                                                <TableCell>{row.ins_descricao_SAP}</TableCell>
                                                <TableCell>{row.ins_descricao_especifica}</TableCell>
                                                <TableCell>{row.ins_familia}</TableCell>
                                                <TableCell>{row.cli_nome}</TableCell> {/* Nome do cliente */}
                                                <TableCell>
                                                    <Checkbox checked={row.ins_exclusivo} />
                                                </TableCell>
                                                <TableCell>{row.pos_descricao}</TableCell> {/* Nome da posição */}
                                                <TableCell>{row.ins_qtd_minima}</TableCell>
                                                <TableCell>{row.ins_periodo_inventario}</TableCell>
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

            {/* Dialog Cadastrar Insumos */}
            <Dialog open={openInsumoDialog} onClose={() => handleDialogToggle('cadastrar_insumo', false)}>
                <DialogTitle>Cadastro de Insumo</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Código SAP"
                                fullWidth
                                value={insumo.ins_cod_SAP}
                                onChange={(e) => setInsumo({ ...insumo, ins_cod_SAP: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição SAP"
                                fullWidth
                                value={insumo.ins_descricao_SAP}
                                onChange={(e) => setInsumo({ ...insumo, ins_descricao_SAP: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição Específica"
                                fullWidth
                                value={insumo.ins_descricao_especifica}
                                onChange={(e) => setInsumo({ ...insumo, ins_descricao_especifica: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    options={familias.map(familia => familia.fam_ins_nome)}
                                    value={insumo.ins_familia}
                                    onChange={(e, value) => setInsumo({ ...insumo, ins_familia: value || '' })}
                                    renderInput={(params) => <TextField {...params} label="Família" />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={insumo.ins_exclusivo}
                                        onChange={(e) => setInsumo({ ...insumo, ins_exclusivo: e.target.checked })}
                                    />
                                }
                                label="Uso Exclusivo"
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    options={clientes}
                                    getOptionLabel={(option) => option.cli_nome || ""}
                                    disabled={!insumo.ins_exclusivo}
                                    value={clientes.find(cliente => cliente.cli_id === insumo.ins_cliente_id) || null}
                                    onChange={(event, newValue) => {
                                        setInsumo((prevInsumo) => ({
                                            ...prevInsumo,
                                            ins_cliente_id: newValue ? newValue.cli_id : '' // Atualiza o ins_cliente_id no estado
                                        }));
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Cliente" />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    options={posicoes.map(posicao => posicao.pos_nome)}
                                    value={insumo.ins_posicao_id}
                                    onChange={(e, value) => setInsumo({ ...insumo, ins_posicao_id: value || '' })}
                                    renderInput={(params) => <TextField {...params} label="Posição do Estoque" />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Qtd Mínima"
                                fullWidth
                                value={insumo.ins_qtd_minima}
                                onChange={(e) => setInsumo({ ...insumo, ins_qtd_minima: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Período de Inventário (meses)"
                                fullWidth
                                value={insumo.ins_periodo_inventario}
                                onChange={(e) => setInsumo({ ...insumo, ins_periodo_inventario: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogToggle('cadastrar_insumo', false)}>Cancelar</Button>
                    <Button onClick={() => handleSave('cadastrar_insumo')} color="primary">Salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}