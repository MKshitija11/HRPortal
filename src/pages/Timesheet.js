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
  Modal,
  TableContainer,
  FormControl,
  TextField,
  TablePagination,
  InputLabel,
  InputAdornment,
  IconButton,
  Box,
  Grid,
  Autocomplete,
  MenuItem,
  Select,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx';
import Marquee from 'react-fast-marquee';
import 'react-calendar/dist/Calendar.css';
import Loader from '../components/Loader/Loader';
import Iconify from '../components/iconify/Iconify';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import Configuration from '../utils/Configuration';
import '../css/App.css';

// import axios from 'axios';

const TABLE_HEAD = [
  { id: 'empId', label: 'Employee Code' },
  { id: 'name', label: 'Name' },
  { id: 'totalWorkingDays', label: 'Total Working Days ' },
  { id: 'atsFilledDays', label: 'ATS filled Days' },
  { id: 'pendingDays', label: 'Pending Days' },
  { id: 'leaves', label: 'Leaves' },
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
  const navigate = useNavigate();
  const location = useLocation();
  const [empArray, setEmpArray] = useState([]);
  const [page, setPage] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedName, setSelectedName] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSelectedList, setShowSelectedList] = useState(false);
  const [userListData, setUserListData] = useState([]);
  const [atsApiRes, setApiRes] = useState(empArray);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIsLoading, setSelectedIsLoading] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('empId');
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [csvData = [], setCsvData] = useState();
  const [updateWebIdModal, setUpdateWebIdModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDate, setSelectedDate] = useState();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [pageRender, setPageRender] = useState(50);
  const [open, setOpen] = useState(false);
  const [searchApiRes, setSearchApiRes] = useState([]);
  const [pendingDays, setPendingDays] = useState('')

  const ROLE = sessionStorage.getItem('ROLE');
  const USERDETAILS = sessionStorage.getItem('USERDETAILS');

  const clonedActiveList = [...activeEmployees];
  // const sortedData = clonedActiveList.sort(sortIt(data?.stringObject10?.employeeName))
  console.log(
    'clonedActiveList',
    clonedActiveList.sort((a, b) => (a.label > b.label ? 1 : -1))
  );
  const activeEmpFullNameList = clonedActiveList
    .filter((emp) => emp.employeeFullName)
    .map((emp) => emp.employeeFullName);

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    if (USERDETAILS != null) {
      const getEmpListTLReq = {
        teamLeadId: USERDETAILS?.[0]?.spocEmailId,
      };

      if (ROLE === 'BAGIC_TL') {
        setIsLoading(true);
        Configuration.getEmpListTeamLead(getEmpListTLReq)
          .then((empListTLRes) => {
            if (empListTLRes.data.error) {
              // setErrorMessage(true);
              setTimeout(() => {
                // console.log('inside 1st false')
                setIsLoading(false);
              }, 500);
            } else {
              const activeEmpList = empListTLRes.data.filter((emp) => emp.employeeStatus === 'Active');
              setEmpArray(activeEmpList);
              setPagination({
                data: activeEmpList.map((value, index) => ({
                  id: index,
                })),
                offset: 0,
                numberPerPage: pageRender,
                pageCount: 0,
                currentData: [],
              });
              const filteredUsers = applySortFilter(empListTLRes.data, getComparator(order, orderBy), filterName);
              setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active')); // setEmployeeList(empListTLRes.data);
              setCsvData(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              // setIsLoading(false);
            }
          })
          .catch((error) => {
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
            // alert('Something went wrong');
          });
      } else if (ROLE === 'BAGIC_SM') {
        const empListManagerReq = {
          managerId: USERDETAILS?.[0]?.spocEmailId,
        };
        setIsLoading(true);
        Configuration.getEmpListManager(empListManagerReq)
          .then((empListManagerRes) => {
            if (empListManagerRes.data.error) {
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            } else {
              const activeEmpListSM = empListManagerRes.data.filter((emp) => emp.employeeStatus === 'Active');
              setEmpArray(activeEmpListSM);
              setPagination({
                data: activeEmpListSM.map((value, index) => ({
                  id: index,
                })),
                offset: 0,
                numberPerPage: pageRender,
                pageCount: 0,
                currentData: [],
              });
              const filteredUsers = applySortFilter(empListManagerRes.data, getComparator(order, orderBy), filterName);
              // setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setCsvData(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              // setIsLoading(false);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            alert('Something went wrong');
          });
      } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_PARTNER') {
        const empListVendorReq = {
          partnerName: USERDETAILS?.[0]?.partnerName,
          itSpocId: 'NA',
        };
        setIsLoading(true);
        Configuration.getEmpListVendor(empListVendorReq)
          .then((empListVendorRes) => {
            if (empListVendorRes.data.error) {
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            } else {
              const activeEmpListPartner = empListVendorRes.data.filter((emp) => emp.employeeStatus === 'Active');

              setEmpArray(activeEmpListPartner);
              setPagination({
                data: activeEmpListPartner.map((value, index) => ({
                  id: index,
                })),
                offset: 0,
                numberPerPage: pageRender,
                pageCount: 0,
                currentData: [],
              });
              const filteredUsers = applySortFilter(empListVendorRes.data, getComparator(order, orderBy), filterName);
              setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setCsvData(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              // setTimeout(() => {
              //   setIsLoading(false);
              // }, 500);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            alert('Something went wrong');
          });
      } else if (ROLE === 'BAGIC_ITS') {
        const empListVendorReq = {
          itSpocId: USERDETAILS?.[0]?.spocEmailId,
        };
        setIsLoading(true);
        Configuration.getEmpListItSpoc(empListVendorReq)
          .then((empListVendorRes) => {
            if (empListVendorRes.data.error) {
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            } else {
              const activeEmpListPartner = empListVendorRes.data.filter((emp) => emp.employeeStatus === 'Active');

              setEmpArray(activeEmpListPartner);
              setPagination({
                data: activeEmpListPartner.map((value, index) => ({
                  id: index,
                })),
                offset: 0,
                numberPerPage: pageRender,
                pageCount: 0,
                currentData: [],
              });
              const filteredUsers = applySortFilter(empListVendorRes.data, getComparator(order, orderBy), filterName);
              setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              console.log('filtered its emp', filteredUsers);
              setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));

              // setTimeout(() => {
              //   setIsLoading(false);
              // }, 500);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            alert('Something went wrong');
          });
      } else if (ROLE === 'BAGIC_PRESIDENT') {
        const empListVendorReq = {
          // itSpocId: USERDETAILS?.[0]?.spocEmailId,
          itSpocId: 'pooja.rebba@bajajallianz.co.in',
        };
        setIsLoading(true);
        Configuration.getEmpListItSpoc(empListVendorReq)
          .then((empListVendorRes) => {
            if (empListVendorRes.data.error) {
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            } else {
              const activeEmpListPartner = empListVendorRes.data.filter((emp) => emp.employeeStatus === 'Active');

              setEmpArray(activeEmpListPartner);
              setPagination({
                data: activeEmpListPartner.map((value, index) => ({
                  id: index,
                })),
                offset: 0,
                numberPerPage: pageRender,
                pageCount: 0,
                currentData: [],
              });
              const filteredUsers = applySortFilter(empListVendorRes.data, getComparator(order, orderBy), filterName);
              setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));

              // setTimeout(() => {
              //   setIsLoading(false);
              // }, 500);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            alert('Something went wrong');
          });
      }
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [location]);

  // const [openCalendar, setOpenCalendar] = useState(false);
  const [pagination, setPagination] = useState({
    data: empArray.map((value, index) => ({
      id: index,
    })),
    offset: 0,
    numberPerPage: pageRender,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    const arr = empArray.slice(pagination.offset, pagination.offset + pagination.numberPerPage);

    for (let index = 0; index < arr.length; index += 1) {
      const element = arr[index];
      element.hideLoader = !element.webUserId;
      const atsReq = {
        userName: element.webUserId ? element.webUserId : '',
        fromDate: '',
        toDate: '',
      };

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      fetchData(atsReq, index, arr.length, (resp) => {
        const response = resp?.stringObject10;
        const userListResp = resp?.userList
        // setUserListData(response)
     
        element.userList = userListResp !== null ? userListResp : '';
        element.timeSheetDtls = response !== null ? response : '';
        element.hideLoader = true;
        setApiRes([...arr]);
      }).catch((er) => {
        console.log('caught error==>', er);
      });
    }

    setApiRes([...arr]);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage),
    }));
  }, [pagination.numberPerPage, pagination.offset, empArray, selectedMonth]);

  useEffect(() => {
    console.log('custom useeffect', atsApiRes);
  }, [atsApiRes, pagination, selectedMonth]);

  const fetchData = async (atsReq, idx, arrLength, callback) =>
    fetch('https://webservices.bajajallianz.com/BagicVisitorAppWs/userTimeSheet', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(atsReq),
    }).then((response) =>
      response
        .json()
        .then((data) => {
          const atsRes = data;
          if (atsRes?.errorCode === '1') {
            setTimeout(() => {
              setIsLoading(false);
            }, 60000);
            // setOpenErrorModal(true)
          } else if (atsRes?.errorCode === '0') {
            // setIsLoading(true);

            setIsLoading(false);
            setShowSearchBar(true);
            setUserListData(atsRes?.userList);
            // callback(atsRes.stringObject10);
            callback(atsRes)
          }
          return atsRes;
        })
        .catch((err) => {
          setTimeout(() => {
            setIsLoading(false);
            setOpenErrorModal(true);
          }, 60000);
          console.log('error>>>>>', err);
        })
    );

  const handlePageClick = (event, newPage) => {
    console.log('params=======>', event, newPage);
    setPage(newPage);
    setPageRender(newPage);
    setIsLoading(false);
    const selected = event.selected ? event.selected : newPage;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  const handleChangeRowsPerPage = (event, newPage) => {
    setPage(0);
    setPageRender(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  // console.log(">>>>>>>>", pendingDays.join(","))

  const downloadEmployeeData = () => {
    const pendingDaysList = userListData.filter((emp) => emp.status === 'NA').map((emp) => emp.date)
    setPendingDays(pendingDaysList.join(","))
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    const empListItSpocReq = {
      itSpocId: USERDETAILS?.[0]?.spocEmailId,
      download: 'Excel',
    };

    exportToCSV();
    
  };

  const Heading = [
    [
      'Employee ID',
      'Employee Name',
      'MobileNumber',
      'Partner Name',
      'Web Id',
      'Total Working days',
      'ATS filled Days',
      'ATS Not filled Days',
      'Leaves',
      // 'Pending Days',
    ],
  ];
  const exportToCSV = () => {
    const selectedCols = csvData.map((n) => [
      n.employeeId,
      n.employeeFullName,
      n.mobileNumber,
      n.partnerName,
      n.webUserId,
      n.timeSheetDtls?.totalWorkingDays,
      n.timeSheetDtls?.atsfilledDays,
      n.timeSheetDtls?.atsnotFilledDays,
      n.timeSheetDtls?.leave,
      // n.userList
    ]);
    // filter((emp) => emp.status === 'NA').map((emp) => emp.date)
    console.log("csv data", csvData)
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

  const sortIt = (sortBy) => (a, b) => {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    return 0;
  };

  const handleChangeForSearchByUsername = (event, value) => {
    console.log('value', value);
    setSelectedName(value);

    const getWebId = activeEmployees.find((data) => data.employeeFullName === value)?.webUserId;
    console.log('ats result', value, getWebId, atsApiRes);

    const atsReq = {
      userName: getWebId,
      fromDate: '',
      toDate: '',
    };
    setSelectedIsLoading(true);
    console.log('ats req>>>>>>>>>>>>>', atsReq);
    return fetch('https://webservices.bajajallianz.com/BagicVisitorAppWs/userTimeSheet', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(atsReq),
    }).then((resp) =>
      resp.json().then((data) => {
        const atsRes = data;
        // atsRes.sort(sortIt('date'))
        atsRes.hideLoader = true;

        setShowSelectedList(true);
        setSearchApiRes([atsRes]);
        // setIsLoading(false)
        setSelectedIsLoading(false);
      })
    );
  };

  console.log('page......set page...', page);
  console.log('page......page render', pageRender);

  return (
    <>
      <Container>
        <Stack alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
          <Modal
            open={openModal || updateWebIdModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid transparent',
                boxShadow: 24,
                p: 4,
                borderRadius: '8px',
              }}
              component="form"
            >
              {openModal ? (
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                  Something went wrong!! Please try after sometime
                </Typography>
              ) : updateWebIdModal ? (
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                  Please Update Employees Web Id
                </Typography>
              ) : null}

              <Grid
                container
                item
                xs={12}
                justifyContent={'center'}
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
              >
                <Stack direction="row" justifyContent="center">
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    // onClick={() => setApprovalModal(false)}
                    onClick={
                      () =>
                        openModal
                          ? // (
                            setOpenModal(false)
                          : // navigate('/EmpManagmentTL')
                          // )
                          updateWebIdModal
                          ? setUpdateWebIdModal(false)
                          : null
                      // setOpenModal(false);
                      // navigate('/EmployeesTL');
                    }
                    sx={{ mt: 2 }}
                  >
                    OK
                  </Button>
                </Stack>
              </Grid>
            </Box>
          </Modal>
        </Stack>

        <Marquee style={{ padding: 10 }}>
          <Stack sx={{ backgroundColor: 'white', paddingRight: 5, paddingLeft: 5 }}>
            <Typography sx={{ color: '#0072BC', fontWeight: '500' }}>
              Note: To View Timesheet Data of employee, please ensure to update Web user Id of respective employee
              through Active bucket
            </Typography>
          </Stack>
        </Marquee>
        <Card
          sx={{
            border: '1px solid lightgray',
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {openErrorModal ? (
            <Stack alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
              <Modal
                open={openErrorModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 410,
                    bgcolor: 'background.paper',
                    border: '2px solid transparent',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '8px',
                  }}
                  component="form"
                >
                  <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                    Unable to fetch data, Please try after sometime
                  </Typography>

                  <Grid
                    container
                    item
                    xs={12}
                    justifyContent={'center'}
                    style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
                  >
                    <Stack direction="row" justifyContent="center" mt={1}>
                      <Button
                        size="medium"
                        variant="contained"
                        type="button"
                        color="primary"
                        onClick={() => {
                          setOpenErrorModal(false);
                        }}
                        sx={{ mt: 2 }}
                      >
                        OK
                      </Button>
                    </Stack>
                  </Grid>
                </Box>
              </Modal>
            </Stack>
          ) : null}

          <Stack mt={2} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Stack style={{ width: '10%', display: 'flex' }} mt={1} ml={2}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  // disablePortal
                  autoSelect
                  id="combo-box-demo"
                  options={activeEmpFullNameList}
                  size="small"
                  value={selectedName}
                  onChange={handleChangeForSearchByUsername}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Search by Username" />}
                />
              </Grid>
            </Stack>
            <Stack mr={2} ml={2} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Typography variant="h4" sx={{ color: '#0072BC' }}>
                Employees ({activeEmployees.length})
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" sx={{ paddingRight: 2 }}>
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
            {isLoading || selectedIsLoading ? (
              <Stack justifyContent="center" alignItems="center" mb={10}>
                <Loader />
              </Stack>
            ) : (
              <>
                <Stack alignItems="center" justifyContent="center" flexDirection="row">
                  <Typography variant="h6" sx={{ color: '#0072BC' }}>
                    {atsApiRes?.[0]?.timeSheetDtls?.month}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#0072BC' }} ml={1}>
                    {atsApiRes?.[0]?.timeSheetDtls?.year}
                  </Typography>
                </Stack>

                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800, height: '60vh' }}>
                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        // rowCount={employeeDetails.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        // onSelectAllClick={handleSelectAllClick}
                        customStyle={{ backgroundColor: 'red' }}
                        isTimeSheet
                      />

                      {selectedName?.length > 0 ? (
                        <>
                          {selectedIsLoading ? (
                            <Stack justifyContent="center" alignItems="center" mb={10} id="aaaaaaaaa">
                              <Loader style={{ alignItems: 'center', justifyContent: 'center' }} />
                            </Stack>
                          ) : (
                            <TableBody>
                              <>
                                {searchApiRes.map((response, index) => {
                                  const selectedUser = selected.indexOf(response?.employeeFullName) !== -1;
                                  return (
                                    <TableRow
                                      hover
                                      key={index}
                                      tabIndex={-1}
                                      role="checkbox"
                                      selected={selectedUser}
                                      onClick={() =>
                                        response?.stringObject10
                                          ? response?.stringObject10?.username
                                            ? navigate('/EmployeeTimesheetDetails', {
                                                state: {
                                                  user: response?.stringObject10,
                                                  selectedStartDate: startDate,
                                                  selectedEndDate: endDate,
                                                  month: selectedMonth,
                                                },
                                              })
                                            : setUpdateWebIdModal(true)
                                          : // setOpenModal(true);
                                            null
                                      }
                                      sx={{ cursor: 'pointer' }}
                                      ml={2}
                                    >
                                      <>
                                        <TableCell align="center">
                                          {response?.stringObject10?.employeeCode === null
                                            ? '-'
                                            : response?.stringObject10?.employeeCode || '-'}
                                        </TableCell>

                                        <TableCell component="th" scope="row" align="center">
                                          <Typography
                                            style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                          >
                                            {response?.stringObject10?.employeeName === null
                                              ? ''
                                              : response?.stringObject10?.employeeName || '-'}
                                          </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                          <Label>
                                            <Typography
                                              style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                            >
                                              {!response.hideLoader ? (
                                                <Loader height={15} width={15} marginTop={0} />
                                              ) : response?.stringObject10?.totalWorkingDays === null ? (
                                                '-'
                                              ) : (
                                                response?.stringObject10?.totalWorkingDays || '-'
                                              )}
                                            </Typography>
                                          </Label>
                                        </TableCell>

                                        <TableCell align="center">
                                          <Label color="success">
                                            <Typography
                                              style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                            >
                                              {!response.hideLoader ? (
                                                <Loader height={15} width={15} marginTop={0} />
                                              ) : response?.stringObject10?.atsfilledDays === null ? (
                                                '-'
                                              ) : (
                                                response?.stringObject10?.atsfilledDays || '-'
                                              )}
                                            </Typography>
                                          </Label>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Label color="error">
                                            <Typography
                                              style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                            >
                                              {!response.hideLoader ? (
                                                <Loader height={15} width={15} marginTop={0} />
                                              ) : response?.stringObject10?.atsnotFilledDays === null ? (
                                                '-'
                                              ) : (
                                                response?.stringObject10?.atsnotFilledDays || '-'
                                              )}
                                            </Typography>
                                          </Label>
                                        </TableCell>

                                        <TableCell align="center">
                                          <Label>
                                            <Typography
                                              style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                            >
                                              {!response.hideLoader ? (
                                                <Loader height={15} width={15} marginTop={0} />
                                              ) : response?.stringObject10?.leave === null ? (
                                                '-'
                                              ) : (
                                                response?.stringObject10?.leave || '-'
                                                // '-'
                                              )}
                                            </Typography>
                                          </Label>
                                        </TableCell>
                                      </>
                                    </TableRow>
                                  );
                                })}
                              </>
                            </TableBody>
                          )}
                        </>
                      ) : (
                        <TableBody>
                          {atsApiRes.map((response, index) => {
                            const selectedUser = selected.indexOf(response?.employeeFullName) !== -1;
                            return (
                              <TableRow
                                hover
                                key={index}
                                tabIndex={-1}
                                role="checkbox"
                                selected={selectedUser}
                                onClick={() =>
                                  response?.timeSheetDtls
                                    ? response?.webUserId
                                      ? navigate('/EmployeeTimesheetDetails', {
                                          state: {
                                            user: response?.timeSheetDtls,
                                            selectedStartDate: startDate,
                                            selectedEndDate: endDate,
                                            month: selectedMonth,
                                          },
                                        })
                                      : setUpdateWebIdModal(true)
                                    : // setOpenModal(true);
                                      null
                                }
                                sx={{ cursor: 'pointer' }}
                                ml={2}
                              >
                                <>
                                  <TableCell align="center">
                                    {response?.employeeId === null ? '' : response?.employeeId}
                                  </TableCell>

                                  <TableCell component="th" scope="row" align="center">
                                    <Typography style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                      {response?.employeeFullName === null ? '' : response?.employeeFullName}
                                    </Typography>
                                  </TableCell>

                                  <TableCell align="center">
                                    <Label>
                                      <Typography style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                        {!response.hideLoader ? (
                                          <Loader height={15} width={15} marginTop={0} />
                                        ) : response?.timeSheetDtls?.totalWorkingDays === null ? (
                                          '-'
                                        ) : (
                                          response?.timeSheetDtls?.totalWorkingDays || '-'
                                        )}
                                      </Typography>
                                    </Label>
                                  </TableCell>

                                  <TableCell align="center">
                                    <Label color="success">
                                      <Typography style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                        {!response.hideLoader ? (
                                          <Loader height={15} width={15} marginTop={0} />
                                        ) : response?.timeSheetDtls?.atsfilledDays === null ? (
                                          '-'
                                        ) : (
                                          response?.timeSheetDtls?.atsfilledDays || '-'
                                        )}
                                      </Typography>
                                    </Label>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Label color="error">
                                      <Typography style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                        {!response.hideLoader ? (
                                          <Loader height={15} width={15} marginTop={0} />
                                        ) : response?.timeSheetDtls?.atsnotFilledDays === null ? (
                                          '-'
                                        ) : (
                                          response?.timeSheetDtls?.atsnotFilledDays || '-'
                                        )}
                                      </Typography>
                                    </Label>
                                  </TableCell>

                                  <TableCell align="center">
                                    <Label>
                                      <Typography style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                        {!response.hideLoader ? (
                                          <Loader height={15} width={15} marginTop={0} />
                                        ) : response?.timeSheetDtls?.leave === null ? (
                                          '-'
                                        ) : (
                                          response?.timeSheetDtls?.leave || '-'
                                          // '-'
                                        )}
                                      </Typography>
                                    </Label>
                                  </TableCell>
                                </>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      )}
                      {/* <>
                        <TableBody>
                          {selectedName?.length > 0 ? (
                            <>
                              {!selectedIsLoading ? (
                                <Stack justifyContent="center" alignItems="center" mb={10} id="aaaaaaaaa">
                                  <Loader style={{ alignItems: 'center', justifyContent: 'center' }} />
                                </Stack>
                              ) : (
                                <>
                                  {searchApiRes.map((response, index) => {
                                    const selectedUser = selected.indexOf(response?.employeeFullName) !== -1;
                                    return (
                                      <TableRow
                                        hover
                                        key={index}
                                        tabIndex={-1}
                                        role="checkbox"
                                        selected={selectedUser}
                                        onClick={() =>
                                          response?.stringObject10
                                            ? response?.stringObject10?.username
                                              ? navigate('/EmployeeTimesheetDetails', {
                                                  state: {
                                                    user: response?.stringObject10,
                                                    selectedStartDate: startDate,
                                                    selectedEndDate: endDate,
                                                    month: selectedMonth,
                                                  },
                                                })
                                              : setUpdateWebIdModal(true)
                                            : // setOpenModal(true);
                                              null
                                        }
                                        sx={{ cursor: 'pointer' }}
                                        ml={2}
                                      >
                                        <>
                                          <TableCell align="center">
                                            {response?.stringObject10?.employeeCode === null
                                              ? '-'
                                              : response?.stringObject10?.employeeCode || '-'}
                                          </TableCell>

                                          <TableCell component="th" scope="row" align="center">
                                            <Typography
                                              style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                            >
                                              {response?.stringObject10?.employeeName === null
                                                ? ''
                                                : response?.stringObject10?.employeeName || '-'}
                                            </Typography>
                                          </TableCell>

                                          <TableCell align="center">
                                            <Label>
                                              <Typography
                                                style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                              >
                                                {!response.hideLoader ? (
                                                  <Loader height={15} width={15} marginTop={0} />
                                                ) : response?.stringObject10?.totalWorkingDays === null ? (
                                                  '-'
                                                ) : (
                                                  response?.stringObject10?.totalWorkingDays || '-'
                                                )}
                                              </Typography>
                                            </Label>
                                          </TableCell>

                                          <TableCell align="center">
                                            <Label color="success">
                                              <Typography
                                                style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                              >
                                                {!response.hideLoader ? (
                                                  <Loader height={15} width={15} marginTop={0} />
                                                ) : response?.stringObject10?.atsfilledDays === null ? (
                                                  '-'
                                                ) : (
                                                  response?.stringObject10?.atsfilledDays || '-'
                                                )}
                                              </Typography>
                                            </Label>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Label color="error">
                                              <Typography
                                                style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                              >
                                                {!response.hideLoader ? (
                                                  <Loader height={15} width={15} marginTop={0} />
                                                ) : response?.stringObject10?.atsnotFilledDays === null ? (
                                                  '-'
                                                ) : (
                                                  response?.stringObject10?.atsnotFilledDays || '-'
                                                )}
                                              </Typography>
                                            </Label>
                                          </TableCell>

                                          <TableCell align="center">
                                            <Label>
                                              <Typography
                                                style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                              >
                                                {!response.hideLoader ? (
                                                  <Loader height={15} width={15} marginTop={0} />
                                                ) : response?.stringObject10?.leave === null ? (
                                                  '-'
                                                ) : (
                                                  // response?.stringObject10?.leave || '-'
                                                  '-'
                                                )}
                                              </Typography>
                                            </Label>
                                          </TableCell>
                                        </>
                                      </TableRow>
                                    );
                                  })}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {atsApiRes.map((response, index) => {
                                const selectedUser = selected.indexOf(response?.employeeFullName) !== -1;
                                return (
                                  <TableRow
                                    hover
                                    key={index}
                                    tabIndex={-1}
                                    role="checkbox"
                                    selected={selectedUser}
                                    onClick={() =>
                                      response?.timeSheetDtls
                                        ? response?.webUserId
                                          ? navigate('/EmployeeTimesheetDetails', {
                                              state: {
                                                user: response?.timeSheetDtls,
                                                selectedStartDate: startDate,
                                                selectedEndDate: endDate,
                                                month: selectedMonth,
                                              },
                                            })
                                          : setUpdateWebIdModal(true)
                                        : // setOpenModal(true);
                                          null
                                    }
                                    sx={{ cursor: 'pointer' }}
                                    ml={2}
                                  >
                                    <>
                                      <TableCell align="center">
                                        {response?.employeeId === null ? '' : response?.employeeId}
                                      </TableCell>

                                      <TableCell component="th" scope="row" align="center">
                                        <Typography
                                          style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                        >
                                          {response?.employeeFullName === null ? '' : response?.employeeFullName}
                                        </Typography>
                                      </TableCell>

                                      <TableCell align="center">
                                        <Label>
                                          <Typography
                                            style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                          >
                                            {!response.hideLoader ? (
                                              <Loader height={15} width={15} marginTop={0} />
                                            ) : response?.timeSheetDtls?.totalWorkingDays === null ? (
                                              '-'
                                            ) : (
                                              response?.timeSheetDtls?.totalWorkingDays || '-'
                                            )}
                                          </Typography>
                                        </Label>
                                      </TableCell>

                                      <TableCell align="center">
                                        <Label color="success">
                                          <Typography
                                            style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                          >
                                            {!response.hideLoader ? (
                                              <Loader height={15} width={15} marginTop={0} />
                                            ) : response?.timeSheetDtls?.atsfilledDays === null ? (
                                              '-'
                                            ) : (
                                              response?.timeSheetDtls?.atsfilledDays || '-'
                                            )}
                                          </Typography>
                                        </Label>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Label color="error">
                                          <Typography
                                            style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                          >
                                            {!response.hideLoader ? (
                                              <Loader height={15} width={15} marginTop={0} />
                                            ) : response?.timeSheetDtls?.atsnotFilledDays === null ? (
                                              '-'
                                            ) : (
                                              response?.timeSheetDtls?.atsnotFilledDays || '-'
                                            )}
                                          </Typography>
                                        </Label>
                                      </TableCell>

                                      <TableCell align="center">
                                        <Label>
                                          <Typography
                                            style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                          >
                                            {!response.hideLoader ? (
                                              <Loader height={15} width={15} marginTop={0} />
                                            ) : response?.timeSheetDtls?.leave === null ? (
                                              '-'
                                            ) : (
                                              // response?.timeSheetDtls?.leave || '-'
                                              '-'
                                            )}
                                          </Typography>
                                        </Label>
                                      </TableCell>
                                    </>
                                  </TableRow>
                                );
                              })}
                            </>
                          )}
                        </TableBody>
                      </> */}
                    </Table>
                  </TableContainer>
                </Scrollbar>
              </>
            )}
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={activeEmployees.length}
              rowsPerPage={pageRender}
              page={page}
              onPageChange={handlePageClick}
              // onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* </Scrollbar> */}

            {/* <Stack sx={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'red', }}> */}
            {/* <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={pagination.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'pagination-active'}
                previousClassName={'previous'}
                nextClassName={'next'}
                pageClassName={'page'}
              /> */}

            {/* </Stack> */}
          </>
        </Card>
      </Container>
    </>
  );
}
