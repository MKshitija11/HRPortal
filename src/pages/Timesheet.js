import React, { useState, useEffect } from 'react';
import { filter } from 'lodash';
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

const TABLE_HEAD = [
  { id: 'empId', label: 'Employee Code', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'totalWorkingDays', label: 'Total Working Days ', alignRight: false },
  { id: 'atsFilledDays', label: 'ATS filled Days', alignRight: false },
  { id: 'pendingDays', label: 'Pending Days', alignRight: false },
  { id: 'leaves', label: 'Leaves', alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.employeeFullName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TimeSheet() {
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [orderBy, setOrderBy] = useState('empId');
  const [order, setOrder] = useState('asc');

  const employeeDetails = [
    {
      id: 452,
      employeeId: 'PT00',
      employeeFullName: 'testnew testnew',
      totalWorkingDays: '18',
      atsFilledDays: '10',
      pendingDays: '8',
      leaves: '1',
    },
    {
      id: 452,
      employeeId: 'PT00',
      employeeFullName: 'Sam Sam',
      totalWorkingDays: '18',
      atsFilledDays: '10',
      pendingDays: '8',
      leaves: '0',
    },
    {
      id: 452,
      employeeId: 'PT00',
      employeeFullName: 'Thomas Thomas',
      totalWorkingDays: '18',
      atsFilledDays: '10',
      pendingDays: '8',
      leaves: '2.5',
    },
  ];

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
    const filteredUsers = applySortFilter(employeeDetails, getComparator(order, orderBy), event.target.value);
    // setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
    setActiveEmployees(employeeDetails);
  };

  return (
    <>
      <Container>
        <Card
          container
          sx={{
            border: '1px solid lightgray',
            borderRadius: '8px',
          }}
        >
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            employeeList={activeEmployees}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, height: '60vh' }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={employeeDetails.length}
                  numSelected={selected.length}
                  // onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {employeeDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, employeeId, employeeFullName, totalWorkingDays, atsFilledDays, pendingDays, leaves } =
                      row;
                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        //  selected={selectedUser}
                        //  onClick={() => ViewEmployee(row.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell align="left">{employeeId}</TableCell>

                        <TableCell component="th" scope="row">
                          <Typography noWrap>{employeeFullName}</Typography>
                        </TableCell>

                        <TableCell align="left">{totalWorkingDays}</TableCell>

                        <TableCell align="left">
                          <Label color="success">{atsFilledDays}</Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label color="error">{pendingDays}</Label>
                        </TableCell>

                        <TableCell align="left">{leaves}</TableCell>
                      </TableRow>
                    );
                    // const se
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
