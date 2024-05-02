import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Draggable from 'react-draggable';

function Row(props: any) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tempoInicioAtendimento, setTempoInicioAtendimento] = React.useState<Date | null>(null);

  const calculateDuration = (start: string) => {
    const startDate = new Date(start);
    const currentDate = new Date();
    const duration = currentDate.getTime() - startDate.getTime();

    const hours = Math.floor(duration / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((duration % (1000 * 60)) / 1000).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  const calculateDurationAtendimento = (start: string) => {
    if (!start) {
      return '00:00:00'
    }

    const startDate = new Date(start);
    const currentDate = new Date();
    const duration = currentDate.getTime() - startDate.getTime();

    const hours = Math.floor(duration / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((duration % (1000 * 60)) / 1000).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (row.cha_status === 2 && !tempoInicioAtendimento) {
      setTempoInicioAtendimento(new Date());
    }
  }, [row.cha_status]);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            disabled={showModal}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" sx={{ display: 'flex', alignItems: 'center', borderBottom: 'unset', margin: '8px' }}>
          <span
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor:
                row.cha_plano === 1
                  ? '#DB2E2A'
                  : row.cha_plano === 0
                    ? '#FFCC6D'
                    : '#3366FF',
              border: '1px solid black',
            }}
          ></span>
        </TableCell>
        <TableCell align="left">{row.cha_status === 1 ? 'ABERTO' : row.cha_status === 2 ? 'EM ATENDIMENTO' : ''}</TableCell>
        <TableCell align="left">{calculateDuration(row.cha_data_hora_abertura)}</TableCell>
        <TableCell align="left">{calculateDurationAtendimento(row.cha_data_hora_atendimento)}</TableCell>
        <TableCell align="left">{row.tipo_chamado}</TableCell>
        <TableCell align="left">{row.produto_nome}</TableCell>
        <TableCell align="left">{row.cliente_nome}</TableCell>
        <TableCell align="left">{row.cha_local}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Responsável</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Descrição</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Operador</Typography>
                    </TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.cha_produto}>
                    <TableCell align="left">{row.responsavel}</TableCell>
                    <TableCell align="left">{row.cha_descricao}</TableCell>
                    <TableCell align="left">{row.cha_operador}</TableCell>
                    <TableCell align='left'>
                      <>
                        {row.cha_status === 1 ? (
                          <button
                            onClick={() => setShowModal(true)}
                            type="button"
                            className='rounded shadow text-white font-semibold bg-red-700 hover:bg-red-800 p-2'
                          >
                            Atender chamado
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowModal(true)}
                            type="button"
                            className='rounded shadow text-white font-semibold bg-pec p-2'
                          >
                            Chamado em atendimento
                          </button>
                        )}
                        {showModal ? (
                          <>
                            <Draggable>
                              <div className="w-[80vw] max-w-[800px] rounded-lg shadow bg-cinza-300 border border-black absolute top-[50%] left-[50%] transform translate[-50%,-50%] z-50">
                                <header className="rounded-lg shadow-lg cursor-move p-5 bg-cinza-300 text-base flex flex-col gap-2">
                                  <span className="text-2xl font-semibold">Atendendo chamado</span>
                                  <button
                                    onClick={() => setShowModal(false)}
                                    type="button"
                                    className="absolute top-5 right-5 text-cinza-100 bg-red-700 rounded font-bold uppercase px-6 py-2 text-sm"
                                  >
                                    Cancelar chamado
                                  </button>
                                  <div className="flex items-start justify-start gap-10">
                                    <div className='flex items-start justify-start gap-2'>
                                      <p className="font-semibold">Produto:</p><p>{row.produto_nome}</p>
                                    </div>
                                    <div className='flex items-start justify-start gap-2'>
                                      <p className="font-semibold">Cliente:</p><p>{row.cliente_nome}</p>
                                    </div>
                                    <div className='flex items-start justify-start gap-2'>
                                      <p className="font-semibold">Local:</p><p>{row.cha_local}</p>
                                    </div>
                                  </div>
                                  <div className='flex items-start justify-start gap-2'>
                                    <p className="font-semibold">Tipo de chamado:</p><p>{row.tipo_chamado}</p>
                                  </div>
                                  <p className="font-semibold">Problema:</p>
                                  <p>{row.cha_descricao}</p>
                                  <p className={`flex justify-center items-center rounded p-2 text-gray-100 text-9xl ${row.cha_plano === 1 ? 'bg-no_plano' : row.cha_plano === 0 ? 'bg-fora_plano' : 'bg-engenharia'
                                    }`} style={{ textShadow: '2px 2px 2px black' }}>{calculateDurationAtendimento(row.cha_data_hora_atendimento)}</p>
                                </header>
                                <body>
                                  <main>
                                    <form className="p-5 w-full">
                                      <label className="block text-black text-sm font-bold mb-1">
                                        Descrição da solução:
                                      </label>
                                      <textarea className="bg-gray-100 shadow appearance-none border rounded w-full h-60 py-2 px-1 text-black resize-none"></textarea>
                                    </form>
                                  </main>
                                  <footer className="flex items-center justify-between p-6">
                                    <button
                                      onClick={() => setShowModal(false)}
                                      type="button"
                                      className="text-pec bg-cinza-400 rounded font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1"
                                    >
                                      Tranferir chamado
                                    </button>
                                    <button
                                      onClick={() => setShowModal(false)}
                                      type="button"
                                      className="text-cinza-100 bg-pec font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    >
                                      Encerrar chamado
                                    </button>
                                  </footer>
                                </body>
                              </div>
                            </Draggable>
                          </>
                        ) : null}
                      </>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function CollapsibleTable() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/chamados');
        console.log('resposta', response);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setDados(data);
        } else {
          console.error('Erro ao buscar dados: ', response.statusText);
        }
      } catch (error) {
        console.error("Erro fetching dados: ", error)
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="bg-cinza-100 rounded-md drop-shadow p-5">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead sx={{ backgroundColor: '#d9d9d9' }}>
            <TableRow>
              <TableCell />
              <TableCell align="left">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Tipo</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Status</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Duração Total</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Tempo de Atendimento</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Tipo de Chamado</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Produto</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Cliente</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Local</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dados
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <Row key={row.cha_id} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={dados.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </div >
  );
}