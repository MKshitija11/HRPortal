import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
// @mui
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
import HandleApi from '../components/CustomComponent/HandleApi';

import Loader from '../components/Loader/Loader';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import Configuration from '../utils/Configuration';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'empId', label: 'Employee Code', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'resignation', label: 'Resignation Initiated', alignRight: false },
];

// ----------------------------------------------------------------------

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

export default function ResignationInitiatedListBP() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('empId');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [employeeList = [], setEmployeeList] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [emptyRows, setEmptyRows] = useState();
  const [pendingEmployees, setPendingEmployees] = useState([]);
  // const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    if (USERDETAILS != null) {
        const empListVendorReq = {
            partnerName: USERDETAILS?.[0]?.partnerName,
            itSpocId: 'NA',
          };
    
          setIsLoading(true);
          Configuration.getEmpListVendor(empListVendorReq)
            .then((empListVendorRes) => {
              if (empListVendorRes.data.error) {
                setErrorMessage(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 500);
              } else {
                setEmployeeList(empListVendorRes.data);
                const downloadActiveEmp = empListVendorRes.data.filter(
                  (employees) => employees.employeeStatus === 'Resignation Initiated'
                );
                // setCsvData(downloadActiveEmp);
    
                setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeList.length) : 0);
                const filteredUsers = applySortFilter(empListVendorRes.data, getComparator(order, orderBy), filterName);
                setPendingEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Resignation Initiated'));
    
                setTimeout(() => {
                  setIsLoading(false);
                }, 500);
              }
            })
            .catch((error) => {
              setIsLoading(false);
              alert('Something went wrong');
            });
   
    } else {
      navigate('/login');
    }
  }, []);

  const NewEmployee = () => {
    navigate('/NewEmployee');
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = employeeList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
    setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeList.length) : 0);
    const filteredUsers = applySortFilter(employeeList, getComparator(order, orderBy), event.target.value);
    setPendingEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Resignation Initiated'));
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeList.length) : 0;

  // const filteredUsers = applySortFilter(employeeList, getComparator(order, orderBy), filterName);

  // const pendingEmployees = filteredUsers.filter((employees) => employees.employeeStatus === 'Pending For TL Review');

  // const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> HR Portal | Employees(Team Lead)</title>
      </Helmet>

      {/* <Container disableGutters> */}
      {isLoading ? (
        <Stack justifyContent="center" alignItems="center">
          <Loader />
        </Stack>
      ) : (
        <>
          {errorMessage ? (
            <HandleApi />
          ) : (
            <Container>
              {console.log('empListVendorRes--------', employeeList)}
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => NewEmployee()}
                  sx={{ display: 'none' }}
                >
                  New Employee
                </Button>
              </Stack>

              <Card
                sx={{
                  border: '1px solid lightgray',
                  borderRadius: '8px',
                }}
              >
                <UserListToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                  employeeList={pendingEmployees}
                />
                {pendingEmployees.length === 0 ? (
                  <Stack alignItems="center" justifyContent="center" marginY="20%" alignContent="center">
                    <Iconify icon="eva:alert-triangle-outline" color="red" width={60} height={60} />
                    <Typography variant="h4" noWrap color="black">
                      No Records Found!!
                    </Typography>
                  </Stack>
                ) : (
                  <>
                    <Scrollbar>
                      <TableContainer sx={{ minWidth: 800, height: '60vh' }}>
                        <Table>
                          <UserListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={pendingEmployees.length}
                            numSelected={selected.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                          />
                          <TableBody>
                            {pendingEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                              const {
                                id,
                                // employeeId,
                                employeeFullName,
                                employeeStatus,
                                partnerName,
                                supportDevelopment,
                                resignationDate,
                              } = row;
                              const selectedUser = selected.indexOf(employeeFullName) !== -1;

                              return (
                                <TableRow
                                  hover
                                  key={id}
                                  tabIndex={-1}
                                  role="checkbox"
                                  selected={selectedUser}
                                  onClick={() => {
                                    console.log('EMPLOYEE DETAILS.....', row);
                                    navigate('/ViewEmployeeBP', { state: { row } });
                                  }}
                                  sx={{ cursor: 'pointer' }}
                                >
                                  {/* <TableCell align="left">{employeeId}</TableCell> */}

                                  <TableCell component="th" scope="row">
                                    <Typography noWrap>{employeeFullName}</Typography>
                                  </TableCell>

                                  <TableCell align="left">{partnerName}</TableCell>

                                  <TableCell align="left">{supportDevelopment}</TableCell>

                                  <TableCell align="left">
                                    <Label
                                      color={
                                        (employeeStatus === 'Pending For TL Review' && 'warning') ||
                                        (employeeStatus === 'Active' && 'success') ||
                                        (employeeStatus === 'Resigned' && 'error') ||
                                        (employeeStatus === 'Resignation Initiated' && 'warning') ||
                                        'warning'
                                      }
                                    >
                                      {employeeStatus}
                                    </Label>
                                  </TableCell>
                                  <TableCell align="left">{resignationDate || '-'}</TableCell>
                                </TableRow>
                              );
                            })}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                          {/* 
                          {isNotFound && (
                            <TableBody>
                              <TableRow>
                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                  <Paper
                                    sx={{
                                      textAlign: 'center',
                                    }}
                                  >
                                    <Typography variant="h6" paragraph>
                                      Not found
                                    </Typography>

                                    <Typography variant="body2">
                                      No results found for &nbsp;
                                      <strong>&quot;{filterName}&quot;</strong>.
                                      <br /> Try checking for typos or using complete words.
                                    </Typography>
                                  </Paper>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          )} */}
                        </Table>
                      </TableContainer>
                    </Scrollbar>

                    <TablePagination
                      rowsPerPageOptions={[25, 50, 75]}
                      component="div"
                      count={pendingEmployees.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </>
                )}
              </Card>
            </Container>
          )}
        </>
      )}
    </>
  );
}
