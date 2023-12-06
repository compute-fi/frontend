import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


interface Column {
  id: 'reqDate' | 'computeID' | 'status' | 'computeTime' | 'fee' | 'tx' | 'log';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'reqDate', label: 'Request\u00a0Date', minWidth: 100 },
  { id: 'computeID', label: 'Compute\u00a0ID', minWidth: 200 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 50
  },
  {
    id: 'computeTime',
    label: 'Total\u00a0Compute\u00a0Time',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'fee',
    label: 'Fee(eth)',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'tx',
    label: 'Transaction\u00a0URL',
    minWidth: 50
  },
  {
    id: 'log',
    label: 'Compute\u00a0Log',
    minWidth: 50
  },
];

interface Data {
  reqDate: string;
  computeID: string;
  status: string;
  computeTime: number;
  fee: number;
  tx: string;
  log: string;
}

function createData(
  reqDate: string,
  computeID: string,
  status: string,
  computeTime: number,
  fee: number,
  tx: string,
  log: string,
): Data {
  return { reqDate, computeID, status, computeTime, fee,tx,log };
}

const rows = [
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('India', 'IN', "1324171354", 3287263,1,"2","3"),
  createData('Canada', 'CAD', "1324171354", 3287263,1,"2","3"),
];

export default function ComputeTaskTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>

    <Paper sx={{ width: '100%' }}>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.computeID}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4,10,25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
    
  );
}
