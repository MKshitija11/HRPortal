import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

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
// components
import HandleApi from '../components/CustomComponent/HandleApi';

import Loader from '../components/Loader/Loader';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import Configuration from '../utils/Configuration';

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

export default function EmployeeListBP() {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('empId');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [employeeList = [], setEmployeeList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [emptyRows, setEmptyRows] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  // const [isNotFound, setIsNotFound] = useState(false);

  const [csvData = [], setCsvData] = useState();

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    if (USERDETAILS != null) {
      console.log('USERDETAILS', USERDETAILS);
      console.log('USERDETAILS.partnerName', USERDETAILS.partnerName);

      // let dynaPartnerName = '';
      // let dynaStatusName = '';
      // try {
      //   dynaPartnerName = location.state.partnerNameChart;
      // } catch (error) {
      //   dynaPartnerName = '';
      // }
      // try {
      //   dynaStatusName = location.state.empStatus;
      // } catch (error) {
      //   dynaStatusName = '';
      // }

      // let empListVendorReq = {};

      // if (dynaPartnerName === undefined) {
      //   empListVendorReq = {
      //     itSpocId: dynaStatusName,
      //     partnerName: 'NA',
      //   };
      // } else if (dynaStatusName === undefined) {
      //   empListVendorReq = {
      //     partnerName: dynaPartnerName,
      //     itSpocId: 'NA',
      //   };
      // } else {
      //   empListVendorReq = {
      //     partnerName: 'NA',
      //     itSpocId: 'NA',
      //   };
      // }
      // const empListVendorReq = {
      //   partnerName: 'NA',
      //   // partnerName: USERDETAILS.spocEmailId,
      //   // itSpocId: USERDETAILS.spocEmailId,
      //   itSpocId: 'NA',
      // };
      // console.log('empListVendorReq', location);
      const empListItSpocReq = {
        itSpocId: USERDETAILS.spocEmailId,
      };
      setIsLoading(true);
      Configuration.getEmpListItSpoc(empListItSpocReq)
        .then((empListItSpocRes) => {
          if (empListItSpocRes.data.error) {
            setErrorMessage(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          } else {
            console.log('empListVendorRes', empListItSpocRes);
            setEmployeeList(empListItSpocRes.data);
            // console.log('employeeList', employeeList);
            setCsvData(empListItSpocRes.data);
            const pendingAndActiveEmployees = empListItSpocRes.data.filter(
              (employees) =>
                employees.employeeStatus === 'Active' || employees.employeeStatus === 'Pending For IT Spoc Review'
            );
            const users = applySortFilter(pendingAndActiveEmployees, getComparator(order, orderBy), filterName);

            setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0);

            // setIsNotFound(!users.length && !!filterName);
            setFilteredUsers(users);
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
    // eslint-disable-next-line
  }, []);

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
    const pendingAndActiveEmployees = employeeList.filter(
      (employees) => employees.employeeStatus === 'Active' || employees.employeeStatus === 'Pending For IT Spoc Review'
    );
    const users = applySortFilter(pendingAndActiveEmployees, getComparator(order, orderBy), event.target.value);

    setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0);

    // setIsNotFound(!users.length && !!event.target.value);
    setFilteredUsers(users);
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeList.length) : 0;

  // const PendingAndActiveEmployees = employeeList.filter(
  //   (employees) => employees.employeeStatus === 'Active' || employees.employeeStatus === 'Pending For IT Spoc Review'
  // );
  // const filteredUsers = applySortFilter(PendingAndActiveEmployees, getComparator(order, orderBy), filterName);

  // const isNotFound = !employeeList.length && !!filterName;

  const Heading = [
    [
      'Partner Name',
      'Employee ID',
      'First Name',
      'Last Name',
      'Full Name',
      'Status',
      'Official Email',
      'Personal Email',
      'Mobile Number',
      'Whatsapp Number',
      'Joining Date',
      'ReportingTeamLead',
      'ReportingManager',
      'ReportingItSpoc',
      'BillingSlab',
      'EvaluationPeriod',
      'NewReplacement',
      'ReplacementEcode',
      'SupportDevelopment',
      'Function',
      'Department',
      'Vertical(Main)',
      'Vertical(Sub)',
      'LOB',
      'Maximus/Opus',
      'Invoice Type',
    ],
  ];
  const selectedCols = csvData.map((n) => [
    n.partnerName,
    n.employeeId,
    n.employeeFirstName,
    n.employeeLastName,
    n.employeeFullName,
    n.employeeStatus,
    n.officialEmail,
    n.personalEmail,
    n.mobileNumber,
    n.whatsappNumber,
    n.joiningDate,
    n.reportingTeamLead,
    n.reportingManager,
    n.reportingItSpoc,
    n.billingSlab,
    n.evaluationPeriod,
    n.newReplacement,
    n.replacementEcode,
    n.supportDevelopment,
    n.functionDesc,
    n.departmentDesc,
    n.verticalMain,
    n.verticalSub,
    n.lob,
    n.maximusOpus,
    n.invoiceType,
  ]);

  // console.log('selectedCols', selectedCols);

  const exportToCSV = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, Heading);

    XLSX.utils.sheet_add_json(ws, selectedCols, {
      origin: 'A2',
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, ws, 'DATA');

    XLSX.writeFile(wb, 'EmployeeData.xlsx');
  };

  return (
    <>
      <Helmet>
        <title>HR Portal | Reports</title>
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
                  startIcon={<Iconify icon="ri:file-excel-2-line" />}
                  onClick={() => exportToCSV()}
                  color="primary"
                  size="medium"
                >
                  Download Excel
                </Button>
              </Stack>

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
                  employeeList={filteredUsers}
                />
                {filteredUsers.length === 0 ? (
                  <Stack alignItems="center" justifyContent="center" marginY="20%" alignContent="center">
                    <Iconify icon="eva:alert-triangle-outline" color="red" width={60} height={60} />
                    <Typography variant="h4" noWrap color="black">
                      No Records Found!!
                    </Typography>
                  </Stack>
                ) : (
                  <>
                    <Scrollbar>
                      <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                          <UserListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={filteredUsers.length}
                            numSelected={selected.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                          />
                          <TableBody>
                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                                  onClick={() => {
                                    navigate('/ViewEmployeeITS', { state: { row } });
                                  }}
                                  sx={{ cursor: 'pointer' }}
                                >
                                  <TableCell align="left">{employeeId}</TableCell>

                                  <TableCell component="th" scope="row">
                                    <Typography noWrap>{employeeFullName}</Typography>
                                  </TableCell>

                                  <TableCell align="left">{partnerName}</TableCell>

                                  <TableCell align="left">{supportDevelopment}</TableCell>
                                  <TableCell align="left">
                                    <Label
                                      // color={(employeeStatus === 'Active' && 'success') || 'warning'}
                                      color={
                                        (employeeStatus === 'Active' && 'success') ||
                                        (employeeStatus === 'Rejected by TL' && 'error') ||
                                        (employeeStatus === 'Rejected by SM' && 'error') ||
                                        (employeeStatus === 'Rejected by IT Spoc' && 'error') ||
                                        (employeeStatus === 'Resigned' && 'error') ||
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
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={filteredUsers.length}
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
