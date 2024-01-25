import { useNavigate, useLocation } from 'react-router-dom';
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
  { id: 'joiningDate', label: 'Joining Date', alignRight: false },
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
    return filter(array, (_user) => _user.employeeFullName?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PendingEmployeeListBP() {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('empId');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [employeeList = [], setEmployeeList] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [csvData = [], setCsvData] = useState();
  const [emptyRows, setEmptyRows] = useState();
  const [pendingEmployees, setPendingEmployees] = useState([]);
  // const [isNotFound, setIsNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
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

  const downloadEmployeeData = () => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    const empListItSpocReq = {
      itSpocId: USERDETAILS?.[0]?.spocEmailId,
      download: 'Excel',
    };
    Configuration.getEmpListItSpoc(empListItSpocReq).then((empListItSpocRes) => {
      console.log('Download response ', empListItSpocRes.data);
      setCsvData(empListItSpocRes.data);
      exportToCSV();
    });
  };

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

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    if (USERDETAILS != null) {
      console.log('USERDETAILS', USERDETAILS);

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
            console.log('empListVendorRes', empListVendorRes);
            setEmployeeList(empListVendorRes.data);
            const downloadPendingEmp = empListVendorRes.data.filter(
              (employees) =>
                employees.employeeStatus === 'Pending For TL Review' ||
                employees.employeeStatus === 'Pending For SM Review' ||
                employees.employeeStatus === 'Pending For IT Spoc Review'
            );
            setCsvData(downloadPendingEmp);

            console.log('employeeList', employeeList);
            setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeList.length) : 0);
            const filteredUsers = applySortFilter(empListVendorRes.data, getComparator(order, orderBy), filterName);

            setPendingEmployees(
              filteredUsers.filter(
                (employees) =>
                  employees.employeeStatus === 'Pending For TL Review' ||
                  employees.employeeStatus === 'Pending For SM Review' ||
                  employees.employeeStatus === 'Pending For IT Spoc Review'
              )
            );
            // setIsNotFound(!filteredUsers.length && !!filterName);
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

  const NewEmployee = () => {
    navigate('/NewEmployee');
  };

  const ViewEmployee = (rowId) => {
    console.log('rowId', rowId);
    navigate('/ViewEmployeeBP', {
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
    const filteredUsers = applySortFilter(employeeList, getComparator(order, orderBy), event.target.value);

    setPendingEmployees(
      filteredUsers.filter(
        (employees) =>
          employees.employeeStatus === 'Pending For TL Review' ||
          employees.employeeStatus === 'Pending For SM Review' ||
          employees.employeeStatus === 'Pending For IT Spoc Review'
      )
    );
    // setIsNotFound(!filteredUsers.length && !!event.target.value);
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeList.length) : 0;

  // const filteredUsers = applySortFilter(employeeList, getComparator(order, orderBy), filterName);
  // const pendingEmployees = filteredUsers.filter(
  //   (employees) =>
  //     employees.employeeStatus === 'Pending For TL Review' ||
  //     employees.employeeStatus === 'Pending For SM Review' ||
  //     employees.employeeStatus === 'Pending For IT Spoc Review'
  // );

  // const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> HR Portal | Employees(Partner)</title>
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
                  startIcon={<Iconify icon="material-symbols:person-add-outline" />}
                  onClick={NewEmployee}
                  color="primary"
                  // color="#0072BC"
                  size="medium"
                >
                  New Employee
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="ri:file-excel-2-line" />}
                  onClick={() => downloadEmployeeData()}
                  color="primary"
                  size="medium"
                >
                  Download Excel
                </Button>
              </Stack>

              <>
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
                              {pendingEmployees
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                  const {
                                    id,
                                    employeeId,
                                    employeeFullName,
                                    employeeStatus,
                                    partnerName,
                                    supportDevelopment,
                                    joiningDate
                                  } = row;
                                  const selectedUser = selected.indexOf(employeeFullName) !== -1;

                                  return (
                                    <TableRow
                                      hover
                                      key={id}
                                      tabIndex={-1}
                                      role="checkbox"
                                      selected={selectedUser}
                                      onClick={() => ViewEmployee(row.id)}
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
                                            (employeeStatus === 'Active' && 'success') ||
                                            (employeeStatus === 'Rejected by TL' && 'error') ||
                                            (employeeStatus === 'Rejected by SM' && 'error') ||
                                            (employeeStatus === 'Rejected by IT Spoc' && 'error') ||
                                            'warning'
                                          }
                                        >
                                          {employeeStatus}
                                        </Label>
                                      </TableCell>
                                      <TableCell align="left">{joiningDate || '-'}</TableCell>
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
                        count={pendingEmployees.length}
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
