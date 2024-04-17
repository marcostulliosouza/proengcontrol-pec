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

function Row(props: any) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {row.cha_tipo}
        </TableCell>
        <TableCell align="left">{row.cha_status}</TableCell>
        <TableCell align="left">{row.cha_data_hora_abertura}</TableCell>
        <TableCell align="left">{row.cha_data_hora_atendimento}</TableCell>
        <TableCell align="left">{row.cha_tipo}</TableCell>
        <TableCell align="left">{row.cha_status}</TableCell>  {/*aqui será o local */}
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
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Produto</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Cliente</Typography>
                    </TableCell>
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
                    <TableCell align="left">{row.cha_produto}</TableCell>
                    <TableCell align="left">{row.cha_cliente}</TableCell>
                    <TableCell align="left">{row.cha_operador}</TableCell> {/*aqui será o responsavel*/}
                    <TableCell align="left">{row.cha_descricao}</TableCell>
                    <TableCell align="left">{row.cha_operador}</TableCell>
                    <TableCell align='left'>
                      <button
                        className='rounded shadow text-white font-semibold bg-red-700 hover:bg-red-800'
                        onClick={() => console.log('Botão clicado')}>
                        Atender chamado
                      </button>
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
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // Número de linhas por página
  const [dados, setDados] = useState([]);
  ''
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

    const intervalId = setInterval(fetchData, 3000);
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