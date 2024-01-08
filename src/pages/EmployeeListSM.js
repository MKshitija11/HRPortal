import { useNavigate, useLocation } from 'react-router-dom';
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
  Modal,
  Box,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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
import SwitchRole from './SwitchRole';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'empId', label: 'Employee Code', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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

export default function EmployeeListSM() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('LOCATION', location);
  const [openModal, setOpenModal] = useState(true);
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
  const [activeEmployees, setActiveEmployees] = useState([]);

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    if (USERDETAILS != null) {
      console.log('USERDETAILS', USERDETAILS);

      const empListManagerReq = {
        managerId: USERDETAILS?.[0]?.spocEmailId,
      };

      setIsLoading(true);
      Configuration.getEmpListManager(empListManagerReq)
        .then((empListManagerRes) => {
          if (empListManagerRes.data.error) {
            setErrorMessage(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          } else {
            console.log('empListVendorRes', empListManagerReq);
            setEmployeeList(empListManagerRes.data);

            // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeList.length) : 0;

            // const filteredUsers = applySortFilter(employeeList, getComparator(order, orderBy), filterName);

            // const activeEmployees = filteredUsers.filter((employees) => employees.employeeStatus === 'Active');

            // const isNotFound = !filteredUsers.length && !!filterName;
            setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - empListManagerRes.data.length) : 0);
            const filteredUsers = applySortFilter(empListManagerRes.data, getComparator(order, orderBy), filterName);
            // setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
            if (location.state?.filterByPartnerName) {
              setActiveEmployees(
                filteredUsers.filter(
                  (employees) =>
                    employees.partnerName === location.state.filterByPartnerName &&
                    employees.employeeStatus === 'Active'
                )
              );
            } else {
              setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
            }

            setTimeout(() => {
              setIsLoading(false);
            }, 500);
            console.log('employeeList', employeeList);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert('Something went wrong');
        });
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const NewEmployee = () => {
    navigate('/NewEmployee');
  };

  const ViewEmployee = (rowId) => {
    console.log('rowId', rowId);
    navigate('/ViewEmployeeSM', {
      state: {
        id: rowId,
      },
    });
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

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

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
    setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeList.length) : 0;

  // const filteredUsers = applySortFilter(employeeList, getComparator(order, orderBy), filterName);

  // const activeEmployees = filteredUsers.filter((employees) => employees.employeeStatus === 'Active');

  // const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Employees | HR Portal </title>
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
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={NewEmployee}
                  sx={{ display: 'none' }}
                >
                  New Employee
                </Button>
              </Stack>

              <>
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
                    employeeList={activeEmployees}
                  />
                  {activeEmployees.length === 0 ? (
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
                              rowCount={employeeList.length}
                              numSelected={selected.length}
                              onRequestSort={handleRequestSort}
                              onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                              {activeEmployees
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                  const {
                                    id,
                                    employeeId,
                                    employeeFullName,
                                    employeeStatus,
                                    partnerName,
                                    supportDevelopment,
                                  } = row;
                                  const selectedUser = selected.indexOf(employeeFullName) !== -1;

                                  return (
                                    <TableRow
                                      hover
                                      key={id}
                                      tabIndex={-1}
                                      role="checkbox"
                                      selected={selectedUser}
                                      // onClick={() => ViewEmployee(row.id)}
                                      onClick={() => {
                                        console.log('EMPLOYEE DETAILS.....', row);
                                        navigate('/ViewEmployeeSM', { state: { row } });
                                      }}
                                      sx={{ cursor: 'pointer' }}
                                    >
                                      <TableCell align="left">{employeeId}</TableCell>

                                      <TableCell component="th" scope="row" padding="none">
                                        {/* <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            > */}
                                        {/* <Avatar alt={empoyeeFullName} src={avatarUrl} /> */}
                                        <Typography noWrap>{employeeFullName}</Typography>
                                        {/* </Stack> */}
                                      </TableCell>

                                      <TableCell align="left">{partnerName}</TableCell>

                                      <TableCell align="left">{supportDevelopment}</TableCell>

                                      <TableCell align="left">
                                        {/* <Label
                                    color={employeeStatus === 'Pending For SM Review' && 'warning'}
                                    // color={(employeeStatus === 'Active' && 'success') || 'error'}
                                  >
                                    {employeeStatus}
                                  </Label> */}
                                        <Label
                                          color={
                                            (employeeStatus === 'Pending For SM Review' && 'warning') ||
                                            (employeeStatus === 'Active' && 'success') ||
                                            'warning'
                                          }
                                        >
                                          {employeeStatus}
                                        </Label>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                  <TableCell colSpan={6} />
                                </TableRow>
                              )}
                            </TableBody>

                            {/* {isNotFound && (
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
                        count={activeEmployees.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </>
                  )}
                </Card>
              </>
            </Container>
          )}
        </>
      )}
    </>
  );
}
